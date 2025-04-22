import NextAuth from 'next-auth';
import LINE from 'next-auth/providers/line';

import { LINE_CHANNEL_ID, LINE_CHANNEL_SECRET } from '@/env';

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
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
});

export { handler as GET, handler as POST };
