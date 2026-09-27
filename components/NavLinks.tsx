"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: 'Current Sunday', href: '/meetings/current' },
  ];

  return (
    <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 bg-blue-50 p-4 rounded-lg mb-6 print:hidden">
      {links.map((link) => {
        // Lógica para saber si el link está activo
        const isActive = 
          pathname === link.href || 
          (link.href !== '/' && pathname?.startsWith(link.href));

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-blue-800 hover:bg-blue-200'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}