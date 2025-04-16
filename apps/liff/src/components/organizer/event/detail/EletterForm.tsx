'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LocationPicker from '@/components/organizer/event/detail/LocationPicker';

const ELetterformSchema = z.object({
  Title: z.string().min(1, 'Title is required'),
  Description: z.string(),
  DateTime: z.string().min(1, 'Date and Time is required'),
  Location: z.string().min(1, 'location is required'),
});

type EletterFormData = z.infer<typeof ELetterformSchema>;

function EletterForm({ onClose }: { onClose?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EletterFormData>({
    resolver: zodResolver(ELetterformSchema),
  });

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleLocationChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div className='bg-white-bg min-h-full w-full p-24'>
      <form className='flex flex-col gap-24'>
        <div>
          <h1 className='font-inter text-bold-20'>Title</h1>
          <input
            {...register('Title')}
            className='w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none'
            defaultValue={'badminton'}
            placeholder='title'
            type='text'
          />
        </div>
        <div>
          <h1 className='font-inter text-bold-20'>Description</h1>
          <input
            {...register('Description')}
            className='w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none'
            defaultValue={'Badminton Competition with the ICE department'}
            placeholder='Description'
            type='text'
          />
        </div>
        <div>
          <h1 className='font-inter text-bold-20'>Date and Time</h1>
          <input
            {...register('DateTime')}
            className='w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none'
            placeholder='title'
            type='datetime-local'
          />
        </div>
        <div>
          <h1 className='font-inter text-bold-20'>Location</h1>
          <LocationPicker onLocationChange={handleLocationChange} />
          <p className='text-medium-20'>Latitude: {latitude}</p>
          <p className='text-medium-20'>Longitude: {longitude}</p>
          <input name='latitude' type='hidden' value={latitude || ''} />
          <input name='longitude' type='hidden' value={longitude || ''} />
        </div>
      </form>
      <button className='rounded-24 bg-orange-3 text-medium-20 mt-24 h-[56px] w-full max-w-[345px]' onClick={onClose}>
        Confirm
      </button>
    </div>
  );
}

export default EletterForm;
