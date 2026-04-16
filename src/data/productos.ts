export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precioAnterior?: number;
  categoria: string;
  descripcion: string;
  tallas: string[];
  colores: { nombre: string; hex: string }[];
  imagenes: string[];
  nuevo?: boolean;
  agotado?: boolean;
}

export const categorias = ['Todo', 'Tops', 'Pantalones', 'Vestidos', 'Accesorios', 'Outerwear'];

export const productos: Producto[] = [
  // ── TOPS ──────────────────────────────────────────────────────────────
  {
    id: 1,
    nombre: 'Blusa Off-Shoulder Seda',
    precio: 1050,
    categoria: 'Tops',
    descripcion: 'Blusa off-shoulder en seda natural con caída suave. Perfecta para ocasiones especiales o una salida elegante.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Crema', hex: '#FAF8F5' },
      { nombre: 'Nude', hex: '#D4A88A' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 2,
    nombre: 'Crop Top Bordado',
    precio: 780,
    precioAnterior: 990,
    categoria: 'Tops',
    descripcion: 'Crop top con bordados florales artesanales en el escote. Tejido de algodón suave y transpirable.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Blanco', hex: '#F9F7F4' },
      { nombre: 'Terracota', hex: '#C1634F' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600&q=80',
    ],
  },
  {
    id: 3,
    nombre: 'Camisa Oversize Rayas',
    precio: 920,
    categoria: 'Tops',
    descripcion: 'Camisa de corte oversize en algodón con rayas finas. Un clásico renovado para el día a día.',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Azul/Blanco', hex: '#BFD7EA' },
      { nombre: 'Negro/Blanco', hex: '#6B7280' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 4,
    nombre: 'Top Satén Tirantes',
    precio: 650,
    categoria: 'Tops',
    descripcion: 'Top de tirantes en satén brillante. Versátil: úsalo solo o bajo un blazer para una propuesta más formal.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Champagne', hex: '#F7E7CE' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Sage', hex: '#8FAF8F' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80',
    ],
  },
  {
    id: 5,
    nombre: 'Cardigan Tejido Grueso',
    precio: 1380,
    categoria: 'Tops',
    descripcion: 'Cardigan de punto grueso con botones de nácar. El básico de temporada fría que nunca pasa de moda.',
    tallas: ['S/M', 'L/XL'],
    colores: [
      { nombre: 'Oatmeal', hex: '#E8DCCA' },
      { nombre: 'Gris Perla', hex: '#D1D5DB' },
      { nombre: 'Camel', hex: '#C19A6B' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 6,
    nombre: 'Blusa Lino Manga Larga',
    precio: 870,
    categoria: 'Tops',
    descripcion: 'Blusa de lino con manga larga y cuello mao. Fresca, ligera y sofisticada.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Arena', hex: '#E8DCC8' },
      { nombre: 'Blanco', hex: '#F9F7F4' },
      { nombre: 'Terracota', hex: '#C1634F' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    ],
  },

  // ── PANTALONES ────────────────────────────────────────────────────────
  {
    id: 7,
    nombre: 'Pantalón Wide Leg Satén',
    precio: 1390,
    categoria: 'Pantalones',
    descripcion: 'Pantalón de pierna ancha en satén fluido. Cómodo, elegante y perfecto para cualquier ocasión.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Crema', hex: '#FAF8F5' },
      { nombre: 'Camel', hex: '#C19A6B' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&q=80',
    ],
  },
  {
    id: 8,
    nombre: 'Jeans Straight Tiro Alto',
    precio: 1290,
    categoria: 'Pantalones',
    descripcion: 'Jeans straight de tiro alto en denim premium. El básico más versátil de tu clóset.',
    tallas: ['24', '25', '26', '27', '28', '29', '30'],
    colores: [
      { nombre: 'Azul Oscuro', hex: '#1B3A5C' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Azul Claro', hex: '#7BA7C7' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 9,
    nombre: 'Pantalón Cuero Sintético',
    precio: 1550,
    precioAnterior: 1900,
    categoria: 'Pantalones',
    descripcion: 'Pantalón en cuero sintético de alta calidad con corte slim. Edgy y sofisticado a la vez.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Chocolate', hex: '#3B1F0E' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
    ],
  },
  {
    id: 10,
    nombre: 'Falda Plisada Midi',
    precio: 1050,
    categoria: 'Pantalones',
    descripcion: 'Falda midi plisada con movimiento fluido y cintura elástica. Combina elegancia y comodidad.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Marfil', hex: '#FFFFF0' },
      { nombre: 'Camel', hex: '#C19A6B' },
      { nombre: 'Mauve', hex: '#D8A9C0' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 11,
    nombre: 'Shorts Lino Estructurado',
    precio: 790,
    categoria: 'Pantalones',
    descripcion: 'Shorts de lino con pinzas frontales y bolsillos laterales. Ideales para el verano con un look pulido.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Beige', hex: '#D9C9B0' },
      { nombre: 'Blanco', hex: '#F9F7F4' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    ],
  },

  // ── VESTIDOS ──────────────────────────────────────────────────────────
  {
    id: 12,
    nombre: 'Vestido Midi Satén',
    precio: 1950,
    precioAnterior: 2400,
    categoria: 'Vestidos',
    descripcion: 'Vestido midi en satén con escote en V y abertura lateral. Elegante y versátil para cualquier ocasión especial.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Champagne', hex: '#F7E7CE' },
      { nombre: 'Nude', hex: '#D4A88A' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 13,
    nombre: 'Vestido Camisero Algodón',
    precio: 1480,
    categoria: 'Vestidos',
    descripcion: 'Vestido camisero de algodón premium con botones nacarados. Ideal para el día, de la oficina al café.',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Azul Cielo', hex: '#BFD7EA' },
      { nombre: 'Blanco', hex: '#F9F7F4' },
      { nombre: 'Arena', hex: '#E8DCC8' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    ],
  },
  {
    id: 14,
    nombre: 'Vestido Maxi Bohemio',
    precio: 2100,
    categoria: 'Vestidos',
    descripcion: 'Vestido maxi con estampado floral sutil y tela fluida. Romántico y libre para los días de verano.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Floral Beige', hex: '#E8DCC8' },
      { nombre: 'Floral Sage', hex: '#8FAF8F' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 15,
    nombre: 'Jumpsuit Lino Holgado',
    precio: 1750,
    precioAnterior: 2100,
    categoria: 'Vestidos',
    descripcion: 'Jumpsuit de lino natural con manga corta y pantalón ancho. Una pieza completa llena de personalidad.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Crudo', hex: '#F5F0E8' },
      { nombre: 'Terracota', hex: '#C1634F' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
      'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80',
    ],
  },
  {
    id: 16,
    nombre: 'Vestido Mini Punto',
    precio: 1250,
    categoria: 'Vestidos',
    descripcion: 'Vestido mini de punto acanalado con manga larga. Ceñido y cómodo, perfecto para el otoño-invierno.',
    tallas: ['XS', 'S', 'M'],
    colores: [
      { nombre: 'Chocolate', hex: '#3B1F0E' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Marfil', hex: '#FFFFF0' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    ],
  },

  // ── OUTERWEAR ─────────────────────────────────────────────────────────
  {
    id: 17,
    nombre: 'Blazer Oversize Lana',
    precio: 2350,
    categoria: 'Outerwear',
    descripcion: 'Blazer oversize en mezcla de lana con solapa pronunciada. El básico estructurado que eleva cualquier look.',
    tallas: ['S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Gris Medio', hex: '#9CA3AF' },
      { nombre: 'Beige', hex: '#D9C9B0' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 18,
    nombre: 'Trench Clásico',
    precio: 3900,
    precioAnterior: 4600,
    categoria: 'Outerwear',
    descripcion: 'Trench coat clásico con cinturón y hombreras. Una pieza atemporal de inversión que dura décadas.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Beige', hex: '#D9C9B0' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1520975867827-9f0f7e4e9b2c?w=600&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
    ],
  },
  {
    id: 19,
    nombre: 'Chaqueta Denim Premium',
    precio: 1680,
    categoria: 'Outerwear',
    descripcion: 'Chaqueta de denim lavado en corte recto. Icónica y versátil, combina con todo en tu armario.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Azul Medio', hex: '#7BA7C7' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Azul Claro', hex: '#A8C4D4' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80',
    ],
  },
  {
    id: 20,
    nombre: 'Abrigo Lana Camel',
    precio: 4500,
    categoria: 'Outerwear',
    descripcion: 'Abrigo largo en lana camel de primera calidad. Elegancia pura para los días fríos.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Camel', hex: '#C19A6B' },
      { nombre: 'Gris Oscuro', hex: '#4B5563' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
      'https://images.unsplash.com/photo-1520975867827-9f0f7e4e9b2c?w=600&q=80',
    ],
    nuevo: true,
  },

  // ── ACCESORIOS ────────────────────────────────────────────────────────
  {
    id: 21,
    nombre: 'Bolsa Tote Cuero',
    precio: 2800,
    categoria: 'Accesorios',
    descripcion: 'Bolsa tote grande en cuero genuino con asas reforzadas. Espaciosa y elegante para el día a día.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Cognac', hex: '#A0522D' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Crema', hex: '#FAF8F5' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 22,
    nombre: 'Bolsa Crossbody Mini',
    precio: 1650,
    precioAnterior: 2000,
    categoria: 'Accesorios',
    descripcion: 'Mini bolsa crossbody en cuero con cadena dorada. Compacta y chic para looks de noche.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Nude', hex: '#D4A88A' },
      { nombre: 'Borgoña', hex: '#800020' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    ],
  },
  {
    id: 23,
    nombre: 'Collar Cadena Dorada',
    precio: 580,
    categoria: 'Accesorios',
    descripcion: 'Collar de cadena en baño de oro 18k. Layering friendly, perfecto para apilar con otros collares.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Dorado', hex: '#D4AF37' },
      { nombre: 'Plateado', hex: '#C0C0C0' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 24,
    nombre: 'Aretes Perla Moderna',
    precio: 450,
    categoria: 'Accesorios',
    descripcion: 'Aretes con perla cultivada en montura dorada. Clásicos con un toque contemporáneo.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Perla/Dorado', hex: '#F5F0E8' },
      { nombre: 'Perla/Plateado', hex: '#E8E8E8' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    ],
  },
  {
    id: 25,
    nombre: 'Cinturón Piel Fino',
    precio: 680,
    categoria: 'Accesorios',
    descripcion: 'Cinturón fino de piel genuina con hebilla rectangular dorada. El detalle que define el outfit.',
    tallas: ['XS/S', 'M/L'],
    colores: [
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Cognac', hex: '#A0522D' },
      { nombre: 'Beige', hex: '#D9C9B0' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    ],
  },
  {
    id: 26,
    nombre: 'Sombrero de Paja',
    precio: 520,
    categoria: 'Accesorios',
    descripcion: 'Sombrero de paja natural con ala media. El accesorio de verano que eleva cualquier look de playa o ciudad.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Natural', hex: '#D9C9B0' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80',
      'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&q=80',
    ],
    agotado: false,
  },
];
