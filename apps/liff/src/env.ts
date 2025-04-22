import 'dotenv/config';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

export const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || '';
export const LIFF_URL = process.env.NEXT_PUBLIC_LIFF_URL || '';
export const LINE_CHANNEL_ID = process.env.LINE_CHANNEL_ID as string;
export const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET as string;

export const AUTH_SECRET = process.env.AUTH_SECRET as string;
