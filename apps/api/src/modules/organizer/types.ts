export interface GetEventOptions {
  eventId: string;
}

export interface GetManyEventsOptions {
  type?: string;
  date?: string;
  before?: string;
  status?: string;
  take?: number;
  skip?: number;
}

export interface CreateEventOptions {
  name: string;
}

export interface UpdateEventDetailsOptions {
  name?: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
  invite_list?: number;
  memory?: string;
  picture?: string;
}

export interface GetEventDetailsOptions {
  eventId: string;
}
