import React from 'react';

function EventTextForm() {
  return (
    <div
      className={`bg-white-pure flex min-h-[236px] w-[333px] flex-col items-center gap-24 overflow-y-auto rounded-[25px] p-[16px]`}
      onClick={(e) => e.stopPropagation()}
    >
      <p>MyEvent</p>
      <p>31 / 3 / 2025 , 20:00</p>
      <p>1/1 rama 1 road ....</p>
      <p>Some description. Please come</p>
    </div>
  );
}

export default EventTextForm;
