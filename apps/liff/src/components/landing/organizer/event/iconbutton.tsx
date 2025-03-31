import { MdOutlineEventNote } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';

export default function Iconbutton() {
  return (
    <div className='bg-white-bg rounded-24 flex h-[4.75rem] w-[20.375rem]'>
      <div className='mx-12 self-center'>
        <MdOutlineEventNote size={45} />
      </div>
      <div className='flex flex-col self-center'>
        <h1 className='text-[1.25rem] font-bold'>Event Detail</h1>
        <p className='text-[0.8rem]'>Details</p>
      </div>
      <div className='my-12 ml-auto px-12'>
        <MdNavigateNext size={25} />
      </div>
    </div>
  );
}
