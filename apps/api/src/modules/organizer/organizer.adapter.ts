import { EventEntity } from './types';

export const OrganizerAdapter = {
  toEventOrganizerInfo: (event: EventEntity) => {
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
    };
  },
};
