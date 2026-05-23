'use client'; // Los componentes de error deben ser componentes de cliente

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí podrías enviar el error a un servicio de reporte (ej. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <h2 className="text-4xl font-bold text-red-400 mb-4 drop-shadow-md">
        ¡Ups! Ocurrió un error
      </h2>
      <p className="text-white text-lg mb-8 bg-black/40 px-6 py-2 rounded-lg">
        {error.message || "No pudimos cargar la información del Pokémon."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/pokemon"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg"
        >
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}