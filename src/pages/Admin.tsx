import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import ProductoForm from '../components/admin/ProductoForm';
import type { ProductoInput } from '../components/admin/ProductoForm';

const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

type Tab = 'productos' | 'categorias';

export default function Admin() {
  const { session, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('productos');

  const [productos, setProductos] = useState<ProductoInput[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);

  const [formAbierto, setFormAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState<ProductoInput | undefined>();
  const [guardando, setGuardando] = useState(false);

  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [guardandoCat, setGuardandoCat] = useState(false);

  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (!authLoading && !session) navigate('/admin/login');
  }, [session, authLoading, navigate]);

  const cargar = useCallback(async () => {
    setCargando(true);
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from('productos').select('*').order('id', { ascending: false }),
      supabase.from('categorias').select('*').order('nombre'),
    ]);
    setProductos(prods ?? []);
    setCategorias(['Todo', ...(cats ?? []).map((c: { nombre: string }) => c.nombre)]);
    setCargando(false);
  }, []);

  useEffect(() => { if (session) cargar(); }, [session, cargar]);

  const guardarProducto = async (data: ProductoInput) => {
    setGuardando(true);
    if (data.id) {
      await supabase.from('productos').update(data).eq('id', data.id);
    } else {
      await supabase.from('productos').insert(data);
    }
    setFormAbierto(false);
    setProductoEditando(undefined);
    setGuardando(false);
    cargar();
  };

  const eliminarProducto = async (id: number) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await supabase.from('productos').delete().eq('id', id);
    cargar();
  };

  const agregarCategoria = async () => {
    const nombre = nuevaCategoria.trim();
    if (!nombre) return;
    setGuardandoCat(true);
    await supabase.from('categorias').insert({ nombre });
    setNuevaCategoria('');
    setGuardandoCat(false);
    cargar();
  };

  const eliminarCategoria = async (nombre: string) => {
    if (!confirm(`¿Eliminar la categoría "${nombre}"?`)) return;
    await supabase.from('categorias').delete().eq('nombre', nombre);
    cargar();
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (authLoading || (!session && !authLoading)) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-[#FAF8F5] border-b border-stone-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="font-serif text-lg tracking-widest text-stone-800">BOUTIQUE</a>
            <span className="text-stone-200">|</span>
            <nav className="flex gap-1">
              {(['productos', 'categorias'] as Tab[]).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`text-xs tracking-widest uppercase px-3 py-1.5 transition-colors ${tab === t ? 'text-stone-800 bg-stone-100' : 'text-stone-400 hover:text-stone-600'}`}>
                  {t}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={signOut} className="text-xs text-stone-400 hover:text-stone-700 tracking-widest uppercase transition-colors">
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* TAB PRODUCTOS */}
        {tab === 'productos' && (
          <div>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div>
                <h1 className="font-serif text-2xl text-stone-800">Productos</h1>
                <p className="text-xs text-stone-400 mt-0.5">{productos.length} en total</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  placeholder="Buscar..."
                  className="border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400 w-48 bg-white"
                />
                <button
                  onClick={() => { setProductoEditando(undefined); setFormAbierto(true); }}
                  className="bg-stone-800 text-white text-xs tracking-widest uppercase px-4 py-2 hover:bg-stone-700 transition-colors whitespace-nowrap"
                >
                  + Nuevo producto
                </button>
              </div>
            </div>

            {cargando ? (
              <p className="text-stone-400 text-sm text-center py-16">Cargando...</p>
            ) : productosFiltrados.length === 0 ? (
              <p className="text-stone-400 text-sm text-center py-16">No hay productos.</p>
            ) : (
              <div className="bg-white border border-stone-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-100 text-left">
                      <th className="text-xs tracking-widest uppercase text-stone-400 px-4 py-3 font-normal">Producto</th>
                      <th className="text-xs tracking-widest uppercase text-stone-400 px-4 py-3 font-normal hidden md:table-cell">Categoría</th>
                      <th className="text-xs tracking-widest uppercase text-stone-400 px-4 py-3 font-normal">Precio</th>
                      <th className="text-xs tracking-widest uppercase text-stone-400 px-4 py-3 font-normal hidden sm:table-cell">Estado</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados.map(p => (
                      <tr key={p.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {p.imagenes?.[0] && (
                              <img src={p.imagenes[0]} className="w-10 h-12 object-cover border border-stone-100 shrink-0" />
                            )}
                            <span className="text-sm text-stone-800">{p.nombre}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-stone-500 hidden md:table-cell">{p.categoria}</td>
                        <td className="px-4 py-3 text-sm text-stone-800">{mxn(p.precio)}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <div className="flex gap-1">
                            {p.nuevo && <span className="text-[10px] bg-stone-800 text-white px-1.5 py-0.5 tracking-widest uppercase">Nuevo</span>}
                            {p.agotado && <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 tracking-widest uppercase">Agotado</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => { setProductoEditando(p); setFormAbierto(true); }}
                              className="text-xs text-stone-500 hover:text-stone-800 tracking-widest uppercase transition-colors"
                            >Editar</button>
                            <button
                              onClick={() => eliminarProducto(p.id!)}
                              className="text-xs text-stone-400 hover:text-red-500 tracking-widest uppercase transition-colors"
                            >Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB CATEGORÍAS */}
        {tab === 'categorias' && (
          <div className="max-w-md">
            <div className="mb-6">
              <h1 className="font-serif text-2xl text-stone-800">Categorías</h1>
              <p className="text-xs text-stone-400 mt-0.5">{categorias.filter(c => c !== 'Todo').length} categorías</p>
            </div>

            <div className="bg-white border border-stone-100 mb-6">
              {categorias.filter(c => c !== 'Todo').length === 0 ? (
                <p className="text-sm text-stone-400 text-center py-8">No hay categorías aún.</p>
              ) : (
                categorias.filter(c => c !== 'Todo').map(cat => (
                  <div key={cat} className="flex items-center justify-between px-4 py-3 border-b border-stone-50 last:border-0">
                    <span className="text-sm text-stone-700">{cat}</span>
                    <button onClick={() => eliminarCategoria(cat)}
                      className="text-xs text-stone-400 hover:text-red-500 tracking-widest uppercase transition-colors">
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>

            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">Nueva categoría</label>
              <div className="flex gap-2">
                <input
                  value={nuevaCategoria}
                  onChange={e => setNuevaCategoria(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && agregarCategoria()}
                  placeholder="ej. Vestidos, Accesorios..."
                  className="flex-1 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400 bg-white"
                />
                <button onClick={agregarCategoria} disabled={guardandoCat || !nuevaCategoria.trim()}
                  className="bg-stone-800 text-white text-xs tracking-widest uppercase px-4 py-2 hover:bg-stone-700 disabled:opacity-40 transition-colors">
                  {guardandoCat ? '...' : 'Agregar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {formAbierto && (
        <ProductoForm
          inicial={productoEditando}
          categorias={categorias}
          onGuardar={guardarProducto}
          onCancelar={() => { setFormAbierto(false); setProductoEditando(undefined); }}
          guardando={guardando}
        />
      )}
    </div>
  );
}
