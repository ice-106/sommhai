'use client';
import { Input } from '@sommhai/ui/components/ui/input';
import { Suspense } from 'react';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchContent({ placeholder, onSearch }: { placeholder: string; onSearch: (query: string) => void }) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className='bg-white-pure flex w-full flex-1 items-center rounded-lg px-3 py-2'>
      <FiSearch className='mr-2 text-gray-400' />
      <Input
        className='w-full border-none placeholder-gray-400 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export function SearchContainer({ placeholder, onSearch }: { placeholder: string; onSearch: (query: string) => void }) {
  // Using dynamic import with React.lazy for the component using useSearchParams
  const Search = React.lazy(() => import('@/components/attendee/Search'));

  return (
    <Suspense fallback={<div className='h-10 flex-1 animate-pulse rounded bg-gray-100'>Loading...</div>}>
      <SearchContent placeholder={`⌕ ${placeholder}`} onSearch={onSearch} />
    </Suspense>
  );
}

export default SearchContainer;
