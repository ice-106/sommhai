import 'dotenv/config';

export const PORT = process.env.PORT || 8080;

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

export const LINE_MSG_API_CHANNEL_SECRET = process.env.LINE_MSG_API_CHANNEL_SECRET || '';
export const LINE_MSG_API_CHANNEL_ACCESS_TOKEN = process.env.LINE_MSG_API_CHANNEL_ACCESS_TOKEN || '';
