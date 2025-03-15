'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { getQueryClient } from '@/libs/reactQuery';
import { tsr } from '@/libs/tsr';

export const QueryProvider = ({ children }: { children: React.JSX.Element }) => {
  const queryClientProvider = getQueryClient(true);

  return (
    <QueryClientProvider client={queryClientProvider}>
      <tsr.ReactQueryProvider>{children}</tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
};
