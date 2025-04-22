// import HeaderBurgur from '@/components/common/HeaderBurgur';

// function Profile() {
//   return (
//     <div className='flex h-screen w-screen flex-col'>
//       <div className='bg-orange-4 relative h-72 w-full'>
//         <HeaderBurgur name='Profile' />
//       </div>
//       <div className='flex h-full w-full items-center justify-center'>
//         <div className='relative inline-flex flex-col items-center justify-start gap-2.5 px-6 py-3'>
//           <div className='bg-black-pure absolute left-0 top-0 h-12 w-80 rounded-3xl' />
//           <div className="text-Color-black-pure flex-1 justify-center font-['Poppins'] text-lg font-medium leading-relaxed">
//             Line Name: Organizer A
//           </div>
//           <div className='bg-black-pure absolute left-0 top-0 h-12 w-80 rounded-3xl' />
//           <div className="text-Color-black-pure flex-1 justify-center font-['Poppins'] text-lg font-medium leading-relaxed">
//             Mobile Number: XXX-XXX-XXXX
//           </div>
//           <div className='bg-black-pure absolute left-0 top-0 h-12 w-80 rounded-3xl' />
//           <div className="text-Color-black-pure flex-1 justify-center font-['Poppins'] text-lg font-medium leading-relaxed">
//             Email: email@gmail.com
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

'use client';
import { User } from 'lucide-react';
import React from 'react';

import HeaderBurgur from '@/components/common/HeaderBurgur';

function Profile() {
  return (
    <div className='bg-orange-4 flex max-h-screen w-screen flex-col'>
      <HeaderBurgur name='Profile' />
      {/* Yellow header section with wave and profile image */}
      <div className='bg-orange-4 relative flex flex-col items-center justify-start'>
        {/* Profile image positioned over the curve */}
        {/* Curved white section at bottom of yellow area */}
        <div className='bg-white-bg absolute mt-[8vh] h-[80vh] w-[150vw] rounded-full'></div>
        <div className='bg-grey-light absolute mt-[2vh] flex h-[20vw] w-[20vw] items-center justify-center rounded-full'>
          <User className='text-black-pure h-[20vw]' />
        </div>
      </div>

      {/* Profile information section */}
      <div className='flex w-full flex-col items-center justify-start px-6 py-6 pt-[100px]'>
        {/* Line Name */}
        <div className='relative mb-6 w-full max-w-xs'>
          <div className='bg-white-pure w-full rounded-3xl p-5 shadow-sm'>
            <p className='text-black-pure text-lg font-medium'>
              Line Name: <span className='font-bold'>Organizer A</span>
            </p>
          </div>
        </div>

        {/* Mobile Number */}
        <div className='relative mb-6 w-full max-w-xs'>
          <div className='bg-white-pure w-full rounded-3xl p-5 shadow-sm'>
            <p className='text-black-pure text-lg font-medium'>
              Mobile Number: <span className='font-bold'>XXX-XXX-XXXX</span>
            </p>
          </div>
        </div>

        {/* Email */}
        <div className='relative mb-6 w-full max-w-xs'>
          <div className='bg-white-pure w-full rounded-3xl p-5 shadow-sm'>
            <p className='text-black-pure text-lg font-medium'>
              Email: <span className='font-bold'>email@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
