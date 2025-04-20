import { InviteRole, Prisma, QuestionType } from '@prisma/client';

import { ConflictException, InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  CreateEventInviteOptions,
  CreateLeaderboardOptions,
  CreateManyEventQuestionOptions,
  DeleteAllEventQuestionOptions,
  DeleteEventInviteOptions,
  DeleteLeaderboardEntryOptions,
  DeleteManyEventQuestionOptions,
  GetEventInviteOptions,
  GetEventLeaderboardOptions,
  GetEventOptions,
  GetEventQuestionOptions,
  GetManyEventInvitesOptions,
  GetManyEventQuestionOptions,
  GetManyEventsOptions,
  RespondToEventInviteOptions,
  UpdateEventQuestionOptions,
  UpdateLeaderboardOptions,
} from './types';

export const OrganizerService = {
  getEvents: async ({ search, date, take, skip, status, userId }: GetManyEventsOptions) => {
    const events = await prisma.event.findMany({
      take,
      skip,
      where: {
        date,
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
      },
    });

    if (!event) {
      throw new NotFoundException(`Event not found`);
    }

    return event;
  },
  createEvent: async ({ event }: { event: Prisma.EventUncheckedCreateInput }) => {
    try {
      let testUser = await prisma.user.findFirst();

      if (!testUser) {
        // Create a test user if none exists
        testUser = await prisma.user.create({
          data: {
            phone: '1234567890',
            email: 'test@example.com',
            dob: new Date(),
            pref_name: 'Test User',
            first_name: 'Test',
            last_name: 'User',
            subscription_plan: 'free',
          },
        });
      }

      return await prisma.event.create({
        data: {
          ...event,
          host: testUser.pref_name,
          host_uid: testUser.uid,
          status: 'Upcoming',
          attendees: {
            create: [
              {
                uid: testUser.uid,
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
      return invites;
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

      return questions;
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

      return question;
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
  getEventLeaderboard: async ({ eventId }: GetEventLeaderboardOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const leaderboardEntries = await prisma.leaderboard.findMany({
        where: { eid: eventId },
        orderBy: { score: 'desc' },
      });

      return leaderboardEntries;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error getting event leaderboard:', error);
      throw new InternalServerErrorException(error, 'Failed to get event leaderboard');
    }
  },

  createLeaderboard: async ({ eventId, uid, score = 0 }: CreateLeaderboardOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const user = await prisma.user.findUnique({
        where: { uid },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${uid} not found`);
      }

      const existingEntry = await prisma.leaderboard.findFirst({
        where: {
          eid: eventId,
        },
      });

      if (existingEntry) {
        throw new ConflictException(`Leaderboard entry with name '${name}' already exists`);
      }

      const newEntry = await prisma.leaderboard.create({
        data: {
          uid: uid,
          eid: eventId,
          name: '',
          score,
        },
      });

      return newEntry;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating leaderboard entry:', error);
      throw new InternalServerErrorException(error, 'Failed to create leaderboard entry');
    }
  },

  updateLeaderboard: async ({ eventId, entryId, updates }: UpdateLeaderboardOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const existingEntry = await prisma.leaderboard.findFirst({
        where: {
          id: entryId,
          eid: eventId,
        },
      });

      if (!existingEntry) {
        throw new NotFoundException(`Leaderboard entry '${entryId}' not found for this event`);
      }

      if (updates.uid == existingEntry.uid) {
        const entryWithNewName = await prisma.leaderboard.findUnique({
          where: { uid_eid: { uid: existingEntry.uid, eid: eventId } },
        });

        if (entryWithNewName) {
          throw new ConflictException(`Leaderboard entry with name '${updates.uid}' already exists`);
        }
      }

      const updatedEntry = await prisma.leaderboard.update({
        where: {
          uid_eid: {
            uid: existingEntry.uid,
            eid: eventId,
          },
        },
        data: updates,
      });

      return updatedEntry;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      console.error('Error updating leaderboard entry:', error);
      throw new InternalServerErrorException(error, 'Failed to update leaderboard entry');
    }
  },

  deleteLeaderboardEntry: async ({ eventId }: DeleteLeaderboardEntryOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const existingEntry = await prisma.leaderboard.findFirst({
        where: {
          eid: eventId,
        },
      });

      if (!existingEntry) {
        throw new NotFoundException(`Leaderboard entry not found for this event`);
      }

      await prisma.leaderboard.delete({
        where: {
          uid_eid: {
            uid: existingEntry.uid,
            eid: eventId,
          },
        },
      });

      return existingEntry;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting leaderboard entry:', error);
      throw new InternalServerErrorException(error, 'Failed to delete leaderboard entry');
    }
  },
};
