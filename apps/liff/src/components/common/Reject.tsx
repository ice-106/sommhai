import { AlertTriangle } from 'lucide-react';

interface AcceptModalProps {
  setPage: (page: number) => void;
  handleReject: () => void;
}

const RejectModal = ({ setPage, handleReject }: AcceptModalProps) => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='bg-white-bg mx-32 flex w-full flex-col rounded-xl border border-gray-200 p-32 shadow-lg'>
        <div className='flex flex-col items-center'>
          <div className='mb-2 flex items-center gap-1 text-2xl font-bold text-red-300'>
            Deny the Event <AlertTriangle className='ml-2' size={24} />
          </div>
          <p className='text-center text-sm text-gray-600'>You will be listed as </p>
          <p className='text-center text-sm text-gray-600'>not going to the Event!</p>
          <p className='mb-6 text-center text-sm text-gray-600'>Changes can't be made later.</p>
          <div className='flex w-full gap-4 pt-20'>
            <button
              className='bg-orange-3 over:bg-yellow-200 flex-1 rounded-full px-4 py-2 text-sm font-medium text-white'
              onClick={handleReject}
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
};

export default RejectModal;
