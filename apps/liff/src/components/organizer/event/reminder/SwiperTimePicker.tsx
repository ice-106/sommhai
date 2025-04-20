import 'swiper/css';

import React, { useEffect, useState } from 'react';
import { Keyboard, Mousewheel, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperTimePickerProps {
  onTimeChange: (time: { hours: number; minutes: number }) => void;
}

const SwiperTimePicker = ({ onTimeChange }: SwiperTimePickerProps) => {
  const initialHour = new Date().getHours();
  const initialMinute = new Date().getMinutes();
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);

  // Generate hours (1-12, repeated for infinite scroll effect)
  const hours = Array.from({ length: 96 }, (_, i) => i % 24);
  // Generate minutes (00-59, repeated for infinite scroll effect)
  const minutes = Array.from({ length: 240 }, (_, i) => i % 60);

  useEffect(() => {
    onTimeChange({
      hours: selectedHour,
      minutes: selectedMinute,
    });
  }, [selectedHour, selectedMinute]);

  // Swiper common params
  const swiperParams = {
    modules: [Virtual, Mousewheel, Keyboard],
    direction: 'vertical' as const,
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 0,
    mousewheel: true,
    virtual: true,
    speed: 300,
    touchRatio: 1.5,
    freeMode: false,
    resistance: true,
    resistanceRatio: 0.85,
    // watchSlidesProgress: true,
    // loopAdditionalSlides: 10,
  };

  return (
    <div className='time-picker-container'>
      <div className='relative mx-auto h-[200px] w-full max-w-[300px] overflow-hidden rounded-2xl bg-gray-50 font-[Poppins,system-ui,sans-serif] shadow-lg'>
        <div className='flex h-full w-full flex-row items-center justify-center px-3'>
          {/* Hours Column */}
          <div className='h-full w-full'>
            <Swiper
              allowTouchMove={true}
              centeredSlides={true}
              className='h-full'
              direction='vertical'
              freeMode={false}
              initialSlide={hours.findIndex((h) => h === selectedHour) + 48}
              keyboard={{
                enabled: true,
                onlyInViewport: false,
              }}
              loopAdditionalSlides={10}
              modules={[Virtual, Mousewheel, Keyboard]}
              mousewheel={true}
              resistance={true}
              resistanceRatio={0.85}
              slidesPerView={5}
              spaceBetween={0}
              speed={300}
              touchRatio={1.5}
              virtual={true}
              watchSlidesProgress={true}
              onSwiper={(swiper) => {
                const realIndex = swiper.realIndex % 12;
                const hour = (realIndex % 12) + 1;
                setSelectedHour(hour);
              }}
            >
              {hours.map((hour, index) => (
                <SwiperSlide className='h-10' key={`hour-${index}`} virtualIndex={index}>
                  <div className='time-item flex h-10 items-center justify-center text-2xl font-semibold transition-all'>
                    {hour}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='mx-1 flex h-full items-center justify-center px-2 pb-1 text-2xl font-bold text-gray-600'>
            :
          </div>

          <div className='h-full w-full border-2'>
            <Swiper
              allowTouchMove={true}
              centeredSlides={true}
              className='h-full'
              direction='vertical'
              freeMode={false}
              initialSlide={minutes.findIndex((m) => m === selectedMinute) + 120} // Center initial minute
              keyboard={{
                enabled: true,
                onlyInViewport: false,
              }}
              loopAdditionalSlides={10}
              modules={[Virtual, Mousewheel, Keyboard]}
              mousewheel={true}
              resistance={true}
              resistanceRatio={0.85}
              slidesPerView={5}
              spaceBetween={0}
              speed={300}
              touchRatio={1.5}
              virtual={true}
              watchSlidesProgress={true}
              onSlideChange={(swiper) => {
                const minute = swiper.realIndex % 60;
                setSelectedMinute(minute);
              }}
            >
              {minutes.map((minute, index) => (
                <SwiperSlide className='h-10' key={`minute-${index}`} virtualIndex={index}>
                  <div className='time-item flex h-10 items-center justify-center text-2xl font-semibold transition-all'>
                    {String(minute).padStart(2, '0')}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className='pointer-events-none absolute inset-0 flex flex-col justify-center'>
          <div className='mx-2 mb-10 h-px bg-black/10'></div>
          <div className='mx-2 mt-10 h-px bg-black/10'></div>
        </div>
        <div className='bg-orange-3 border-orange-3 pointer-events-none absolute left-0 right-0 top-1/2 h-[40px] -translate-y-1/2 transform border-y bg-opacity-20' />
      </div>

      <style jsx>{`
        :global(.swiper-slide-active .time-item) {
          //   border: 0.5px solid;
          //   background-color: #d9d9d9;
          font-size: 28px;
          font-weight: 600;
          color: #f48200;
        }

        :global(.swiper-slide-prev.swiper-slide-prev .time-item),
        :global(.swiper-slide-next.swiper-slide-next .time-item) {
          font-size: 18px;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default SwiperTimePicker;
