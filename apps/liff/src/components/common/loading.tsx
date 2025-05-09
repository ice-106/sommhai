export default function Loading() {
  return (
    <div className='flex h-full w-full items-center justify-center bg-gray-50 pt-4'>
      <div className='h-full w-full text-center'>
        <div className='relative mx-auto mb-6 h-[50vw] w-[50vw]'>
          {/* Spinner circle */}
          <div className='border-orange-6 absolute left-0 top-0 h-full w-full rounded-full border-[20px]'></div>
          <div className='border-t-orange-1 absolute left-0 top-0 h-full w-full animate-spin rounded-full border-4 border-transparent'></div>
        </div>
        <h2 className='text-xl font-medium text-gray-700'>sommhai is loading...</h2>
      </div>
    </div>
  );
}
