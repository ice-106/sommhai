'use client';

import { cloneElement, isValidElement, ReactElement, useEffect, useState } from 'react';

export function SlidePopup({ page, onClose }: { page: number; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [slideClass, setSlideClass] = useState('translate-x-0');

  const handleClose = () => {
    setSlideClass('translate-x-full'); // start slide-out animation
    setTimeout(() => {
      setIsVisible(false); // remove after animation
      onClose(); // call the close function from parent
    }, 300); // duration must match Tailwind transition
  };

  // Reset animation state when opening
  useEffect(() => {
    if (page !== 0) {
      setIsVisible(true);
      setSlideClass('translate-x-0');
    }
  }, [page]);

  if (!isVisible) return null;

  return (
    <div className='z-50 flex items-center justify-center bg-black/30' onClick={handleClose}>
      <div
        className={`bg-white-pure flex min-h-[236px] w-[333px] transform flex-col items-center gap-24 overflow-y-auto rounded-[25px] p-[16px] transition-transform duration-300 ${slideClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <p>MyEvent</p>
        <p>31 / 3 / 2025 , 20:00</p>
        <p>1/1 rama 1 road ....</p>
        <p>Some description. Please come</p>
      </div>
    </div>
  );
}

interface SlidePopupYProp {
  children: React.ReactNode;
  onClose: () => void;
}

export function SlidePopupY({ children, onClose }: SlidePopupYProp) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsVisible(true), 10);
    //document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timeOut);
      //document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const renderedChildren = isValidElement(children)
    ? cloneElement(children as ReactElement, { onClose: handleClose }) // inject prop
    : children;

  return (
    <div className='fixed inset-0 z-50 flex h-full flex-col justify-end'>
      <div className='bg-black-pure absolute inset-0 z-40 bg-opacity-30' onClick={handleClose} />
      <div
        className={`bg-white-pure z-50 max-h-[90%] w-full transform overflow-y-auto rounded-t-2xl transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {renderedChildren}
      </div>
    </div>
  );
}

interface SlidePopupXProp {
  children: React.ReactNode;
  onClose: () => void;
}

export function SlidePopUpX({ children, onClose }: SlidePopupXProp) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeOut);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const renderedChildren = isValidElement(children)
    ? cloneElement(children as ReactElement, { onClose: handleClose }) // inject prop
    : children;

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full flex-col justify-center'>
      <div className='bg-black-pure absolute inset-0 z-40 bg-opacity-30' onClick={handleClose} />
      <div
        className={`z-50 flex w-full transform justify-center overflow-y-auto transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {renderedChildren}
      </div>
    </div>
  );
}

export default SlidePopup;
