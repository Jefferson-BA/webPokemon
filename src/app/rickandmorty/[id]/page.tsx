import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Character, APIResponse } from '@/types/rickandmorty';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character | null> {
  const res = await fetch(`https://pokeapi.co/../https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 } // Revalida cada 10 días (ISR)
  });
  
  if (!res.ok) return null;
  return res.json();
}

// Genera parámetros estáticos para producción (SSG por Id) para los primeros 20 registros
export async function generateStaticParams() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data: APIResponse = await res.json();
  
  return data.results.map((char) => ({
    id: char.id.toString(),
  }));
}

// Metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const char = await getCharacter(id);
  
  return {
    title: char ? `${char.name} - Expediente Multiversal` : 'Sujeto No Identificado',
    description: char ? `Análisis completo del espécimen ${char.name}` : 'Detalles dimensionales',
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  const char = await getCharacter(id);

  if (!char) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Banner de Cabecera */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-8 border-b border-slate-800 text-center">
          <span className="text-xs font-mono text-green-400 border border-green-500/30 px-3 py-1 rounded-full uppercase tracking-widest bg-green-500/5">
            ID Código #{char.id}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white capitalize tracking-wide mt-4 drop-shadow">
            {char.name}
          </h1>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            
            {/* Contenedor Imagen */}
            <div className="w-64 h-64 relative bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-800 shadow-xl flex-shrink-0">
              <Image
                fill
                src={char.image}
                alt={char.name}
                sizes="256px"
                className="object-cover"
              />
            </div>

            {/* Ficha de Información Completa Mapeada */}
            <div className="flex-1 w-full space-y-6 font-mono text-sm">
              <h3 className="text-lg font-bold text-green-400 font-sans border-b border-slate-800 pb-2">
                DATOS BIOMÉTRICOS Y LOCALIZACIÓN
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  <span className="text-gray-500 block text-xs uppercase mb-1">Estado Vital</span>
                  <span className={`font-semibold ${char.status === 'Alive' ? 'text-green-400' : char.status === 'Dead' ? 'text-red-400' : 'text-gray-400'}`}>
                    {char.status}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  <span className="text-gray-500 block text-xs uppercase mb-1">Especie</span>
                  <span className="text-slate-200 font-semibold">{char.species}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  <span className="text-gray-500 block text-xs uppercase mb-1">Subtipo / Variación</span>
                  <span className="text-slate-200 font-semibold">{char.type || 'N/A (Estándar)'}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  <span className="text-gray-500 block text-xs uppercase mb-1">Género</span>
                  <span className="text-slate-200 font-semibold">{char.gender}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  <span className="text-gray-500 block text-xs uppercase mb-1">Origen Planetario</span>
                  <span className="text-slate-300 font-semibold line-clamp-1">{char.origin.name}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  <span className="text-gray-500 block text-xs uppercase mb-1">Ubicación Actual</span>
                  <span className="text-slate-300 font-semibold line-clamp-1">{char.location.name}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-green-400 font-sans border-b border-slate-800 pt-2 pb-2">
                REGISTROS DE RADAR Y CRONOLOGÍA
              </h3>

              <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                <p><strong className="text-slate-400">Apariciones en Episodios:</strong> {char.episode.length} capítulos</p>
                <p><strong className="text-slate-400">Creado en Base de Datos:</strong> {new Date(char.created).toLocaleDateString('es-ES')}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Panel de Control Inferior */}
        <div className="p-6 bg-slate-950/80 border-t border-slate-800/60 flex justify-between items-center">
          <Link
            href="/rickandmorty"
            className="bg-slate-900 border border-slate-700 hover:border-green-500 hover:text-green-400 text-slate-300 font-bold py-2.5 px-6 rounded-lg transition text-sm"
          >
            ← Volver al Portal
          </Link>
        </div>

      </div>
    </div>
  );
}