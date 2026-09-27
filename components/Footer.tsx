export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-500 p-6 text-center mt-auto border-t print:hidden">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Sacrament Meeting Planner - WDD 430 - Saúl Abraham Arana Calderón - All rights reserved.
      </p>
    </footer>
  );
}