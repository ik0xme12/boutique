import { useState, useEffect } from 'react';
import type { Producto } from '../data/productos';

const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

interface ProductModalProps {
  producto: Producto | null;
  onCerrar: () => void;
}

export default function ProductModal({ producto, onCerrar }: ProductModalProps) {
  const [imgActiva, setImgActiva] = useState(0);
  const [colorActivo, setColorActivo] = useState(0);

  useEffect(() => {
    if (producto) { setImgActiva(0); setColorActivo(0); }
  }, [producto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCerrar(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCerrar]);

  if (!producto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onCerrar}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-[#F8F4EF] w-full md:max-w-4xl max-h-[95vh] md:max-h-[85vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-900 bg-white/80 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imágenes */}
        <div className="md:w-1/2 flex flex-col">
          <div className="relative aspect-[3/4] bg-[#E8D5C0] overflow-hidden">
            <img src={(producto.imagenes ?? [])[imgActiva] ?? ''} alt={producto.nombre} className="w-full h-full object-cover transition-opacity duration-300" />
            {producto.nuevo && (
              <span className="absolute top-4 left-4 bg-[#7D9B7E] text-white text-[10px] tracking-widest uppercase px-2 py-1">Nuevo</span>
            )}
          </div>
          {(producto.imagenes ?? []).length > 1 && (
            <div className="flex gap-2 p-4">
              {(producto.imagenes ?? []).map((img, i) => (
                <button key={i} onClick={() => setImgActiva(i)}
                  className={`w-16 h-20 overflow-hidden border-2 transition-all ${imgActiva === i ? 'border-[#7D9B7E]' : 'border-transparent opacity-50 hover:opacity-75'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs text-[#C4A49A] tracking-widest uppercase mb-3">{producto.categoria}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-stone-800 font-normal mb-4">{producto.nombre}</h2>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl text-stone-800 font-medium">{mxn(producto.precio)}</span>
            {producto.precioAnterior && (
              <span className="text-stone-400 line-through">{mxn(producto.precioAnterior)}</span>
            )}
          </div>

          <p className="text-sm text-stone-500 leading-relaxed mb-8">{producto.descripcion}</p>

          {/* Colores */}
          {(producto.colores ?? []).length > 0 && (
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
                Color — <span className="text-stone-700 font-medium">{producto.colores[colorActivo]?.nombre}</span>
              </p>
              <div className="flex gap-2">
                {(producto.colores ?? []).map((c, i) => (
                  <button key={c.nombre} title={c.nombre} onClick={() => setColorActivo(i)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${colorActivo === i ? 'border-[#7D9B7E] scale-110' : 'border-stone-200 hover:border-[#C4A49A]'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tallas */}
          {(producto.tallas ?? []).length > 0 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">Tallas disponibles</p>
              <div className="flex flex-wrap gap-2">
                {(producto.tallas ?? []).map(t => (
                  <span key={t} className="min-w-[44px] px-3 py-2 text-xs border border-stone-200 text-stone-600 text-center">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
