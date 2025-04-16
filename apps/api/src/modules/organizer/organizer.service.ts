import { Prisma } from '@prisma/client';

import { InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  CreateAttendeeInviteOptions,
  CreateOrganizerInviteOptions,
  GetEventOptions,
  GetManyEventsOptions,
  RespondOrganizerInviteOptions,
} from './types';

export const OrganizerService = {
  getEvents: async ({ search, date, take, skip }: GetManyEventsOptions) => {
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
};
