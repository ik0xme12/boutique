import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { productos as productosMock } from './data/productos';
import type { Producto } from './data/productos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

function Tienda() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todo');
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());
  const [productoModal, setProductoModal] = useState<Producto | null>(null);
  const [productos, setProductos] = useState<Producto[]>(productosMock);

  useEffect(() => {
    supabase.from('productos').select('*').order('id', { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) setProductos(data as Producto[]); });
  }, []);

  const productosFiltrados = categoriaActiva === 'Todo'
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

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

      <footer className="border-t border-stone-100 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg tracking-widest text-stone-800">BOUTIQUE</span>
          <p className="text-xs text-stone-400 tracking-wide">© 2025 Boutique. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {['Instagram', 'Pinterest', 'TikTok'].map(red => (
              <a key={red} href="#" className="text-xs text-stone-400 hover:text-stone-700 tracking-widest uppercase transition-colors">{red}</a>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Tienda />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
