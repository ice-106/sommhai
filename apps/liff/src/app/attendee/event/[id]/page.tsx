'use client';
import { Events } from '@sommhai/shared-type/src';
import { Circle, User, UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { IoIosTimer } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

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

interface User {
  username: 'Suntoh5';
  phone: string | null;
  email: null;
  picture: '';
}

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
  const [isAttendee, setIsAttendee] = useState(false);
  const [pictureUrl, setPictureUrl] = useState<string | undefined>(undefined);
  const [host, setHost] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setPictureUrl(data.hostPicture);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (event === null) {
    return <div className='flex h-screen w-screen items-center justify-center'>Event not found</div>;
  }

  const getUserInfo = () => {
    fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('user', data);
        setHost(data);
      });
  };
  const openModal = () => {
    setIsModalOpen(true);
    getUserInfo();
  };
  return (
    <div className='bg-white-bg flex h-screen w-screen flex-col'>
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
        <div className='flex w-full flex-col items-center justify-center'>
          <DetailForm eid={id} />
        </div>
        <div className='flex flex-col items-center justify-center gap-3 px-8'>
          {event?.message ? <Message message={event?.message ?? ''} /> : <></>}
          <div
            className='bg-white-pure flex w-full items-center justify-center gap-16 rounded-xl px-32'
            onClick={openModal}
          >
            <Circle className='text-grey-light bg-grey-light border-grey-light !size-36 rounded-full border-[3px]'>
              {pictureUrl ? (
                <Image alt='Profile' height={290} src={pictureUrl} width={290} />
              ) : (
                <User className='text-black-pure h-[20vw]' />
              )}
            </Circle>
            <h1 className='text-bold-20 py-2'>{event?.host}</h1>
          </div>
          <HostInfoModal host={host} isOpen={isModalOpen} userId={userId ?? ''} onClose={closeModal} />
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

export function HostInfoModal({
  isOpen,
  onClose,
  userId,
  host,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  host: User | null;
}) {
  if (!isOpen) return null;

  return (
    <div className='bg-white-pure fixed inset-0 z-50 flex items-center justify-center rounded-2xl bg-opacity-50'>
      <div className='w-full max-w-md rounded-[24px] p-6'>
        <div className='mb-2 flex justify-end'>
          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        {!host ? (
          <div className='py-8 text-center'>Loading host information...</div>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='bg-white-pure flex w-full flex-col items-center justify-center gap-6 rounded-xl p-4'>
              <div className='text-grey-light bg-grey-light border-grey-light mt-16 flex size-36 items-center justify-center rounded-full border-[3px]'>
                {host.picture ? (
                  <Image
                    alt='Profile'
                    className='rounded-full object-cover'
                    height={144}
                    src={host.picture}
                    width={144}
                  />
                ) : (
                  <UserIcon className='text-black-pure h-20 w-20' />
                )}
              </div>
              <h1 className='text-bold-20 py-2 text-xl font-bold'>{host.username}</h1>

              <div className='mb-16 mt-4 w-full space-y-3'>
                <div className='border-b pb-2'>
                  <p className='text-sm text-gray-500'>Phone</p>
                  <p className='font-medium'>{host.phone || 'Not provided'}</p>
                </div>
                <div className='border-b pb-2'>
                  <p className='text-sm text-gray-500'>Email</p>
                  <p className='font-medium'>{host.email || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
