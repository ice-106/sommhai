import { IoAdd } from 'react-icons/io5';

function AddQuestionbox() {
  return (
    <div className='border-orange-3 bg-orange-6 rounded-24 mx-auto mt-8 flex h-[6vh] w-full items-center justify-center border-2 text-gray-600'>
      <IoAdd size='24px' />
      <h2 className='px-4 text-xl font-medium'>Add More Question</h2>
    </div>
  );
}

export default AddQuestionbox;
