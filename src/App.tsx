import { useState } from 'react';
import { productos as todosLosProductos } from './data/productos';
import type { Producto } from './data/productos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todo');
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());
  const [productoModal, setProductoModal] = useState<Producto | null>(null);

  const productosFiltrados = categoriaActiva === 'Todo'
    ? todosLosProductos
    : todosLosProductos.filter(p => p.categoria === categoriaActiva);

  const toggleFavorito = (id: number) => {
    setFavoritos(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar
        categoriaActiva={categoriaActiva}
        onCategoria={setCategoriaActiva}
        favoritosCount={favoritos.size}
        sobreHero={categoriaActiva === 'Todo'}
      />

      {categoriaActiva === 'Todo' && <Hero />}

      <ProductGrid
        productos={productosFiltrados}
        favoritos={favoritos}
        onVerDetalle={setProductoModal}
        onToggleFavorito={toggleFavorito}
      />

      {/* Footer minimalista */}
      <footer className="border-t border-stone-100 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg tracking-widest text-stone-800">LUNA</span>
          <p className="text-xs text-stone-400 tracking-wide">© 2025 Luna Boutique. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {['Instagram', 'Pinterest', 'TikTok'].map(red => (
              <a key={red} href="#" className="text-xs text-stone-400 hover:text-stone-700 tracking-widest uppercase transition-colors">
                {red}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ProductModal
        producto={productoModal}
        onCerrar={() => setProductoModal(null)}
        esFavorito={productoModal ? favoritos.has(productoModal.id) : false}
        onToggleFavorito={toggleFavorito}
      />
    </div>
  );
}
