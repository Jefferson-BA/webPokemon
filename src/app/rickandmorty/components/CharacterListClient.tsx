'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/types/rickandmorty';

interface Props {
  initialCharacters: Character[];
}

export default function CharacterListClient({ initialCharacters }: Props) {
  // Estados para los filtros solicitados
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si todos los filtros están vacíos, regresar a la lista estática inicial
    if (!name && !status && !type && !gender) {
      setCharacters(initialCharacters);
      return;
    }

    const fetchFilteredCharacters = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (name) query.append('name', name);
        if (status) query.append('status', status);
        if (type) query.append('type', type);
        if (gender) query.append('gender', gender);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setCharacters(data.results);
        } else {
          setCharacters([]); // No se encontraron coincidencias
        }
      } catch (error) {
        console.error("Error filtrando personajes:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce simple o ejecución inmediata al cambiar filtros
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredCharacters();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [name, status, type, gender, initialCharacters]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight text-white">
        Dimensiones <span className="text-green-400">Rick and Morty</span>
      </h1>

      {/* Inputs de Búsqueda y Filtros CSR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-green-400 mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Ej. Rick, Morty..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-green-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-green-400 mb-2">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-green-500 transition"
          >
            <option value="">Todos</option>
            <option value="alive">Vivo (Alive)</option>
            <option value="dead">Muerto (Dead)</option>
            <option value="unknown">Desconocido (Unknown)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-green-400 mb-2">Tipo</label>
          <input
            type="text"
            placeholder="Ej. Parasite, Clone..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-green-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-green-400 mb-2">Género</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-green-500 transition"
          >
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin Género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
      </div>

      {/* Grid de Personajes */}
      {loading ? (
        <div className="text-center py-20 text-green-400 font-mono text-xl animate-pulse">
          Escaneando multiverso...
        </div>
      ) : characters.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          No se encontraron especímenes en esta línea temporal.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link key={char.id} href={`/rickandmorty/${char.id}`} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-green-500/50 transition duration-300 shadow-lg flex flex-col">
              <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  sizes="(max-w-7xl) 25vw"
                  priority={false} // Lazy Loading activo bajo demanda
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold group-hover:text-green-400 transition text-white line-clamp-1">
                    {char.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`w-2 h-2 rounded-full ${char.status === 'Alive' ? 'bg-green-500' : char.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'}`} />
                    <span className="text-xs text-gray-400 font-medium">{char.status} - {char.species}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
                  <span>Última ubicación:</span>
                  <span className="text-slate-300 font-medium line-clamp-1 max-w-[150px] text-right">{char.location.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}