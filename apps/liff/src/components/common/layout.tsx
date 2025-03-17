import { cn } from '@sommhai/ui/src/lib/utils';
import React from 'react';

export default function AppLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <main className='flex w-full justify-center'>
      <div className={cn('relative min-h-dvh w-full max-w-md', className)}>{children}</div>
    </main>
  );
}
