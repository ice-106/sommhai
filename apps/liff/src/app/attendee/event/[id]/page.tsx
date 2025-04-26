'use client';
import { Events } from '@sommhai/shared-type/src';
import { Circle, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inv, setInv] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [isAttendee, setIsAttendee] = useState(false);
  useEffect(() => {
    console.log(event);
    fetch(`${API_BASE_URL}/atd/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const eventData = {
          ...data,
          date: new Date(data.date).toISOString().split('T')[0],
          time: {
            hour: data.date.toString().split('T')[1].split(':')[0],
            minute: data.date.toString().split('T')[1].split(':')[1],
          },
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
          console.log('data', data);
          try {
            if (data.invites[0].error == 'User is already an attendee') {
              console.log('User is already an attendee');
              setIsAttendee(true);
            } else {
              console.log('inv', data.invites[0].inviteId);
              setInv(data.invites[0].inviteId);
            }
          } catch (error) {
            console.log('error', error);
          }
        });
    };
    if (inv !== '') {
      console.log('inv', inv);
      fetch(`${API_BASE_URL}/atd/events/${inv}/respond`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accept: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('inv res', data);
          setCompleted(true);
          setLoading(false);
        });

      if (completed == false && accepted == true) {
        router.push(`/attendee/event/${id}/${inv}/questions`);
      }
    }
    handleAccept();
  }, [userId, accepted, id, inv, loading, router]);

  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={'Events'} />
      <div className='flex flex-1 flex-col items-center justify-between gap-24 px-24 py-16'>
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
        {isAttendee ? (
          ''
        ) : (
          <div className='mt-[-15px] flex h-[100px] w-full items-center justify-center gap-[29px]'>
            {loading ? (
              <button className='bg-orange-6 text-white-pure h-[64px] w-[155px] rounded-2xl'>Loading...</button>
            ) : (
              <AcceptButton
                className='h-[64px] w-[155px]'
                variant={'Accept'}
                onClick={() => {
                  setAccepted(true);
                }}
              >
                Accept
              </AcceptButton>
            )}
            <Link href={`/attendee`}>
              <AcceptButton className='h-[64px] w-[155px]' variant={'Deny'}>
                Deny
              </AcceptButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
