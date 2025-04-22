import React from 'react';

function Message({ message }: { message: string }) {
  return (
    <div
      className={`bg-orange-3 text-bold-24 flex min-h-[188px] w-[302px] flex-col items-center justify-center gap-24 overflow-y-auto rounded-[25px] p-[16px]`}
      onClick={(e) => e.stopPropagation()}
    >
      <p>{message}</p>
    </div>
  );
}

export default Message;
