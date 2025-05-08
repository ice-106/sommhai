'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Loading from '@/components/common/loading';
import { LiffContext } from '@/contexts/global/liff';
import { API_BASE_URL } from '@/env';

const createEventSchema = z.object({
  eventName: z.string().min(1, 'Name is required'),
});

type FormData = z.infer<typeof createEventSchema>;

function CreateEventForm() {
  const { userId } = useContext(LiffContext);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
  });

  function createEvent(name: string) {
    const res = fetch(`${API_BASE_URL}/org/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: userId,
        name: name,
      }),
    });
    console.log('Event created successfully with name' + name);
  }

  const onSubmit = (data: FormData) => {
    setEventName(data.eventName);
    createEvent(data.eventName);
    setLoading(false);
    setStep(2);
  };

  const onReturn = () => {
    // Move this to server action ASAP!!!!
    redirect('/organizer');
  };
  if (loading === true && step === 2) {
    return <Loading />;
  }

  return (
    <div className='bg-orange-4 flex h-full w-full flex-col items-center justify-between bg-[url(/create-bg.svg)] bg-cover'>
      <div className='flex w-full justify-between gap-[2vw] px-16 pt-16'>
        <div className='w-full rounded-[24px] bg-gray-50 px-20'></div>
        {step === 1 && <div className='h-4 w-full rounded-[24px] bg-gray-300'></div>}
        {step === 2 && <div className='h-4 w-full rounded-[24px] bg-gray-50'></div>}
      </div>
      <div className='flex max-h-[85vh] w-full justify-center px-16'>
        {step === 1 && (
          <form
            className='bg-white-bg rounded-12 flex h-full min-h-[50vh] flex-col justify-start px-24'
            id='Create-event-form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className='text-medium-24 w-full pt-[10vh] text-center font-semibold'>What is your event called?</h2>
            <input
              {...register('eventName')}
              className='border-gray-300focus:border-blue-500 px[vw] mt-[5vh] h-[5vh] rounded-lg border-b-2 px-4 py-2 shadow-md focus:outline-none'
              placeholder=' Event name'
              type='text'
            />
            {errors.eventName && <p className='text-sm text-red-500'>{errors.eventName.message}</p>}
          </form>
        )}
        {step === 2 && (
          <div className='bg-white-bg rounded-12 mx-[2vw] my-[8vh] flex max-h-full min-h-[50vh] w-full flex-col items-center justify-between text-center'>
            <div className='flex min-h-[30vh] w-full flex-col items-center justify-between overflow-hidden'>
              <h2 className='text-medium w-full pt-[3vh] text-[6vw] font-semibold'>
                {eventName} <br />
                is created!
              </h2>
              <p className='text-medium font-semibol h-full w-full text-wrap px-[12vw] pt-[2vh] text-[4vw]'>
                Click on your new event to manage and customize your event invitation.
              </p>
            </div>
            <Image
              alt={'sommhai-logo'}
              className='mb-12 w-[400px] overflow-hidden'
              height='200'
              src={'/create-finsih.png'}
              width='200'
            />
          </div>
        )}
      </div>
      <div className='pb-16'>
        {step === 1 && (
          <button
            className='rounded-24 border-orange-2 bg-white-pure text-medium-24 text-orange-2 h-[7vh] w-[80vw] border-[3px]'
            form='Create-event-form'
            type='submit'
          >
            <span className='relative top-[3px]'>Confirm</span>
          </button>
        )}
        {step === 2 && (
          <button
            className='rounded-24 border-orange-2 bg-white-pure text-medium-24 text-orange-2 h-[7vh] w-[80vw] border-[3px]'
            onClick={onReturn}
          >
            <span className='relative text-xl'>Return</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateEventForm;
