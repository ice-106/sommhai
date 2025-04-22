import { InviteRole } from '@prisma/client';

import { InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  GetEventOptions,
  GetManyEventsOptions,
  RespondToEventInviteOptions,
  RespondWithQuestionsOptions,
} from './types';

export const AttendeeService = {
  getAtdEvents: async ({ search, date, take, skip, status }: GetManyEventsOptions) => {
    const events = await prisma.event.findMany({
      take,
      skip,
      where: {
        date,
        AND: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
          description: {
            contains: search,
            mode: 'insensitive',
          },
          status: {
            contains: status,
            mode: 'insensitive',
          },
        },
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
  getAtdEvent: async ({ eventId }: GetEventOptions) => {
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

      if (invite.role !== InviteRole.ATTENDEE) {
        throw new NotFoundException('Only attendees can respond to attendee invitations');
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
            submitted: true,
          });
        }
      }

      if (accepted) {
        if (invite.role === InviteRole.ATTENDEE) {
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
