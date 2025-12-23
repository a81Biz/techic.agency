/**
 * Catálogo de “ejemplos” para tooltips/modales.
 *
 * - Las llaves son EXACTAMENTE los labels que ya se guardan en el estado
 *   (CONTENT_TYPE_OPTIONS y VISUAL_STYLE_OPTIONS).
 * - Las imágenes viven en /public/samples/premium/... (puedes cambiarlas a CDN después).
 */

export type SampleImage = { src: string; alt: string }

export type SamplesEntry = {
  title: string
  description?: string
  images: SampleImage[]
}

export const PREMIUM_SAMPLES: Record<string, SamplesEntry> = {
  // ====== PASO 1: Content Types ======
  Fitness: {
    title: 'Fitness',
    description: 'Gym / lifestyle / rutinas.',
    images: [
      { src: '/samples/premium/fitness/1.webp', alt: 'Fitness ejemplo' },
      { src: '/samples/premium/fitness/2.webp', alt: 'Fitness ejemplo' },
      { src: '/samples/premium/fitness/3.webp', alt: 'Fitness ejemplo' },
      { src: '/samples/premium/fitness/4.webp', alt: 'Fitness ejemplo' },
      { src: '/samples/premium/fitness/5.webp', alt: 'Fitness ejemplo' },
    ],
  },
  Elegante: {
    title: 'Elegante',
    description: 'Looks formales, sets limpios, estética cuidada.',
    images: [
      { src: '/samples/premium/elegante/1.webp', alt: 'Elegante ejemplo' },
      { src: '/samples/premium/elegante/2.webp', alt: 'Elegante ejemplo' },
      { src: '/samples/premium/elegante/3.webp', alt: 'Elegante ejemplo' },
      { src: '/samples/premium/elegante/4.webp', alt: 'Elegante ejemplo' },
      { src: '/samples/premium/elegante/5.webp', alt: 'Elegante ejemplo' },
    ],
  },
  'Solo fotos normales': {
    title: 'Solo fotos normales',
    description: 'Fotos que se pueden usar en cualquier red social',
    images: [
      { src: '/samples/premium/normales/1.webp', alt: 'normales ejemplo' },
      { src: '/samples/premium/normales/2.webp', alt: 'normales ejemplo' },
      { src: '/samples/premium/normales/3.webp', alt: 'normales ejemplo' },
      { src: '/samples/premium/normales/4.webp', alt: 'normales ejemplo' },
      { src: '/samples/premium/normales/5.webp', alt: 'normales ejemplo' },
    ],
  },
  'Sensual suave': {
    title: 'Sensual suave',
    description: 'Sugerente, sin ser explícito. Enfoque estético.',
    images: [
      { src: '/samples/premium/sensual-suave/1.webp', alt: 'Sensual suave ejemplo' },
      { src: '/samples/premium/sensual-suave/2.webp', alt: 'Sensual suave ejemplo' },
      { src: '/samples/premium/sensual-suave/3.webp', alt: 'Sensual suave ejemplo' },
      { src: '/samples/premium/sensual-suave/4.webp', alt: 'Sensual suave ejemplo' },
      { src: '/samples/premium/sensual-suave/5.webp', alt: 'Sensual suave ejemplo' },
    ],
  },
  Lencería: {
    title: 'Lencería',
    description: 'Lencería y sets íntimos (sin forzar niveles).',
    images: [
      { src: '/samples/premium/lenceria/1.webp', alt: 'Lencería ejemplo' },
      { src: '/samples/premium/lenceria/2.webp', alt: 'Lencería ejemplo' },
      { src: '/samples/premium/lenceria/3.webp', alt: 'Lencería ejemplo 3' },
      { src: '/samples/premium/lenceria/4.webp', alt: 'Lencería ejemplo 4' },
      { src: '/samples/premium/lenceria/5.webp', alt: 'Lencería ejemplo 5' },
    ],
  },
  Implícito: {
    title: 'Implícito',
    description: 'Implícito y sets íntimos (sin forzar niveles).',
    images: [
      { src: '/samples/premium/Implícito/1.webp', alt: 'Implícito ejemplo' },
      { src: '/samples/premium/Implícito/2.webp', alt: 'Implícito ejemplo' },
      { src: '/samples/premium/Implícito/3.webp', alt: 'Implícito ejemplo' },
      { src: '/samples/premium/Implícito/4.webp', alt: 'Implícito ejemplo' },
    ],
  },
  'Lifestyle natural': {
    title: 'Lifestyle natural',
    description: 'Día a día, natural, sin producción pesada.',
    images: [
      { src: '/samples/premium/lifestyle/1.webp', alt: 'Lifestyle natural ejemplo' },
      { src: '/samples/premium/lifestyle/2.webp', alt: 'Lifestyle natural ejemplo' },
      { src: '/samples/premium/lifestyle/3.webp', alt: 'Lifestyle natural ejemplo' },
      { src: '/samples/premium/lifestyle/4.webp', alt: 'Lifestyle natural ejemplo' },
      { src: '/samples/premium/lifestyle/5.webp', alt: 'Lifestyle natural ejemplo' },
    ],
  },
  Artístico: {
    title: 'Artístico',
    description: 'Composición, luz, sombras, intención estética.',
    images: [
      { src: '/samples/premium/artistico/1.webp', alt: 'Artístico ejemplo' },
      { src: '/samples/premium/artistico/2.webp', alt: 'Artístico ejemplo' },
      { src: '/samples/premium/artistico/3.webp', alt: 'Artístico ejemplo' },
      { src: '/samples/premium/artistico/4.webp', alt: 'Artístico ejemplo' },
      { src: '/samples/premium/artistico/5.webp', alt: 'Artístico ejemplo' },
    ],
  },
  Mezcla: {
    title: 'Mezcla',
    description: 'Combinación de estilos (ejemplos de “mix”).',
    images: [
      { src: '/samples/premium/mezcla/1.webp', alt: 'Mezcla ejemplo' },
      { src: '/samples/premium/mezcla/2.webp', alt: 'Mezcla ejemplo' },
      { src: '/samples/premium/mezcla/3.webp', alt: 'Mezcla ejemplo' },
      { src: '/samples/premium/mezcla/4.webp', alt: 'Mezcla ejemplo' },
      { src: '/samples/premium/mezcla/5.webp', alt: 'Mezcla ejemplo' },
    ],
  },

  // ====== PASO 3: Visual Styles ======
  Naturales: {
    title: 'Naturales',
    description: 'Luz natural, poca post, vibe real.',
    images: [
      { src: '/samples/premium/naturales/1.webp', alt: 'Naturales ejemplo' },
      { src: '/samples/premium/naturales/2.webp', alt: 'Naturales ejemplo' },
      { src: '/samples/premium/naturales/3.webp', alt: 'Naturales ejemplo' },
      { src: '/samples/premium/naturales/4.webp', alt: 'Naturales ejemplo' },
      { src: '/samples/premium/naturales/5.webp', alt: 'Naturales ejemplo' },
    ],
  },
  Elegantes: {
    title: 'Elegantes',
    description: 'Acabado pulido, estética premium.',
    images: [
      { src: '/samples/premium/elegantes/1.webp', alt: 'Elegantes ejemplo' },
      { src: '/samples/premium/elegantes/2.webp', alt: 'Elegantes ejemplo' },
      { src: '/samples/premium/elegantes/3.webp', alt: 'Elegantes ejemplo' },
      { src: '/samples/premium/elegantes/4.webp', alt: 'Elegantes ejemplo' },
      { src: '/samples/premium/elegantes/5.webp', alt: 'Elegantes ejemplo' },
    ],
  },
  'Oscuras con sombras': {
    title: 'Oscuras con sombras',
    description: 'Low key, contraste, sombras marcadas.',
    images: [
      { src: '/samples/premium/oscuras/1.webp', alt: 'Oscuras ejemplo' },
      { src: '/samples/premium/oscuras/2.webp', alt: 'Oscuras ejemplo' },
      { src: '/samples/premium/oscuras/3.webp', alt: 'Oscuras ejemplo' },
      { src: '/samples/premium/oscuras/4.webp', alt: 'Oscuras ejemplo' },
      { src: '/samples/premium/oscuras/5.webp', alt: 'Oscuras ejemplo' },
    ],
  },
  'Tonos claros y suaves': {
    title: 'Tonos claros y suaves',
    description: 'High key, suave, limpio.',
    images: [
      { src: '/samples/premium/claros/1.webp', alt: 'Claros ejemplo' },
      { src: '/samples/premium/claros/2.webp', alt: 'Claros ejemplo' },
      { src: '/samples/premium/claros/3.webp', alt: 'Claros ejemplo' },
      { src: '/samples/premium/claros/4.webp', alt: 'Claros ejemplo' },
      { src: '/samples/premium/claros/5.webp', alt: 'Claros ejemplo' },
    ],
  },
  Deportivas: {
    title: 'Deportivas',
    description: 'Sporty, athleisure, movimiento.',
    images: [
      { src: '/samples/premium/deportivas/1.webp', alt: 'Deportivas ejemplo' },
      { src: '/samples/premium/deportivas/2.webp', alt: 'Deportivas ejemplo' },
      { src: '/samples/premium/deportivas/3.webp', alt: 'Deportivas ejemplo' },
      { src: '/samples/premium/deportivas/4.webp', alt: 'Deportivas ejemplo' },
      { src: '/samples/premium/deportivas/5.webp', alt: 'Deportivas ejemplo' },
    ],
  },
  Sensuales: {
    title: 'Sensuales',
    description: 'Sensualidad marcada (sin asumir explícito).',
    images: [
      { src: '/samples/premium/sensuales/1.webp', alt: 'Sensuales ejemplo' },
      { src: '/samples/premium/sensuales/2.webp', alt: 'Sensuales ejemplo' },
      { src: '/samples/premium/sensuales/3.webp', alt: 'Sensuales ejemplo' },
      { src: '/samples/premium/sensuales/4.webp', alt: 'Sensuales ejemplo' },
      { src: '/samples/premium/sensuales/5.webp', alt: 'Sensuales ejemplo' },
    ],
  },
}
