import { useState, useEffect } from 'react';
import type { Producto } from '../data/productos';

const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

interface ProductModalProps {
  producto: Producto | null;
  onCerrar: () => void;
  esFavorito: boolean;
  onToggleFavorito: (id: number) => void;
}

export default function ProductModal({ producto, onCerrar, esFavorito, onToggleFavorito }: ProductModalProps) {
  const [imgActiva, setImgActiva] = useState(0);
  const [tallaActiva, setTallaActiva] = useState<string | null>(null);
  const [colorActivo, setColorActivo] = useState(0);

  useEffect(() => {
    if (producto) { setImgActiva(0); setTallaActiva(null); setColorActivo(0); }
  }, [producto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCerrar(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCerrar]);

  if (!producto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onCerrar}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#FAF8F5] w-full md:max-w-4xl md:rounded-none max-h-[95vh] md:max-h-[85vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-900 bg-white/80 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Columna imágenes */}
        <div className="md:w-1/2 flex flex-col">
          <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
            <img
              src={producto.imagenes[imgActiva]}
              alt={producto.nombre}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {producto.nuevo && (
              <span className="absolute top-4 left-4 bg-stone-800 text-white text-[10px] tracking-widest uppercase px-2 py-1">
                Nuevo
              </span>
            )}
          </div>
          {/* Miniaturas */}
          {producto.imagenes.length > 1 && (
            <div className="flex gap-2 p-4">
              {producto.imagenes.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgActiva(i)}
                  className={`w-16 h-20 overflow-hidden border-2 transition-all ${
                    imgActiva === i ? 'border-stone-800' : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Columna info */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-3">{producto.categoria}</p>

          <h2 className="font-serif text-2xl md:text-3xl text-stone-800 font-normal mb-4">
            {producto.nombre}
          </h2>

          {/* Precio */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl text-stone-800 font-medium">{mxn(producto.precio)}</span>
            {producto.precioAnterior && (
              <span className="text-stone-400 line-through">{mxn(producto.precioAnterior)}</span>
            )}
          </div>

          <p className="text-sm text-stone-500 leading-relaxed mb-8">{producto.descripcion}</p>

          {/* Colores */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
              Color — <span className="text-stone-700 font-medium">{producto.colores[colorActivo].nombre}</span>
            </p>
            <div className="flex gap-2">
              {producto.colores.map((c, i) => (
                <button
                  key={c.nombre}
                  title={c.nombre}
                  onClick={() => setColorActivo(i)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    colorActivo === i ? 'border-stone-800 scale-110' : 'border-stone-200 hover:border-stone-400'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Tallas */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">Talla</p>
            <div className="flex flex-wrap gap-2">
              {producto.tallas.map(t => (
                <button
                  key={t}
                  onClick={() => setTallaActiva(t)}
                  className={`min-w-[44px] px-3 py-2 text-xs border transition-all duration-150 ${
                    tallaActiva === t
                      ? 'border-stone-800 bg-stone-800 text-white'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <button
              disabled={!tallaActiva}
              className="flex-1 py-4 bg-stone-800 text-white text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {tallaActiva ? 'Agregar al carrito' : 'Selecciona una talla'}
            </button>
            <button
              onClick={() => onToggleFavorito(producto.id)}
              className={`w-14 flex items-center justify-center border transition-all ${
                esFavorito ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={esFavorito ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          <p className="text-[11px] text-stone-400 mt-4 text-center">
            Envío gratis en pedidos mayores a $1,500
          </p>
        </div>
      </div>
    </div>
  );
}
