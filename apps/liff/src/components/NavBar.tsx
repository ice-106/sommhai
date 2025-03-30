import { AiFillHome } from 'react-icons/ai';

function Navbar() {
  return (
    <div className='relative h-16 w-screen'>
      <div className='left-0 top-0 inline-flex h-16 w-full items-start justify-between overflow-hidden bg-zinc-300'>
        <div className='flex-coli h-full items-center justify-center rounded-tl rounded-tr bg-red-300 px-3 py-1 outline outline-1 outline-offset-[-1px] outline-zinc-400'>
          <div className=''>
            <AiFillHome />
          </div>
          <p className='text-center'>Home</p>
        </div>
        <div className='inline-flex items-center justify-center self-stretch rounded-tl rounded-tr px-3 py-1 outline outline-1 outline-offset-[-1px] outline-zinc-400'>
          <div></div>
        </div>
        <div className='inline-flex items-center justify-center self-stretch rounded-tl rounded-tr px-3 py-1 outline outline-1 outline-offset-[-1px] outline-zinc-400'>
          <div></div>
        </div>
        <div className='inline-flex items-center justify-center self-stretch rounded-tl rounded-tr px-3 py-1 outline outline-1 outline-offset-[-1px] outline-zinc-400'>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
