'use client';
import liff from '@line/liff';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';
import { ConfirmButton } from '@/components/organizer/buttons';
import { SlidePopUpX } from '@/components/organizer/event/detail/SlidePopup';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL, LIFF_ID } from '@/env';

interface LineProfile {
  displayName: string;
  userId: string;
  pictureUrl?: string;
  statusMessage?: string;
}

function Profile() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const { userId } = useContext(LiffContext);
  const [phone, setPhone] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [profile, setProfile] = useState<LineProfile | undefined>();
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    async function fetchProfile() {
      await liff
        .init({ liffId: LIFF_ID })
        .then(() => liff.getProfile())
        .then((res) => res)
        .then((data) => {
          setProfile(data as LineProfile);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
    fetchProfile();
  }, [profile]);
  useEffect(() => {
    console.log('current id', userId);
    fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setPhone(data.phone);
        setEmail(data.email);
      });
  }, [profile?.userId, userId, submit]);

  const handleEditProfile = ({ phone, email }: { phone: string; email: string }) => {
    fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: profile?.displayName,
        phone: phone,
        email: email,
      }),
    }).then((res) => console.log(res));
    setCurrentPage(0);
    router.refresh();
  };

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='bg-orange-4 flex h-2/3 w-full flex-col overflow-hidden'>
        <HeaderBurgur name='Profile' />
        <div className='bg-orange-4 relative flex flex-col items-center justify-start'>
          <div className='bg-white-bg absolute mt-[8vh] h-[80vh] w-[150vw] rounded-full'></div>
          <div className='bg-grey-light absolute mt-[2vh] flex h-[20vw] w-[20vw] items-center justify-center rounded-full'>
            {profile?.pictureUrl ? (
              <Image alt='Profile' height={290} src={profile.pictureUrl} width={290} />
            ) : (
              <User className='text-black-pure h-[20vw]' />
            )}
          </div>
        </div>

        {/* Profile information section */}
        <div className='flex w-full flex-col items-center justify-start px-6 py-6 pt-[100px]'>
          {/* Line Name */}
          <div className='relative mb-6 w-full max-w-xs'>
            <div className='bg-white-pure w-full rounded-3xl p-5 shadow-sm'>
              <p className='text-black-pure text-lg font-medium'>
                Line Name: <span className='font-bold'>{profile?.displayName}</span>
              </p>
            </div>
          </div>

          {/* Mobile Number */}
          <div className='relative mb-6 w-full max-w-xs'>
            <div className='bg-white-pure w-full rounded-3xl p-5 shadow-sm'>
              <p className='text-black-pure text-lg font-medium' onClick={() => handleChangePage(2)}>
                Mobile Number: <span className='font-bold'>{phone}</span>
              </p>
            </div>
            {currentPage === 2 && (
              <SlidePopUpX
                onClose={() => {
                  setCurrentPage(0);
                }}
              >
                <div className='bg-white-pure mx-8 w-full rounded-3xl p-4 py-20 shadow-sm'>
                  <div className='text-black-pure flex h-[6vh] flex-row items-center justify-center text-lg font-medium'>
                    <label>Mobile : </label>
                    <input
                      className='mx-4 h-full px-4 font-bold'
                      placeholder='Phone No.'
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className='flex w-full flex-col items-center justify-center px-12'>
                    <ConfirmButton
                      onClick={() => {
                        handleEditProfile({ phone: phone ?? 'XXX-XXX-XXXX', email: 'email@gmail.com' });
                      }}
                    />
                  </div>
                </div>
              </SlidePopUpX>
            )}
          </div>

          {/* Email */}
          <div className='relative mb-6 w-full max-w-xs'>
            <div className='bg-white-pure w-full rounded-3xl p-5 shadow-sm'>
              <p className='text-black-pure text-lg font-medium' onClick={() => handleChangePage(1)}>
                Email: <span className='font-bold'>{email}</span>
              </p>
            </div>
            {currentPage === 1 && (
              <SlidePopUpX
                onClose={() => {
                  setCurrentPage(0);
                }}
              >
                <div className='bg-white-pure mx-8 w-full rounded-3xl p-4 py-20 shadow-sm'>
                  <div className='text-black-pure flex h-[6vh] flex-row items-center justify-center text-lg font-medium'>
                    <label>Email : </label>
                    <input
                      className='mx-4 h-full px-4 font-bold'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className='flex w-full flex-col items-center justify-center px-12'>
                    <ConfirmButton
                      onClick={() => {
                        handleEditProfile({ phone: phone ?? 'XXX-XXX-XXXX', email: email ?? 'email@gmail.com' });
                      }}
                    />
                  </div>
                </div>
              </SlidePopUpX>
            )}
          </div>
        </div>
      </div>
      <div className='bg-white-bg h-full w-full flex-1'></div>
    </div>
  );
}

export default Profile;
