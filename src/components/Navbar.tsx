import { useState, useEffect } from 'react';
import { categorias } from '../data/productos';

interface NavbarProps {
  categoriaActiva: string;
  onCategoria: (cat: string) => void;
  favoritosCount: number;
  sobreHero: boolean;
}

export default function Navbar({ categoriaActiva, onCategoria, favoritosCount, sobreHero }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !sobreHero ? 'bg-[#FAF8F5]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Barra principal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className={`font-serif text-xl tracking-widest select-none transition-colors duration-300 ${scrolled || !sobreHero ? 'text-stone-800' : 'text-white'}`}>
            LUNA
          </a>

          {/* Categorías desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoria(cat)}
                className={`text-xs tracking-widest uppercase transition-all duration-200 pb-0.5 ${
                  scrolled || !sobreHero
                    ? categoriaActiva === cat
                      ? 'text-stone-800 border-b border-stone-800'
                      : 'text-stone-400 hover:text-stone-700'
                    : categoriaActiva === cat
                      ? 'text-white border-b border-white'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <button className={`relative transition-colors duration-300 ${scrolled || !sobreHero ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {favoritosCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-stone-800 text-white text-[9px] flex items-center justify-center font-medium">
                  {favoritosCount}
                </span>
              )}
            </button>

            {/* Menú móvil */}
            <button
              className={`md:hidden transition-colors duration-300 ${scrolled || !sobreHero ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'}`}
              onClick={() => setMenuAbierto(v => !v)}
            >
              {menuAbierto ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuAbierto && (
          <div className="md:hidden border-t border-stone-100 py-4 flex flex-col gap-4 bg-[#FAF8F5]">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => { onCategoria(cat); setMenuAbierto(false); }}
                className={`text-left text-xs tracking-widest uppercase py-1 transition-colors ${
                  categoriaActiva === cat ? 'text-stone-800 font-medium' : 'text-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
