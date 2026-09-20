'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 mb-4">
      <label htmlFor="search" className="sr-only">Search Meetings</label>
      <input
        id="search"
        aria-label="Search meetings by speaker, presiding, conducting, or type"
        className="peer block w-full rounded-md border border-gray-300 py-2 pl-3 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500"
        placeholder="Search by speaker, presiding, conducting, or meeting type..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}