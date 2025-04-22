import { contract } from '@sommhai/api-contract';
import { initServer } from '@ts-rest/express';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { AttendeeController } from './modules/attendee/attendee.controller';
import { OrganizerController } from './modules/organizer/organizer.controller';
import { UserController } from './modules/user/user.controller';

const s = initServer();

export const router: RouterImplementation<typeof contract> = s.router(contract, {
  user: UserController,
  organizer: OrganizerController,
  attendee: AttendeeController,
});
