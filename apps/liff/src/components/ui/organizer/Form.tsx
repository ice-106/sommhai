'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createEventSchema = z.object({
  eventName: z.string().min(1, 'Name is required'),
});

type FormData = z.infer<typeof createEventSchema>;

export function CreateEventForm() {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = (data: FormData) => {
    setEventName(data.eventName);
    setStep(2);
  };

  const onReturn = () => {
    // Move this to server action ASAP!!!!
    redirect('/organizer');
  };

  return (
    <div className='bg-orange-4 flex h-screen w-screen flex-col items-center justify-between bg-[url(/vector-BG.svg)] py-[24px]'>
      <div className='flex gap-[4px]'>
        <div className='h-[8px] w-[175px] rounded-[24px] bg-gray-50'></div>
        {step === 1 && <div className='h-[8px] w-[175px] rounded-[24px] bg-gray-300'></div>}
        {step === 2 && <div className='h-[8px] w-[175px] rounded-[24px] bg-gray-50'></div>}
      </div>
      <div>
        {step === 1 && (
          <form
            className='bg-white-bg rounded-12 flex h-[155px] w-[370px] flex-col justify-between px-[24px] py-[24px]'
            id='Create-event-form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className='text-medium-24 text-center font-semibold'>What is your event called?</h2>
            <input
              {...register('eventName')}
              className='border-gray-300focus:border-blue-500 border-b-2 focus:outline-none'
              placeholder='Event name'
              type='text'
            />
            {errors.eventName && <p className='text-sm text-red-500'>{errors.eventName.message}</p>}
          </form>
        )}
        {step === 2 && (
          <div className='bg-white-bg rounded-12 flex h-[532px] w-[328px] flex-col items-center justify-between px-[24px] py-[24px] text-center'>
            <div className='flex h-[180px] max-w-[100%] flex-col justify-between overflow-hidden'>
              <h2 className='text-medium-20 font-semibold'>
                {eventName} <br />
                is created!
              </h2>
              <p className='text-medium-20 font-semibol'>
                Click on your new event to manage and customize your event invitation.
              </p>
            </div>
            <Image alt={'sommhai-logo'} height='200' src={'/logo-sommhai.svg'} width='200' />
          </div>
        )}
      </div>
      <div>
        {step === 1 && (
          <button
            className='rounded-24 border-orange-2 bg-white-pure text-medium-24 text-orange-2 h-[55px] w-[345px] border-[3px]'
            form='Create-event-form'
            type='submit'
          >
            <span className='relative top-[-3px]'>Confirm</span>
          </button>
        )}
        {step === 2 && (
          <button
            className='rounded-24 border-orange-2 bg-white-pure text-medium-24 text-orange-2 h-[55px] w-[345px] border-[3px]'
            onClick={onReturn}
          >
            <span className='relative top-[-3px]'>Return</span>
          </button>
        )}
      </div>
    </div>
  );
}
