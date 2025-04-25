'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillHome, AiOutlineHistory, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';

export default function HeaderBurgur({ name }: { name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpenmenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className=''>
      <div className='flex h-[4rem] w-full justify-between shadow-md'>
        <div className='flex h-full w-[70%] items-center'>
          <p className='truncate px-32 text-center text-3xl font-bold'>{name}</p>
        </div>
        <div className='mx-6 flex h-full items-center' onClick={handleOpenmenu}>
          <AiOutlineMenu size='2rem' />
        </div>
      </div>
      <div
        className={menuOpen ? 'fixed left-0 top-0 z-[10] h-screen w-screen' : 'fixed left-[-100%]'}
        onClick={handleOpenmenu}
      >
        <div
          className={
            menuOpen
              ? 'fixed left-0 top-0 h-screen w-[65%] rounded-r-3xl bg-zinc-200 p-10 shadow-sm duration-300 ease-in'
              : 'fixed left-[-100%] top-0 h-screen w-[65%] rounded-r-3xl bg-zinc-200 p-10 shadow-sm duration-300 ease-in'
          }
        >
          <div className='h-full'>
            <Link href='/'>
              <p className='text-[1.75rem] font-bold'>Sommhai</p>
            </Link>
            <div className='mx-3 w-full border-b-2 border-s-gray-600' />
            <div className='flex flex-col py-[2rem]'>
              <ul>
                <Link href='/'>
                  <li className='flex py-2 pl-2'>
                    <AiFillHome size='1.2rem' />
                    <p className='ml-1'>Home</p>
                  </li>
                </Link>
                <Link href='/profile'>
                  <li className='flex py-2 pl-2'>
                    <AiOutlineUser size='1.2rem' />
                    <p className='ml-1'>Profile</p>
                  </li>
                </Link>
                <Link href='/history'>
                  <li className='flex py-2 pl-2'>
                    <AiOutlineHistory size='1.2rem' />
                    <p className='ml-1'>History</p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
