'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import type { Events } from '@sommhai/shared-type/src';
import HeaderBurgur from '@/components/common/HeaderBurgur';
import { AcceptButton } from '@/components/common/acceptdeny-button';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

function AtdEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { userId } = useContext(LiffContext);
  const [event, setEvent] = useState<Events | null>(null);
  const [loading, setLoading] = useState(true);
  const [inv, setInv] = useState('');
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    console.log(event);
    fetch(`${API_BASE_URL}/org/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const eventData = {
          ...data,
          date: new Date(data.date).toISOString().split('T')[0], // Ensure date is formatted for input
        };
        setEvent(eventData as Events);
      });
  }, [id]);
  useEffect(() => {
    const handleAccept = () => {
      if (accepted == true) setLoading(true);
      fetch(`${API_BASE_URL}/org/events/${id}/inv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uids: [userId],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.invites[0].inviteId);
          setInv(data.invites[0].inviteId);
          setLoading(false);
        });
    };
    if (inv !== '') {
      console.log('inv', inv);

      if (loading == false && accepted == true) {
        router.push(`/attendee/event/${id}/${inv}/questions`);
      }
    }
    handleAccept();
  }, [userId, accepted, id]);

  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={id} />
      <div className='flex flex-1 flex-col items-center justify-between gap-[10vh] px-24 py-32'>
        <div
          className='bg-orange-6 flex h-full w-full flex-col justify-center rounded-3xl text-center active:bg-gray-200'
          onClick={() => handleChangePage(2)}
        >
          <h1 className='text-semi-24'>Event Details</h1>
          <p className='text-medium-20'>Click to edit</p>
        </div>
        <div
          className='bg-orange-3 rounded-24 active:bg-orange-4 flex h-full w-full flex-col justify-center text-center'
          onClick={() => handleChangePage(3)}
        >
          <h1 className='text-semi-24'>Message</h1>
          <p className='text-medium-20'>Click to edit</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <AddtoCalendar />
        </div>
        <div className='mt-[-15px] flex h-[100px] w-full items-center justify-center gap-[29px]'>
          <AcceptButton
            className='h-[64px] w-[155px]'
            variant={'Accept'}
            onClick={() => {
              setAccepted(true);
            }}
          >
            Accept
          </AcceptButton>
          <AcceptButton className='h-[64px] w-[155px]' variant={'Deny'}>
            Deny
          </AcceptButton>
        </div>
      </div>
    </div>
  );
}
export default AtdEventPage;
