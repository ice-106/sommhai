'use client';
import { Input } from '@sommhai/ui/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

function Search({ placeholder }: { placeholder: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent placeholder={placeholder} />
    </Suspense>
  );
}

function SearchContent({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: any) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='bg-white-pure flex flex-1'>
      <Input
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
export default Search;

export function SearchContainer({ placeholder }: { placeholder: string }) {
  // Using dynamic import with React.lazy for the component using useSearchParams
  const Search = React.lazy(() => import('@/components/organizer/Search'));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search placeholder={`⌕ ${placeholder}`} />
    </Suspense>
  );
}
