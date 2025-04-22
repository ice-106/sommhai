'use client';

import type { Liff } from '@line/liff';
import React from 'react';
import { createContext, useEffect, useState } from 'react';

import { LIFF_ID } from '@/env';

interface LiffContextProps {
  liffObject: Liff | null;
  liffError: string | null;
}

export const LiffContext = createContext<LiffContextProps>({
  liffObject: null,
  liffError: null,
});

export function LiffProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  useEffect(() => {
    import('@line/liff')
      .then((liff) => liff.default)
      .then((liff) => {
        liff
          .init({ liffId: LIFF_ID! })
          .then(() => {
            console.log('LIFF init succeeded.');
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.error('LIFF init failed.');
            setLiffError(error.toString());
          })
          .then(() => {
            if (liff.isLoggedIn()) {
              console.log('LIFF is logged in.');
            } else {
              console.log('LIFF is not logged in.');
              liff.login();
            }
          });
      })
      .catch((error: Error) => {
        console.error('LIFF init failed.');
        setLiffError(error.toString());
      });
  }, []);

  return (
    <LiffContext.Provider
      value={{
        liffObject,
        liffError,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
}
