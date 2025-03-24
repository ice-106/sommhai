import { LoaderCircle } from 'lucide-react';

export default function Loader() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <LoaderCircle className='h-12 w-12 animate-spin text-blue-500' />
      <p className='mt-4 text-lg font-semibold'>Loading...</p>
    </div>
  );
}
