import { useState, useEffect } from 'react';

export interface ProductoInput {
  id?: number;
  nombre: string;
  precio: number;
  precio_anterior: number | null;
  categoria: string;
  descripcion: string;
  tallas: string[];
  colores: { nombre: string; hex: string }[];
  imagenes: string[];
  nuevo: boolean;
  agotado: boolean;
}

interface Props {
  inicial?: ProductoInput;
  categorias: string[];
  onGuardar: (data: ProductoInput) => Promise<void>;
  onCancelar: () => void;
  guardando: boolean;
}

const vacío: ProductoInput = {
  nombre: '', precio: 0, precio_anterior: null, categoria: '',
  descripcion: '', tallas: [], colores: [], imagenes: [], nuevo: false, agotado: false,
};

export default function ProductoForm({ inicial, categorias, onGuardar, onCancelar, guardando }: Props) {
  const [form, setForm] = useState<ProductoInput>(inicial ?? vacío);
  const [nuevaTalla, setNuevaTalla] = useState('');
  const [nuevoColor, setNuevoColor] = useState({ nombre: '', hex: '#000000' });
  const [nuevaImagen, setNuevaImagen] = useState('');

  useEffect(() => { setForm(inicial ?? vacío); }, [inicial]);

  const set = (k: keyof ProductoInput, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const agregarTalla = () => {
    const t = nuevaTalla.trim().toUpperCase();
    if (t && !form.tallas.includes(t)) { set('tallas', [...form.tallas, t]); setNuevaTalla(''); }
  };

  const agregarColor = () => {
    if (nuevoColor.nombre.trim()) {
      set('colores', [...form.colores, { ...nuevoColor, nombre: nuevoColor.nombre.trim() }]);
      setNuevoColor({ nombre: '', hex: '#000000' });
    }
  };

  const agregarImagen = () => {
    if (nuevaImagen.trim()) { set('imagenes', [...form.imagenes, nuevaImagen.trim()]); setNuevaImagen(''); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onCancelar}>
      <div className="bg-[#FAF8F5] w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#FAF8F5] border-b border-stone-100 px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-stone-800">{inicial?.id ? 'Editar producto' : 'Nuevo producto'}</h2>
          <button onClick={onCancelar} className="text-stone-400 hover:text-stone-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Nombre */}
          <div>
            <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Nombre *</label>
            <input value={form.nombre} onChange={e => set('nombre', e.target.value)}
              className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400" />
          </div>

          {/* Categoría */}
          <div>
            <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Categoría *</label>
            <select value={form.categoria} onChange={e => set('categoria', e.target.value)}
              className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400 bg-white">
              <option value="">Seleccionar...</option>
              {categorias.filter(c => c !== 'Todo').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Precio *</label>
              <input type="number" value={form.precio} onChange={e => set('precio', Number(e.target.value))}
                className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400" />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Precio anterior</label>
              <input type="number" value={form.precio_anterior ?? ''} onChange={e => set('precio_anterior', e.target.value ? Number(e.target.value) : null)}
                placeholder="Opcional"
                className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400" />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Descripción</label>
            <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} rows={3}
              className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400 resize-none" />
          </div>

          {/* Tallas */}
          <div>
            <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Tallas</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tallas.map(t => (
                <span key={t} className="flex items-center gap-1 border border-stone-200 px-2 py-1 text-xs text-stone-700">
                  {t}
                  <button onClick={() => set('tallas', form.tallas.filter(x => x !== t))} className="text-stone-400 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={nuevaTalla} onChange={e => setNuevaTalla(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), agregarTalla())}
                placeholder="ej. S, M, L, XL, 28..." className="flex-1 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400" />
              <button onClick={agregarTalla} className="border border-stone-300 px-3 py-2 text-xs text-stone-600 hover:bg-stone-100">Agregar</button>
            </div>
          </div>

          {/* Colores */}
          <div>
            <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Colores</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.colores.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5 border border-stone-200 px-2 py-1 text-xs text-stone-700">
                  <span className="w-4 h-4 rounded-full border border-stone-200" style={{ backgroundColor: c.hex }} />
                  {c.nombre}
                  <button onClick={() => set('colores', form.colores.filter((_, j) => j !== i))} className="text-stone-400 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={nuevoColor.nombre} onChange={e => setNuevoColor(c => ({ ...c, nombre: e.target.value }))}
                placeholder="Nombre del color" className="flex-1 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400" />
              <input type="color" value={nuevoColor.hex} onChange={e => setNuevoColor(c => ({ ...c, hex: e.target.value }))}
                className="w-10 h-10 border border-stone-200 cursor-pointer" />
              <button onClick={agregarColor} className="border border-stone-300 px-3 py-2 text-xs text-stone-600 hover:bg-stone-100">Agregar</button>
            </div>
          </div>

          {/* Imágenes */}
          <div>
            <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Imágenes (URLs)</label>
            <div className="flex flex-col gap-2 mb-2">
              {form.imagenes.map((img, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={img} className="w-10 h-12 object-cover border border-stone-100" onError={e => (e.currentTarget.style.display = 'none')} />
                  <span className="flex-1 text-xs text-stone-500 truncate">{img}</span>
                  <button onClick={() => set('imagenes', form.imagenes.filter((_, j) => j !== i))} className="text-stone-400 hover:text-red-500 text-sm">×</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={nuevaImagen} onChange={e => setNuevaImagen(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), agregarImagen())}
                placeholder="https://..." className="flex-1 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400" />
              <button onClick={agregarImagen} className="border border-stone-300 px-3 py-2 text-xs text-stone-600 hover:bg-stone-100">Agregar</button>
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.nuevo} onChange={e => set('nuevo', e.target.checked)} className="w-4 h-4 accent-stone-800" />
              <span className="text-sm text-stone-600">Nuevo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.agotado} onChange={e => set('agotado', e.target.checked)} className="w-4 h-4 accent-stone-800" />
              <span className="text-sm text-stone-600">Agotado</span>
            </label>
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2 border-t border-stone-100">
            <button onClick={onCancelar} className="flex-1 border border-stone-200 text-stone-600 text-xs tracking-widest uppercase py-3 hover:bg-stone-50 transition-colors">
              Cancelar
            </button>
            <button onClick={() => onGuardar(form)} disabled={guardando || !form.nombre || !form.categoria || !form.precio}
              className="flex-1 bg-stone-800 text-white text-xs tracking-widest uppercase py-3 hover:bg-stone-700 transition-colors disabled:opacity-40">
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
