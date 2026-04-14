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
  {
    id: 1,
    nombre: 'Blusa Lino Natural',
    precio: 890,
    categoria: 'Tops',
    descripcion: 'Blusa de lino natural con caída fluida. Perfecta para el día a día con un toque elegante.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Arena', hex: '#E8DCC8' },
      { nombre: 'Blanco', hex: '#F9F7F4' },
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
    nombre: 'Pantalón Wide Leg',
    precio: 1290,
    categoria: 'Pantalones',
    descripcion: 'Pantalón de pierna ancha en tela de alta calidad. Silueta moderna y cómoda.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Camel', hex: '#C19A6B' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Crema', hex: '#FAF8F5' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&q=80',
    ],
  },
  {
    id: 3,
    nombre: 'Vestido Midi Satén',
    precio: 1850,
    precioAnterior: 2200,
    categoria: 'Vestidos',
    descripcion: 'Vestido midi en satén con escote en V. Elegante y versátil para cualquier ocasión especial.',
    tallas: ['XS', 'S', 'M'],
    colores: [
      { nombre: 'Champagne', hex: '#F7E7CE' },
      { nombre: 'Nude', hex: '#D4A88A' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 4,
    nombre: 'Blazer Oversize',
    precio: 2100,
    categoria: 'Outerwear',
    descripcion: 'Blazer oversize en mezcla de lana. El básico estructurado que eleva cualquier look.',
    tallas: ['S', 'M', 'L'],
    colores: [
      { nombre: 'Gris', hex: '#9CA3AF' },
      { nombre: 'Beige', hex: '#D9C9B0' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
    ],
  },
  {
    id: 5,
    nombre: 'Top Canalé',
    precio: 590,
    categoria: 'Tops',
    descripcion: 'Top ajustado en tejido canalé. Básico imprescindible en tu guardarropa.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    colores: [
      { nombre: 'Blanco', hex: '#F9F7F4' },
      { nombre: 'Negro', hex: '#1C1917' },
      { nombre: 'Terracota', hex: '#C1634F' },
      { nombre: 'Sage', hex: '#8FAF8F' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=600&q=80',
    ],
  },
  {
    id: 6,
    nombre: 'Bolsa Bucket Cuero',
    precio: 3200,
    categoria: 'Accesorios',
    descripcion: 'Bolsa bucket en cuero genuino. Espaciosa, elegante y durable.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Cognac', hex: '#A0522D' },
      { nombre: 'Negro', hex: '#1C1917' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    ],
  },
  {
    id: 7,
    nombre: 'Falda Plisada',
    precio: 980,
    categoria: 'Pantalones',
    descripcion: 'Falda midi plisada con movimiento fluido. Combina elegancia y comodidad.',
    tallas: ['XS', 'S', 'M', 'L'],
    colores: [
      { nombre: 'Marfil', hex: '#FFFFF0' },
      { nombre: 'Camel', hex: '#C19A6B' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80',
    ],
  },
  {
    id: 8,
    nombre: 'Vestido Camisero',
    precio: 1450,
    categoria: 'Vestidos',
    descripcion: 'Vestido camisero de algodón con botones delanteros. Ideal para el día.',
    tallas: ['S', 'M', 'L'],
    colores: [
      { nombre: 'Azul Cielo', hex: '#BFD7EA' },
      { nombre: 'Blanco', hex: '#F9F7F4' },
      { nombre: 'Rayas', hex: '#D4D4D4' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    ],
    agotado: false,
  },
  {
    id: 9,
    nombre: 'Collar Minimal',
    precio: 420,
    categoria: 'Accesorios',
    descripcion: 'Collar delicado en plata 925. Diseño minimal que complementa cualquier outfit.',
    tallas: ['Única'],
    colores: [
      { nombre: 'Plata', hex: '#C0C0C0' },
      { nombre: 'Dorado', hex: '#D4AF37' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    ],
    nuevo: true,
  },
  {
    id: 10,
    nombre: 'Trench Clásico',
    precio: 3800,
    precioAnterior: 4500,
    categoria: 'Outerwear',
    descripcion: 'Trench coat clásico con cinturón. Una pieza atemporal que dura décadas.',
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
    id: 11,
    nombre: 'Jeans Straight',
    precio: 1190,
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
  },
  {
    id: 12,
    nombre: 'Cardigan Oversize',
    precio: 1350,
    categoria: 'Tops',
    descripcion: 'Cardigan oversize de tejido suave. Perfecto para layering en temporadas frías.',
    tallas: ['S/M', 'L/XL'],
    colores: [
      { nombre: 'Oatmeal', hex: '#E8DCCA' },
      { nombre: 'Gris', hex: '#9CA3AF' },
      { nombre: 'Marrón', hex: '#92400E' },
    ],
    imagenes: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80',
    ],
    nuevo: true,
  },
];
