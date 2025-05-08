'use client';

import type { Liff } from '@line/liff';
import React from 'react';
import { createContext, useEffect, useState } from 'react';

import { API_BASE_URL, LIFF_ID } from '@/env';

interface LiffContextProps {
  liffObject: Liff | null;
  liffError: string | null;
  userId: string | null;
}

export const LiffContext = createContext<LiffContextProps>({
  liffObject: null,
  liffError: null,
  userId: null,
});

export function LiffProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    import('@line/liff')
      .then((liff) => liff.default)
      .then((liff) => {
        liff.init({ liffId: LIFF_ID! }).then(() => {
          if (!liff.isLoggedIn()) {
            liff.login();
          } else {
            // 3. Get user profile if user is logged in
            liff.getProfile().then((profile) => {
              // Access user ID and other profile information
              const userId = profile.userId;
              setUserId(userId); // Store userId in state
              console.log('User ID:', userId);

              // You can access other profile info as well
              const displayName = profile.displayName;

              fetch(`${API_BASE_URL}/users/create`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid: userId,
                  username: displayName,
                  picture: profile.pictureUrl,
                }),
              });
              console.log('User not found, creating new user...');
              // User not found, create a new user
            });
            console.log('LIFF init succeeded.');
            setLiffObject(liff);
          }
        });
      })
      .catch((error: Error) => {
        console.log('LIFF ID', LIFF_ID);
        console.error('LIFF init failed.');
        setLiffError(error.toString());
      });
  }, []);

  return (
    <LiffContext.Provider
      value={{
        liffObject,
        liffError,
        userId,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
}
