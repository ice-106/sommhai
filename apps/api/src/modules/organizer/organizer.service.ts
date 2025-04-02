import { InternalServerErrorException } from '../../common/exception/http';
import {
  CreateEventOptions,
  GetEventDetailsOptions,
  GetEventOptions,
  GetManyEventsOptions,
  UpdateEventDetailsOptions,
} from './types';

export const OrganizerService = {
  getEvents: async ({ type, date, before, status, take, skip }: GetManyEventsOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
  getEvent: async ({ eventId }: GetEventOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
  createEvent: async ({ name }: CreateEventOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
  updateEventDetails: async ({
    name,
    date,
    description,
    invite_list,
    memory,
    location,
    time,
    picture,
  }: UpdateEventDetailsOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
  getEventDetails: async ({ eventId }: GetEventDetailsOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
};
