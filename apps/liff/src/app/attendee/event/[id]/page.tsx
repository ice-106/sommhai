'use client';
import { Events } from '@sommhai/shared-type/src';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { IoIosTimer } from 'react-icons/io';

import DetailForm from '@/components/attendee/Detail';
import Message from '@/components/attendee/Message';
import AcceptModal from '@/components/common/Accept';
import { AcceptButton } from '@/components/common/acceptdeny-button';
import AddtoCalendar from '@/components/common/AddtoCalendar-Button';
import HeaderBurgur from '@/components/common/HeaderBurgur';
import RejectModal from '@/components/common/Reject';
import { SlidePopUpX } from '@/components/common/SlidePopup';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';
import { getDateDifferenceLabel } from '@/utils/date';

export default function AtdEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { userId } = useContext(LiffContext);
  const [event, setEvent] = useState<Events | null>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [inv, setInv] = useState('');
  const [page, setPage] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [isAttendee, setIsAttendee] = useState(false);
  useEffect(() => {
    console.log(event);
    const getData = () =>
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
          console.log('eventData', eventData);
          setEvent(eventData as Events);
        });
    const getAttending = () =>
      fetch(`${API_BASE_URL}/atd/events/${id}/attending?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('attending', data);
          if (data.isAttending) {
            setIsAttendee(true);
          }
        });
    getData();
    getAttending();
  }, [id]);

  const handleInvite = () => {
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
            console.log('User i s already an attendee', data);
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

  const handleAccept = () => {
    setLoading(true);
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
        setPage(0);
        router.push(`/attendee/event/${id}/${inv}/questions`);
      });
  };

  const handleReject = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/atd/events/${inv}/respond`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accept: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('inv res', data);
        setCompleted(true);
        setPage(0);
        router.push(`/attendee`);
      });
  };
  if (event === null) {
    return <div className='flex h-screen w-screen items-center justify-center'>Event not found</div>;
  }

  return (
    <div className='flex h-screen w-screen flex-col'>
      <HeaderBurgur name={`Events`} />
      <div className='flex flex-1 flex-col items-center justify-between gap-24 px-24 py-16'>
        <div>
          <h1 className='text-3xl font-semibold'>{event?.name}</h1>
          <h2 className='text-orange-1 flex flex-row items-center gap-2 text-xl font-semibold'>
            <IoIosTimer className='text-orange-2 mt-[4px]' />
            {getDateDifferenceLabel(
              typeof event?.date === 'string' ? event.date : (event?.date?.toString() ?? new Date().toString()),
            )}
          </h2>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-24'>
          <DetailForm eid={id} />
        </div>
        <div className='flex flex-col items-center justify-center gap-24'>
          {event?.message ? <Message message={event?.message ?? ''} /> : <></>}
          <div className='mt-[-15px] flex w-full items-center justify-center gap-16'>
            {/* <Circle className='text-grey-light bg-grey-light border-grey-light !size-36 rounded-full border-[3px]'>
              
            </Circle> */}
            <h1 className='text-bold-20 py-2'>{event?.host}</h1>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <AddtoCalendar />
        </div>
        {isAttendee ? (
          <div>
            <h1 className='text-bold-20 py-2'>You are attending this event.</h1>
            {/* <AcceptButton
              className='h-[64px] w-full'
              variant={'Deny'}
              onClick={() => {
                setPage(2);
                handleInvite();
              }}
            >
              Not attending
            </AcceptButton>
            {page === 2 && (
              <SlidePopUpX
                onClose={() => {
                  setPage(0);
                }}
              >
                <RejectModal handleReject={handleReject} setPage={setPage} />
              </SlidePopUpX>
            )} */}
          </div>
        ) : (
          <div className='flex w-full items-center justify-between gap-20'>
            {loading ? (
              <button className='bg-orange-6 text-white-pure h-[64px] w-[155px] rounded-2xl'>Loading...</button>
            ) : (
              <div className='w-full'>
                <AcceptButton
                  className='h-[64px] w-full'
                  variant={'Accept'}
                  onClick={() => {
                    handleInvite();
                    setPage(1);
                  }}
                >
                  Accept
                </AcceptButton>
                {page === 1 && (
                  <SlidePopUpX
                    onClose={() => {
                      setPage(0);
                    }}
                  >
                    <AcceptModal handleAccept={handleAccept} setPage={setPage} />
                  </SlidePopUpX>
                )}
              </div>
            )}
            {loading ? (
              <button className='text-white-pure h-[64px] w-[155px] rounded-2xl bg-red-600'>Loading...</button>
            ) : (
              <div className='w-full'>
                <AcceptButton
                  className='h-[64px] w-full'
                  variant={'Deny'}
                  onClick={() => {
                    setPage(2);
                    handleInvite();
                  }}
                >
                  Deny
                </AcceptButton>
                {page === 2 && (
                  <SlidePopUpX
                    onClose={() => {
                      setPage(0);
                    }}
                  >
                    <RejectModal handleReject={handleReject} setPage={setPage} />
                  </SlidePopUpX>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
