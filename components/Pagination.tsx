'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Pagination Navigation" className="flex justify-between items-center mt-6">
      <button
        disabled={currentPage <= 1}
        onClick={() => replace(createPageURL(currentPage - 1))}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm font-medium">Page {currentPage}</span>
      <button
        onClick={() => replace(createPageURL(currentPage + 1))}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
      >
        Next
      </button>
    </nav>
  );
}