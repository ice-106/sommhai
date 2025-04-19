import { Prisma } from '@prisma/client';

import { ConflictException, InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  CreateAttendeeInviteOptions,
  createLeaderboardOptions,
  CreateOrganizerInviteOptions,
  DeleteLeaderboardEntryOptions,
  GetEventLeaderboardOptions,
  GetEventOptions,
  GetManyEventsOptions,
  RespondOrganizerInviteOptions,
  updateLeaderboardOptions,
} from './types';

export const OrganizerService = {
  getEvents: async ({ search, date, take, skip, status }: GetManyEventsOptions) => {
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
  updateEventDetails: async ({ eventId, event }: { eventId: string; event: Prisma.EventUncheckedUpdateInput }) => {
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
  inviteAttendees: async ({ eventId, uids }: CreateAttendeeInviteOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const createdInvitations = await Promise.all(
        uids.map(async (uid) => {
          try {
            const user = await prisma.user.findUnique({
              where: { uid },
            });

            if (!user) {
              return {
                success: false,
                uid,
                error: 'User not found',
              };
            }

            const existingAttendee = await prisma.attendee.findUnique({
              where: {
                uid_eid: {
                  uid,
                  eid: eventId,
                },
              },
            });

            if (existingAttendee) {
              return {
                success: false,
                uid,
                error: 'User is already an attendee',
              };
            }

            const existingInvitation = await prisma.attendeeInvitation.findUnique({
              where: {
                eid_uid: {
                  eid: eventId,
                  uid,
                },
              },
            });

            if (existingInvitation) {
              await prisma.attendeeInvitation.update({
                where: { id: existingInvitation.id },
                data: {
                  accept: null,
                  updated_at: new Date(),
                },
              });

              return {
                success: true,
                uid,
                invitationId: existingInvitation.id,
              };
            }

            const invitation = await prisma.attendeeInvitation.create({
              data: {
                eid: eventId,
                uid,
                accept: null,
              },
            });

            return {
              success: true,
              uid,
              invitationId: invitation.id,
            };
          } catch (error) {
            console.error(`Error inviting user ${uid}:`, error);
            return {
              success: false,
              uid,
              error: 'Failed to create invitation',
            };
          }
        }),
      );

      return {
        eventId,
        invitations: createdInvitations,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inviting attendees:', error);
      throw new InternalServerErrorException('Failed to invite attendees');
    }
  },
  inviteOrganizers: async ({ eventId, uids }: CreateOrganizerInviteOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const createdInvitations = await Promise.all(
        uids.map(async (uid) => {
          try {
            const user = await prisma.user.findUnique({
              where: { uid },
            });

            if (!user) {
              return {
                success: false,
                uid,
                error: 'User not found',
              };
            }

            const existingOrganizer = await prisma.organizer.findUnique({
              where: {
                uid_eid: {
                  uid,
                  eid: eventId,
                },
              },
            });

            if (existingOrganizer) {
              return {
                success: false,
                uid,
                error: 'User is already an organizer',
              };
            }

            const existingInvitation = await prisma.organizerInvitation.findUnique({
              where: {
                eid_uid: {
                  eid: eventId,
                  uid,
                },
              },
            });

            if (existingInvitation) {
              await prisma.organizerInvitation.update({
                where: { id: existingInvitation.id },
                data: {
                  accept: null,
                  updated_at: new Date(),
                },
              });

              return {
                success: true,
                uid,
                invitationId: existingInvitation.id,
              };
            }

            const invitation = await prisma.organizerInvitation.create({
              data: {
                eid: eventId,
                uid,
                accept: null,
              },
            });

            return {
              success: true,
              uid,
              invitationId: invitation.id,
            };
          } catch (error) {
            console.error(`Error inviting user ${uid}:`, error);
            return {
              success: false,
              uid,
              error: 'Failed to create invitation',
            };
          }
        }),
      );

      return {
        eventId,
        invitations: createdInvitations,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error inviting organizers:', error);
      throw new InternalServerErrorException('Failed to invite organizers');
    }
  },
  respondOrganizerInvite: async ({ invitationId, accept }: RespondOrganizerInviteOptions) => {
    try {
      const invitation = await prisma.organizerInvitation.findUnique({
        where: { id: invitationId },
      });

      if (!invitation) {
        throw new NotFoundException('Invitation not found');
      }

      await prisma.organizerInvitation.update({
        where: { id: invitationId },
        data: { accept },
      });

      if (accept) {
        const existingOrganizer = await prisma.organizer.findUnique({
          where: {
            uid_eid: {
              uid: invitation.uid,
              eid: invitation.eid,
            },
          },
        });

        if (!existingOrganizer) {
          await prisma.organizer.create({
            data: {
              uid: invitation.uid,
              eid: invitation.eid,
            },
          });
        }

        const existingAttendee = await prisma.attendee.findUnique({
          where: {
            uid_eid: {
              uid: invitation.uid,
              eid: invitation.eid,
            },
          },
        });

        if (!existingAttendee) {
          await prisma.attendee.create({
            data: {
              uid: invitation.uid,
              eid: invitation.eid,
            },
          });
        }
      }
      return {
        iid: invitation.id,
        eventId: invitation.eid,
        accepted: accept,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error responding to organizer invite:', error);
      throw new InternalServerErrorException('Failed to respond to organizer invitation');
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

  createLeaderboard: async ({ eventId, name, uid, score = 0 }: createLeaderboardOptions) => {
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
          name,
          eid: eventId,
        },
      });

      if (existingEntry) {
        throw new ConflictException(`Leaderboard entry with name '${name}' already exists`);
      }

      const newEntry = await prisma.leaderboard.create({
        data: {
          name,
          uid,
          eid: eventId,
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

  updateLeaderboard: async ({ eventId, name, updates }: updateLeaderboardOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const existingEntry = await prisma.leaderboard.findFirst({
        where: {
          name,
          eid: eventId,
        },
      });

      if (!existingEntry) {
        throw new NotFoundException(`Leaderboard entry '${name}' not found for this event`);
      }

      if (updates.name && updates.name !== name) {
        const entryWithNewName = await prisma.leaderboard.findUnique({
          where: { name: updates.name },
        });

        if (entryWithNewName) {
          throw new ConflictException(`Leaderboard entry with name '${updates.name}' already exists`);
        }
      }

      const updatedEntry = await prisma.leaderboard.update({
        where: {
          name,
          eid: eventId,
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

  deleteLeaderboardEntry: async ({ eventId, name }: DeleteLeaderboardEntryOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const existingEntry = await prisma.leaderboard.findFirst({
        where: {
          name,
          eid: eventId,
        },
      });

      if (!existingEntry) {
        throw new NotFoundException(`Leaderboard entry '${name}' not found for this event`);
      }

      await prisma.leaderboard.delete({
        where: {
          name,
          eid: eventId,
        },
      });

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error deleting leaderboard entry:', error);
      throw new InternalServerErrorException(error, 'Failed to delete leaderboard entry');
    }
  },
};
