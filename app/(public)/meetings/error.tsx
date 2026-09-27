// app/(public)/meetings/error.tsx
'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-red-800 mb-2">Something went wrong!</h2>
      <p className="text-red-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}