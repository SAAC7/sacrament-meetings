export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20 print:hidden">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );
}