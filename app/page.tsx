import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Meeting Planner</h1>
        <p className="text-xl text-gray-600">
          Organize, review, and print sacramental programs for your neighborhood.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-xl mb-10 relative h-64 sm:h-96 w-full bg-gray-200">
        {/* Asegúrate de poner una imagen llamada chapel.jpg en la carpeta public/ */}
        <Image 
          src="/chapel.jpg" 
          alt="Chapel of the Church" 
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="text-center">
        <Link 
          href="/meetings" 
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-md"
        >
          Enter the Meeting Planner
        </Link>
      </div>
    </div>
  );
}