import Link from 'next/link';
import { IoWarningOutline } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br to-purple-900 flex flex-col items-center justify-center text-center p-8">
      <IoWarningOutline size={120} className="text-yellow-400 mb-6 drop-shadow-lg" />
      <h2 className="text-7xl font-black text-white mb-4 drop-shadow-lg">404</h2>
      <p className="text-3xl text-gray-200 mb-4 font-semibold">
        ¡Pokémon salvaje no encontrado!
      </p>
      <p className="text-gray-400 mb-10 text-lg max-w-md">
        Parece que te has perdido en la hierba alta. La ruta que buscas no existe en nuestra Pokédex.
      </p>
      <Link
        href="/pokemon"
        className="bg-black hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition shadow-xl border border-purple-500/30"
      >
        ← Regresar a un lugar seguro
      </Link>
    </div>
  );
}