export * from './libs/attendee';
export * from './libs/event';
export * from './libs/organizer';
export * from './libs/user';

export interface Events {
  eid: string;
  name: string;
  message: string | null;
  date: Date;
  time: Date;
  picture: string[];
  location: string;
  description: string | null;
  invite_list: number;
  memory: string | null;
  host: string;
  host_uid: string;
  status: string;
}

export interface Attendee {
  uid: string;
  name: string;
  eid: string;
}
export interface Organizer {
  uid: string;
  name: string;
  eid: string;
}
