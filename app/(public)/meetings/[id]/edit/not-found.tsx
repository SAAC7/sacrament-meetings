// app/(public)/meetings/[id]/edit/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white border rounded-lg text-center shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Meeting Not Found</h2>
      <p className="text-gray-600 mb-6">The sacrament meeting record you are looking for does not exist.</p>
      <Link
        href="/meetings"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
      >
        Return to Meetings
      </Link>
    </div>
  );
}