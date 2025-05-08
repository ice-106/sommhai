import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface DeleteModalProps {
  setPage: (page: number) => void;
  handleDelete: () => void;
}

function DeleteModal({ setPage, handleDelete }: DeleteModalProps) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='bg-white-bg mx-32 flex w-full flex-col rounded-xl border border-gray-200 p-32 shadow-lg'>
        <div className='flex flex-col items-center'>
          <div className='text-orange-2 mb-2 flex items-center text-2xl font-bold'>
            Warning <AlertTriangle className='ml-2' size={24} />
          </div>
          <p className='text-balance text-center text-sm text-gray-600'>Event is going to be ended!</p>
          <p className='mb-6 text-center text-sm text-gray-600'>Changes can't be made later.</p>
          <div className='flex w-full gap-4 pt-20'>
            <button
              className='bg-orange-3 over:bg-yellow-200 flex-1 rounded-full px-4 py-2 text-sm font-medium text-white'
              onClick={handleDelete}
            >
              Confirm
            </button>
            <button
              className='bg-orange-5 flex-1 rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-yellow-600'
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
}

export default DeleteModal;
