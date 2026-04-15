import { useState } from 'react';
import type { Producto } from '../data/productos';

const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

interface ProductCardProps {
  producto: Producto;
  onVerDetalle: (p: Producto) => void;
}

export default function ProductCard({ producto, onVerDetalle }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => { setHovered(true); if (producto.imagenes[1]) setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
      onClick={() => onVerDetalle(producto)}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[3/4] mb-4">
        <img
          src={producto.imagenes[imgIdx]}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {producto.nuevo && (
            <span className="bg-stone-800 text-white text-[10px] tracking-widest uppercase px-2 py-1">
              Nuevo
            </span>
          )}
          {producto.precioAnterior && (
            <span className="bg-stone-100 text-stone-700 text-[10px] tracking-widest uppercase px-2 py-1">
              Sale
            </span>
          )}
          {producto.agotado && (
            <span className="bg-stone-300 text-stone-600 text-[10px] tracking-widest uppercase px-2 py-1">
              Agotado
            </span>
          )}
        </div>

        {/* Quick view */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          <button
            className="w-full bg-white/90 backdrop-blur-sm text-stone-800 text-[11px] tracking-widest uppercase py-3 hover:bg-stone-800 hover:text-white transition-colors duration-200"
            onClick={e => { e.stopPropagation(); onVerDetalle(producto); }}
          >
            Ver detalle
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">{producto.categoria}</p>
        <h3 className="text-stone-800 font-normal text-sm mb-2 group-hover:text-stone-600 transition-colors">
          {producto.nombre}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-stone-800 text-sm font-medium">{mxn(producto.precio)}</span>
          {producto.precioAnterior && (
            <span className="text-stone-400 text-xs line-through">{mxn(producto.precioAnterior)}</span>
          )}
        </div>

        {/* Puntos de color */}
        <div className="flex gap-1.5 mt-2">
          {producto.colores.slice(0, 4).map(c => (
            <div
              key={c.nombre}
              title={c.nombre}
              className="w-3 h-3 rounded-full border border-stone-200"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {producto.colores.length > 4 && (
            <span className="text-[10px] text-stone-400">+{producto.colores.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
