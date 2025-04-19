import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { OrganizerAdapter } from './organizer.adapter';
import { OrganizerService } from './organizer.service';

export const OrganizerController: RouterImplementation<typeof contract.organizer> = {
  getEvent: async ({ params: { eventId } }) => {
    const event = await OrganizerService.getEvent({ eventId });

    return {
      status: 200,
      body: OrganizerAdapter.toEventOrganizerInfo(event),
    };
  },
  getEvents: async ({ query: { search, date, take, skip, status } }) => {
    const events = await OrganizerService.getEvents({ search, date, take, skip, status });

    return {
      status: 200,
      body: events.map((event) => OrganizerAdapter.toEventOrganizerInfo(event)),
    };
  },
  createEvent: async ({ body: { name } }) => {
    const newEvent = await OrganizerService.createEvent({
      event: {
        name,
        date: new Date(),
        time: new Date(),
        location: '',
        description: '',
        invite_list: 0,
        memory: '',
        picture: [],
        host: '',
        host_uid: '',
        status: 'Upcoming',
      },
    });

    const event = await OrganizerService.getEvent({ eventId: newEvent.eid });
    return {
      status: 201,
      body: event,
    };
  },

  updateEvent: async ({
    params: { eventId },
    body: { name, date, description, invite_list, memory, location, time, picture },
  }) => {
    await OrganizerService.updateEventDetails({
      eventId,
      event: {
        name,
        date,
        description,
        invite_list,
        memory,
        location,
        time,
        picture: picture ?? [],
      },
    });

    const event = await OrganizerService.getEvent({ eventId });

    return {
      status: 200,
      body: OrganizerAdapter.toEventOrganizerInfo(event),
    };
  },
  inviteAttendees: async ({ params: { eventId }, body: { uids } }) => {
    const attendeeInvitation = await OrganizerService.inviteAttendees({ eventId, uids });

    return {
      status: 201,
      body: attendeeInvitation,
    };
  },

  inviteOrganizers: async ({ params: { eventId }, body: { uids } }) => {
    const organizerInvitation = await OrganizerService.inviteOrganizers({ eventId, uids });

    return {
      status: 201,
      body: organizerInvitation,
    };
  },
  respondOrganizerInvite: async ({ params: { invitationId }, body: { accept } }) => {
    const response = await OrganizerService.respondOrganizerInvite({ invitationId, accept });
    return {
      status: 200,
      body: response,
    };
  },
  getLeaderboard: async ({ params: { eventId } }) => {
    const leaderboard = await OrganizerService.getEventLeaderboard({ eventId });

    return {
      status: 200,
      body: leaderboard.map((entry) => OrganizerAdapter.toLeaderboardEntry(entry)),
    };
  },

  createLeaderboard: async ({ params: { eventId }, body: { name, uid, score } }) => {
    const newEntry = await OrganizerService.createLeaderboard({
      eventId,
      name,
      uid,
      score,
    });

    return {
      status: 201,
      body: OrganizerAdapter.toLeaderboardEntry(newEntry),
    };
  },

  updateLeaderboard: async ({ params: { eventId, name }, body: { name: newName, score } }) => {
    const updatedEntry = await OrganizerService.updateLeaderboard({
      eventId,
      name,
      updates: {
        name: newName,
        score,
      },
    });

    return {
      status: 200,
      body: OrganizerAdapter.toLeaderboardEntry(updatedEntry),
    };
  },

  deleteLeaderboardEntry: async ({ params: { eventId, name } }) => {
    await OrganizerService.deleteLeaderboardEntry({ eventId, name });

    return {
      status: 204,
      body: null,
    };
  },
};
