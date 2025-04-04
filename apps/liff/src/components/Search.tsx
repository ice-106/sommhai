'use client';
import { Input } from '@sommhai/ui/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function Search({ placeholder }: { placeholder: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='flex flex-1'>
      <Input
        defaultValue={searchParams.get('query')?.toString()}
        placeholder='Search...'
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
export default Search;
