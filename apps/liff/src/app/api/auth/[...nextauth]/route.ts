import NextAuth from 'next-auth';
import LINE from 'next-auth/providers/line';

import { AUTH_SECRET, LINE_CHANNEL_ID, LINE_CHANNEL_SECRET } from '@/env';

const handler = NextAuth({
  providers: [
    LINE({
      clientId: LINE_CHANNEL_ID,
      clientSecret: LINE_CHANNEL_SECRET,
      authorization: {
        params: {
          scope: 'profile openid email',
        },
      },
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile?.name,
          email: profile?.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.refreshToken) {
        session.refreshToken = token.refreshToken;
      }

      return session;
    },
  },
  secret: AUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
});

export { handler as GET, handler as POST };
