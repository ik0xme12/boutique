import { useState } from 'react';
import type { Producto } from '../data/productos';
import ProductCard from './ProductCard';

type Orden = 'destacados' | 'precio-asc' | 'precio-desc' | 'nuevo';

interface ProductGridProps {
  productos: Producto[];
  onVerDetalle: (p: Producto) => void;
}

export default function ProductGrid({ productos, onVerDetalle }: ProductGridProps) {
  const [orden, setOrden] = useState<Orden>('destacados');

  const ordenados = [...productos].sort((a, b) => {
    if (orden === 'precio-asc') return a.precio - b.precio;
    if (orden === 'precio-desc') return b.precio - a.precio;
    if (orden === 'nuevo') return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0);
    return 0;
  });

  return (
    <section id="coleccion" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
      {/* Header sección */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-2">Colección</p>
          <h2 className="font-serif text-2xl md:text-3xl text-stone-800 font-normal">
            {productos.length === 0 ? 'Sin resultados' : `${productos.length} piezas`}
          </h2>
        </div>

        {/* Ordenar */}
        {productos.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 hidden sm:inline">Ordenar:</span>
            <select
              value={orden}
              onChange={e => setOrden(e.target.value as Orden)}
              className="text-xs text-stone-600 border border-stone-200 bg-transparent px-3 py-2 focus:outline-none focus:border-stone-400 cursor-pointer"
            >
              <option value="destacados">Destacados</option>
              <option value="nuevo">Nuevos primero</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        )}
      </div>

      {/* Grid */}
      {ordenados.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-stone-400 text-sm tracking-wide">No hay productos en esta categoría.</p>
          <p className="text-stone-300 text-xs mt-2">Prueba con otra categoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {ordenados.map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </div>
      )}
    </section>
  );
}
