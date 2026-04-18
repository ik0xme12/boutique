import { useState, useRef } from 'react';

function compressImage(file: File, maxW = 768, maxH = 1024, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      const ratio = Math.min(maxW / width, maxH / height, 1);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

interface UploadZoneProps {
  preview: string | null;
  label: string;
  hint: string;
  onClick: () => void;
}

function UploadZone({ preview, label, hint, onClick }: UploadZoneProps) {
  return (
    <div>
      <label className="text-xs tracking-widest uppercase text-stone-500 block mb-2">{label} *</label>
      <div
        onClick={onClick}
        className="border-2 border-dashed border-stone-200 aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:border-[#7D9B7E] transition-colors bg-[#F8F4EF] overflow-hidden"
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-stone-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-stone-400 text-center px-4">{hint}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function GeneradorIA() {
  const [garmPreview, setGarmPreview] = useState<string | null>(null);
  const [modelPreview, setModelPreview] = useState<string | null>(null);
  const [garmFile, setGarmFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [generando, setGenerando] = useState(false);
  const [estado, setEstado] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  const garmRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);

  const handleFile = async (
    file: File,
    setFile: (f: File) => void,
    setPreview: (s: string) => void,
  ) => {
    setFile(file);
    const b64 = await compressImage(file);
    setPreview(b64);
  };

  const generar = async () => {
    if (!garmFile || !modelFile) return;
    setGenerando(true);
    setError(null);
    setResultado(null);

    try {
      setEstado('Comprimiendo imágenes...');
      const [garmB64, modelB64] = await Promise.all([
        compressImage(garmFile),
        compressImage(modelFile),
      ]);

      setEstado('Enviando a la IA...');
      const createRes = await fetch('/api/crear-prediccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garm_img: garmB64,
          human_img: modelB64,
          garment_des: descripcion || 'clothing item',
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error ?? 'Error al iniciar generación');

      setEstado('Generando imagen (puede tardar ~1 min)...');
      for (let i = 0; i < 50; i++) {
        await new Promise(r => setTimeout(r, 4000));
        const pollRes = await fetch(`/api/estado-prediccion?id=${createData.id}`);
        const pollData = await pollRes.json();
        if (pollData.status === 'succeeded') { setResultado(pollData.output as string); break; }
        if (pollData.status === 'failed') throw new Error(pollData.error ?? 'La generación falló');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setGenerando(false);
      setEstado('');
    }
  };

  const copiarURL = () => {
    if (!resultado) return;
    navigator.clipboard.writeText(resultado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-stone-800">Generador IA</h1>
        <p className="text-xs text-stone-400 mt-0.5">
          Sube la foto de la prenda y una foto del modelo — la IA genera la imagen con la prenda puesta.
        </p>
      </div>

      {/* Uploads */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <input ref={garmRef} type="file" accept="image/*" className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0], setGarmFile, setGarmPreview)} />
        <UploadZone
          preview={garmPreview}
          label="Foto de la prenda"
          hint="Foto de la prenda (fondo blanco o colgada)"
          onClick={() => garmRef.current?.click()}
        />

        <input ref={modelRef} type="file" accept="image/*" className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0], setModelFile, setModelPreview)} />
        <UploadZone
          preview={modelPreview}
          label="Foto del modelo"
          hint="Foto de persona o maniquí de frente"
          onClick={() => modelRef.current?.click()}
        />
      </div>

      {/* Descripción */}
      <div className="mb-5">
        <label className="text-xs tracking-widest uppercase text-stone-500 block mb-1.5">
          Descripción de la prenda
        </label>
        <input
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="ej. jersey de lana azul, blusa floral de seda..."
          className="w-full border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400 bg-white"
        />
      </div>

      {/* Botón generar */}
      <button
        onClick={generar}
        disabled={generando || !garmFile || !modelFile}
        className="w-full bg-[#7D9B7E] text-white text-xs tracking-widest uppercase py-3 hover:bg-[#6a8a6b] disabled:opacity-40 transition-colors mb-5"
      >
        {generando ? estado || 'Generando...' : 'Generar con IA'}
      </button>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-5 rounded">
          {error}
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div>
          <label className="text-xs tracking-widest uppercase text-stone-500 block mb-3">
            Imagen generada
          </label>
          <div className="relative group border-2 border-[#7D9B7E] overflow-hidden mb-3">
            <img src={resultado} className="w-full object-cover" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={copiarURL}
              className="flex-1 bg-[#7D9B7E] text-white text-xs tracking-widest uppercase py-2.5 hover:bg-[#6a8a6b] transition-colors"
            >
              {copiado ? '¡URL copiada!' : 'Copiar URL'}
            </button>
            <a
              href={resultado}
              target="_blank"
              rel="noreferrer"
              className="flex-1 border border-stone-200 text-stone-600 text-xs tracking-widest uppercase py-2.5 hover:bg-stone-50 transition-colors text-center"
            >
              Ver imagen
            </a>
          </div>
          <p className="text-xs text-stone-400 mt-2">
            Pega la URL en el campo de imágenes del producto para usarla.
          </p>
        </div>
      )}
    </div>
  );
}
