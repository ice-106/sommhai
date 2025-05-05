import { InviteRole, Prisma, QuestionType } from '@prisma/client';

import { InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  CreateEventInviteOptions,
  CreateEventOptions,
  CreateManyEventQuestionOptions,
  DeleteAllEventQuestionOptions,
  DeleteEventInviteOptions,
  DeleteEventOptions,
  DeleteManyEventQuestionOptions,
  GetEventInviteOptions,
  GetEventOptions,
  GetEventQuestionOptions,
  GetManyEventInvitesOptions,
  GetManyEventQuestionOptions,
  GetManyEventsOptions,
  RespondToEventInviteOptions,
  RespondWithQuestionsOptions,
  UpdateEventQuestionOptions,
} from './types';

export const OrganizerService = {
  getEvents: async ({ search, date, take, skip, status, userId }: GetManyEventsOptions) => {
    const events = await prisma.event.findMany({
      take,
      skip,
      where: {
        date,
        status: {
          not: 'Completed',
        },
        AND: [
          {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
          status
            ? {
                status: {
                  contains: status,
                  mode: 'insensitive',
                },
              }
            : {},
          userId
            ? {
                OR: [
                  {
                    host_uid: userId,
                  },
                  {
                    organizers: {
                      some: {
                        uid: userId,
                      },
                    },
                  },
                  {
                    attendees: {
                      some: {
                        uid: userId,
                      },
                    },
                  },
                ],
              }
            : {},
        ],
      },
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
        hostUser: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return events;
  },
  getEvent: async ({ eventId }: GetEventOptions) => {
    const event = await prisma.event.findUnique({
      where: {
        eid: eventId,
      },
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
        hostUser: true,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event not found`);
    }

    return event;
  },
  createEvent: async ({ name, uid }: CreateEventOptions) => {
    try {
      const user = await prisma.user.findUnique({
        where: { uid },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${uid} not found`);
      }

      return await prisma.event.create({
        data: {
          name,
          date: new Date(),
          time: new Date(),
          location: null,
          description: null,
          invite_list: 0,
          memory: null,
          picture: [],
          host: user.username,
          host_uid: user.uid,
          status: 'Upcoming',
          message: null,
          attendees: {
            create: [
              {
                uid: uid,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Error creating event:', error);
      throw new InternalServerErrorException('Failed to create event');
    }
  },
  updateEvent: async ({ eventId, event }: { eventId: string; event: Prisma.EventUncheckedUpdateInput }) => {
    try {
      return await prisma.event.update({
        where: {
          eid: eventId,
        },
        data: { ...event },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating event details:', error);
      throw new InternalServerErrorException('Failed to update event details');
    }
  },
  deleteEvent: async ({ eventId }: DeleteEventOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
        include: {
          attendees: true,
          attendings: true,
          organizers: true,
        },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      prisma.event.delete({
        where: { eid: eventId },
      });

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting event:', error);
      throw new InternalServerErrorException('Failed to delete event');
    }
  },
  createInvites: async ({ eventId, userIds, role }: CreateEventInviteOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const invites = await Promise.all(
        userIds.map(async (userId) => {
          try {
            const user = await prisma.user.findUnique({
              where: { uid: userId },
            });

            if (!user) {
              return {
                success: false,
                uid: userId,
                error: 'User not found',
              };
            }

            if (role === InviteRole.ATTENDEE) {
              const existingAttendee = await prisma.attendee.findUnique({
                where: {
                  uid_eid: {
                    uid: userId,
                    eid: eventId,
                  },
                },
              });

              if (existingAttendee) {
                return {
                  success: false,
                  uid: userId,
                  error: 'User is already an attendee',
                };
              }
            } else if (role === InviteRole.ORGANIZER) {
              const existingOrganizer = await prisma.organizer.findUnique({
                where: {
                  uid_eid: {
                    uid: userId,
                    eid: eventId,
                  },
                },
              });

              if (existingOrganizer) {
                return {
                  success: false,
                  uid: userId,
                  error: 'User is already an organizer',
                };
              }
            }

            const existingInvite = await prisma.invite.findUnique({
              where: {
                eventId_userId_role: {
                  eventId,
                  userId,
                  role,
                },
              },
            });

            if (existingInvite) {
              const updatedInvite = await prisma.invite.update({
                where: { id: existingInvite.id },
                data: {
                  accept: null,
                  updatedAt: new Date(),
                },
              });

              return {
                success: true,
                uid: userId,
                inviteId: updatedInvite.id,
              };
            }

            const newInvite = await prisma.invite.create({
              data: {
                eventId,
                userId,
                role,
                accept: null,
              },
            });

            return {
              success: true,
              uid: userId,
              inviteId: newInvite.id,
            };
          } catch (error) {
            console.error(`Error creating invite for user ${userId}:`, error);
            return {
              success: false,
              uid: userId,
              error: 'Failed to create invitation',
            };
          }
        }),
      );

      return {
        eventId,
        invites,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error creating invitations:', error);
      throw new InternalServerErrorException('Failed to create invitations');
    }
  },
  getEventInvites: async ({ eventId, role, accept, take, skip }: GetManyEventInvitesOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });
      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const total = await prisma.invite.count({
        where: {
          eventId,
          ...(role ? { role } : {}),
          ...(accept !== undefined ? { accept } : {}),
        },
      });

      const invites = await prisma.invite.findMany({
        where: {
          eventId,
          ...(role ? { role } : {}),
          ...(accept !== undefined ? { accept } : {}),
        },
        take,
        skip,
        include: {
          event: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { invites, total };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching event invitations:', error);
      throw new InternalServerErrorException('Failed to fetch event invitations');
    }
  },
  getEventInvite: async ({ inviteId }: GetEventInviteOptions) => {
    try {
      const invite = await prisma.invite.findUnique({
        where: { id: inviteId },
        include: {
          event: true,
          user: true,
        },
      });

      if (!invite) {
        throw new NotFoundException('Invitation not found');
      }

      return invite;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching invitation details:', error);
      throw new InternalServerErrorException('Failed to fetch invitation details');
    }
  },
  deleteEventInvite: async ({ eventId, inviteIds }: DeleteEventInviteOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const invitesToDelete = await prisma.invite.findMany({
        where: {
          id: { in: inviteIds },
          eventId: eventId,
        },
        include: {
          user: true,
          event: true,
        },
      });

      if (invitesToDelete.length !== inviteIds.length) {
        const foundIds = invitesToDelete.map((invite) => invite.id);
        const missingIds = inviteIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(`Some invitations were not found: ${missingIds.join(', ')}`);
      }

      await prisma.$transaction([
        prisma.invite.deleteMany({
          where: {
            id: { in: inviteIds },
            eventId: eventId,
          },
        }),
      ]);

      return invitesToDelete;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting invitations in batch:', error);
      throw new InternalServerErrorException('Failed to delete invitations');
    }
  },
  respondToInvite: async ({ inviteId, accept }: RespondToEventInviteOptions) => {
    try {
      const invite = await prisma.invite.findUnique({
        where: { id: inviteId },
      });

      if (!invite) {
        throw new NotFoundException('Invitation not found');
      }

      await prisma.invite.update({
        where: { id: inviteId },
        data: { accept },
      });

      if (accept) {
        if (invite.role === InviteRole.ATTENDEE) {
          const existingAttendee = await prisma.attendee.findUnique({
            where: {
              uid_eid: {
                uid: invite.userId,
                eid: invite.eventId,
              },
            },
          });

          if (!existingAttendee) {
            await prisma.attendee.create({
              data: {
                uid: invite.userId,
                eid: invite.eventId,
              },
            });
          }
        } else if (invite.role === InviteRole.ORGANIZER) {
          const existingOrganizer = await prisma.organizer.findUnique({
            where: {
              uid_eid: {
                uid: invite.userId,
                eid: invite.eventId,
              },
            },
          });

          if (!existingOrganizer) {
            await prisma.organizer.create({
              data: {
                uid: invite.userId,
                eid: invite.eventId,
              },
            });

            const existingAttendee = await prisma.attendee.findUnique({
              where: {
                uid_eid: {
                  uid: invite.userId,
                  eid: invite.eventId,
                },
              },
            });

            if (!existingAttendee) {
              await prisma.attendee.create({
                data: {
                  uid: invite.userId,
                  eid: invite.eventId,
                },
              });
            }
          }
        }
      }

      return {
        iid: invite.id,
        eventId: invite.eventId,
        accepted: accept,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error responding to invitation:', error);
      throw new InternalServerErrorException('Failed to respond to invitation');
    }
  },
  getEventQuestions: async ({ eventId }: GetManyEventQuestionOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const questions = await prisma.eventQuestion.findMany({
        where: { eventId },
        orderBy: { createdAt: 'asc' },
      });

      const allResponses = await prisma.questionResponse.findMany({
        where: {
          questionId: {
            in: questions.map((q) => q.id),
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const responsesByQuestionId = new Map<string, { answer: string; uid: string }[]>();

      questions.forEach((question) => {
        responsesByQuestionId.set(question.id, []);
      });

      allResponses.forEach((response) => {
        const responses = responsesByQuestionId.get(response.questionId);
        if (responses) {
          responses.push({
            answer: response.answer || '',
            uid: response.userId,
          });
        }
      });

      const questionsWithResponses = questions.map((question) => ({
        question,
        responses: responsesByQuestionId.get(question.id) || [],
      }));

      return questionsWithResponses;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching event questions:', error);
      throw new InternalServerErrorException('Failed to fetch event questions');
    }
  },
  getEventQuestion: async ({ eventId, questionId }: GetEventQuestionOptions) => {
    try {
      const question = await prisma.eventQuestion.findFirst({
        where: {
          id: questionId,
          eventId,
        },
      });

      if (!question) {
        throw new NotFoundException('Question not found for this event');
      }

      const responses = await prisma.questionResponse.findMany({
        where: {
          questionId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const answerUidTuples = responses.map((response) => ({
        answer: response.answer || '',
        uid: response.userId,
      }));

      return {
        question,
        responses: answerUidTuples,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching event question:', error);
      throw new InternalServerErrorException('Failed to fetch event question');
    }
  },
  createEventQuestions: async ({ eventId, questions }: CreateManyEventQuestionOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const createdQuestions = await prisma.$transaction(
        questions.map((q) =>
          prisma.eventQuestion.create({
            data: {
              eventId,
              question: q.question,
              type: q.type as QuestionType,
              required: q.required ?? false,
              options: q.options ?? [],
            },
          }),
        ),
      );

      return createdQuestions;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error creating event questions:', error);
      throw new InternalServerErrorException('Failed to create event questions');
    }
  },
  updateEventQuestion: async ({
    eventId,
    questionId,
    question,
    type,
    required,
    options,
  }: UpdateEventQuestionOptions) => {
    try {
      const existingQuestion = await prisma.eventQuestion.findFirst({
        where: {
          id: questionId,
          eventId,
        },
      });

      if (!existingQuestion) {
        throw new NotFoundException('Question not found for this event');
      }

      const updatedQuestion = await prisma.eventQuestion.update({
        where: { id: questionId },
        data: {
          question,
          type: type as QuestionType | undefined,
          required,
          options,
        },
      });

      return updatedQuestion;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating event question:', error);
      throw new InternalServerErrorException('Failed to update event question');
    }
  },
  deleteEventQuestion: async ({ eventId, questionId }: GetEventQuestionOptions) => {
    try {
      const question = await prisma.eventQuestion.findFirst({
        where: {
          id: questionId,
          eventId,
        },
      });

      if (!question) {
        throw new NotFoundException('Question not found for this event');
      }

      await prisma.eventQuestion.delete({
        where: { id: questionId },
      });

      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting event question:', error);
      throw new InternalServerErrorException('Failed to delete event question');
    }
  },
  deleteEventQuestions: async ({ eventId, questionIds }: DeleteManyEventQuestionOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      const questionsToDelete = await prisma.eventQuestion.findMany({
        where: {
          id: { in: questionIds },
          eventId,
        },
      });
      if (questionsToDelete.length !== questionIds.length) {
        const foundIds = questionsToDelete.map((question) => question.id);
        const missingIds = questionIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(`Some questions were not found: ${missingIds.join(', ')}`);
      }
      await prisma.eventQuestion.deleteMany({
        where: {
          id: { in: questionIds },
          eventId,
        },
      });
      return questionsToDelete;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting event questions in batch:', error);
      throw new InternalServerErrorException('Failed to delete event questions');
    }
  },
  deleteAllEventQuestions: async ({ eventId }: DeleteAllEventQuestionOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const questions = await prisma.eventQuestion.findMany({
        where: { eventId },
      });

      await prisma.eventQuestion.deleteMany({
        where: { eventId },
      });

      return questions;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting all event questions:', error);
      throw new InternalServerErrorException('Failed to delete all event questions');
    }
  },
  respondToInviteWithQuestions: async ({ inviteId, accepted, responses }: RespondWithQuestionsOptions) => {
    try {
      const invite = await prisma.invite.findUnique({
        where: { id: inviteId },
        include: {
          event: {
            include: {
              questions: true,
            },
          },
        },
      });

      if (!invite) {
        throw new NotFoundException('Invitation not found');
      }

      await prisma.invite.update({
        where: { id: inviteId },
        data: { accept: accepted },
      });

      const responseResults = [];

      if (responses && responses.length > 0) {
        for (const response of responses) {
          const questionExists = invite.event.questions.some((q) => q.id === response.questionId);
          if (!questionExists) {
            continue;
          }

          const existingResponse = await prisma.questionResponse.findUnique({
            where: {
              questionId_userId: {
                questionId: response.questionId,
                userId: invite.userId,
              },
            },
          });

          if (existingResponse) {
            await prisma.questionResponse.update({
              where: {
                id: existingResponse.id,
              },
              data: {
                answer: response.answer,
              },
            });
          } else {
            await prisma.questionResponse.create({
              data: {
                questionId: response.questionId,
                userId: invite.userId,
                answer: response.answer,
              },
            });
          }

          responseResults.push({
            questionId: response.questionId,
            answer: response.answer,
          });
        }
      }

      if (accepted) {
        if (invite.role === InviteRole.ORGANIZER) {
          const existingOrganizer = await prisma.organizer.findUnique({
            where: {
              uid_eid: {
                uid: invite.userId,
                eid: invite.event.eid,
              },
            },
          });

          if (!existingOrganizer) {
            await prisma.organizer.create({
              data: {
                uid: invite.userId,
                eid: invite.event.eid,
              },
            });

            const existingAttendee = await prisma.attendee.findUnique({
              where: {
                uid_eid: {
                  uid: invite.userId,
                  eid: invite.event.eid,
                },
              },
            });

            if (!existingAttendee) {
              await prisma.attendee.create({
                data: {
                  uid: invite.userId,
                  eid: invite.event.eid,
                },
              });
            }
          }
        }
      }

      return {
        iid: invite.id,
        eventId: invite.event.eid,
        accepted,
        responses: responseResults,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error responding to invitation with questions:', error);
      throw new InternalServerErrorException('Failed to respond to invitation');
    }
  },
};
