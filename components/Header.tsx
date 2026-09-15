import React from 'react';

export default function Header() {
  // Obtenemos la fecha actual formateada
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <header className="bg-blue-800 text-white p-4 shadow-md print:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Sacrament Meetings Planner</h1>
        <span className="text-sm hidden sm:block">{today}</span>
      </div>
    </header>
  );
}