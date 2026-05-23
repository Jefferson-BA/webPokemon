import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty Portal - Next.js",
  description: "Explora las dimensiones de Rick and Morty",
};

export default function RickAndMortyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-green-500 selection:text-black">
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-green-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/rickandmorty" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 hover:opacity-80 transition tracking-wider">
            RAM PORTAL
          </Link>
          <div className="flex gap-4">
            <Link href="/pokemon" className="text-sm text-gray-400 hover:text-white transition">
              Ir al Pokédex
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}