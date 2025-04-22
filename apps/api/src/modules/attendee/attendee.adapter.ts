import { EventEntity, InviteEntity, LeaderboardEntity } from './types';

export const AttendeeAdapter = {
  toEventAttendeeInfo: (event: EventEntity) => {
    return {
      eid: event.eid,
      name: event.name,
      date: event.date,
      time: event.time,
      picture: event.picture,
      location: event.location,
      description: event.description,
      invite_list: event.invite_list,
      memory: event.memory,
      host: event.host,
      host_uid: event.host_uid,
      attendees: event.attendees,
      attendings: event.attendings,
      organizers: event.organizers,
      status: event.status,
      message: event.message,
    };
  },
  toLeaderboardEntry: (entry: LeaderboardEntity) => {
    return {
      entryId: entry.id,
      uid: entry.uid,
      eid: entry.eid,
      score: entry.score,
    };
  },
  toEventInviteInfo: (invite: InviteEntity) => {
    return {
      inviteId: invite.id,
      eventId: invite.eventId,
      userId: invite.userId,
      role: invite.role,
      accept: invite.accept,
    };
  },
};
