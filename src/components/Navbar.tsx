import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  categoriaActiva: string;
  onCategoria: (cat: string) => void;
  sobreHero: boolean;
}

export default function Navbar({ categoriaActiva, onCategoria, sobreHero }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categorias, setCategorias] = useState<string[]>(['Todo']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    supabase.from('categorias').select('nombre').order('nombre')
      .then(({ data }) => {
        if (data && data.length > 0)
          setCategorias(['Todo', ...data.map(c => c.nombre)]);
      });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !sobreHero ? 'bg-[#FAF8F5]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="select-none flex flex-col items-start leading-none">
            <span className={`font-script text-4xl transition-colors duration-300 ${scrolled || !sobreHero ? 'text-[#2D2420]' : 'text-white'}`}>
              Shulalá
            </span>
            <span className={`text-[0.55rem] tracking-[0.35em] uppercase transition-colors duration-300 -mt-1 ${scrolled || !sobreHero ? 'text-[#C4A49A]' : 'text-white/70'}`}>
              Boutique
            </span>
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
                      ? 'text-[#7D9B7E] border-b border-[#C4A49A]'
                      : 'text-stone-400 hover:text-[#2D2420]'
                    : categoriaActiva === cat
                      ? 'text-white border-b border-white/70'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

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

        {/* Menú móvil desplegable */}
        {menuAbierto && (
          <div className="md:hidden border-t border-stone-100 py-4 flex flex-col gap-4 bg-[#F8F4EF]">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => { onCategoria(cat); setMenuAbierto(false); }}
                className={`text-left text-xs tracking-widest uppercase py-1 transition-colors ${
                  categoriaActiva === cat ? 'text-[#7D9B7E] font-medium' : 'text-stone-400'
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
