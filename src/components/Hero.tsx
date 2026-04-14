export default function Hero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&q=80"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay gradiente — oscurece arriba para el menú y abajo para el texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-20 w-full">
        <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-4">
          Nueva colección — Primavera 2025
        </p>
        <h1 className="font-serif text-white text-5xl md:text-7xl font-normal leading-tight mb-8">
          Piezas que<br />
          <em>definen</em> tu estilo
        </h1>
        <a
          href="#coleccion"
          className="inline-flex items-center gap-3 text-white text-xs tracking-widest uppercase border border-white/50 px-8 py-4 hover:bg-white hover:text-stone-900 transition-all duration-300"
        >
          Ver colección
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
