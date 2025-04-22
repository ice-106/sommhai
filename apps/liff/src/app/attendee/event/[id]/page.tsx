'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Circle, User } from 'lucide-react';
import type { Events } from '@/types/event';
import DetailForm from '@/components/attendee/Detail';
import Message from '@/components/attendee/Message';
import { AcceptButton } from '@/components/common/acceptdeny-button';
import AddtoCalendar from '@/components/common/AddtoCalendar-Button';
import HeaderBurgur from '@/components/common/HeaderBurgur';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

export default function AtdEventPage() {
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
        <div className='flex w-full flex-col items-center justify-center gap-[20px]'>
          <div className='flex flex-col items-center justify-center gap-24'>
            <DetailForm eid={id} />
          </div>
          <div className='flex flex-col items-center justify-center gap-24'>
            <Message message={event?.message ?? ''} />
            <div className='mt-[-15px] flex w-full items-center justify-center gap-16'>
              <Circle className='text-grey-light bg-grey-light border-grey-light !size-36 rounded-full border-[3px]'>
                <User className='text-black-pure' />
              </Circle>
              <h1 className='text-bold-20 py-2'>{event?.host}</h1>
            </div>
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
    </div>
  );
}
