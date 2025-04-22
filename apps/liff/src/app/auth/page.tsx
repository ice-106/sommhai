'use client';

import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const AuthPage = () => {
  const { data: session } = useSession();
  if (session) {
    console.log('session', session);
    redirect('/');
  }
  return (
    <div className='bg-orange-2 flex h-screen flex-col items-center justify-center gap-[15px]'>
      <p className='text-bold-26 text-white-pure text-center'>Allow Sommhai to access your data page?</p>
      <button
        className='h-10 rounded-3xl bg-[#06C755] px-8 text-2xl font-medium text-white'
        onClick={() => signIn('line', { callbackUrl: '/' })}
      >
        <p>Log in with LINE</p>
      </button>
    </div>
  );
};

export default AuthPage;
