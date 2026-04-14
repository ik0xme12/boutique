import { useState } from 'react';
import type { Producto } from '../data/productos';

const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

interface ProductCardProps {
  producto: Producto;
  onVerDetalle: (p: Producto) => void;
  esFavorito: boolean;
  onToggleFavorito: (id: number) => void;
}

export default function ProductCard({ producto, onVerDetalle, esFavorito, onToggleFavorito }: ProductCardProps) {
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

        {/* Botón favorito */}
        <button
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
            hovered || esFavorito ? 'opacity-100' : 'opacity-0'
          } ${esFavorito ? 'bg-stone-800 text-white' : 'bg-white/80 text-stone-600 hover:bg-white'}`}
          onClick={e => { e.stopPropagation(); onToggleFavorito(producto.id); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={esFavorito ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

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
