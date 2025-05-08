export * from './libs/attendee';
export * from './libs/event';
export * from './libs/organizer';
export * from './libs/user';

type QuestionType = 'SHORT_ANSWER' | 'MULTIPLE_CHOICE' | 'CHECKBOX';
export interface Question {
  qid: string;
  question: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}
export interface Answer extends Question {
  responses: [
    {
      answer: string;
      uid: string;
    },
  ];
}
export interface Events {
  eid: string;
  name: string;
  message: string | null;
  date: Date | string | null;
  time: { hour: string; minute: string } | null;
  picture: string[];
  location: string;
  description: string | null;
  invite_list: number;
  memory: string | null;
  host: string;
  host_uid: string;
  status: string;
  attendees: Attendee[];
  attending: Attendee[];
  organizers: Organizer[];
}

export interface Invite {
  inviteId: string;
  eventId: string;
  userId: string;
  role: string;
  accept: boolean;
}

export interface Attendee {
  uid: string;
  eid: string;
}
export interface Organizer {
  uid: string;
  name: string;
  eid: string;
}
