import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 print:hidden">Sacramental Planner</h1>
      
      <NavLinks />
      
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}