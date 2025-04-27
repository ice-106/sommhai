import { AlertTriangle } from 'lucide-react';
import React from 'react';

const WarningModal = ({ setPage }: { setPage: (page: number) => void }) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='bg-white-bg mx-32 flex w-full flex-col rounded-xl border border-gray-200 p-32 shadow-lg'>
        <div className='flex flex-col items-center'>
          <div className='mb-2 flex items-center text-2xl font-bold text-yellow-500'>
            Warning <AlertTriangle className='ml-2' size={24} />
          </div>
          <p className='mb-6 text-center text-sm text-gray-600'>Your changes won't be saved!</p>
          <div className='flex w-full gap-4 pt-20'>
            <button className='bg-orange-6 flex-1 rounded-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-yellow-200'>
              Confirm
            </button>
            <button
              className='bg-orange-3 flex-1 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600'
              onClick={() => {
                setPage(0);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
