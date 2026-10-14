import type { Locale, ServiceId, ServiceMeta } from '../types/index.js'

export const SERVICE_CATALOG: ServiceMeta[] = [
  { id: 'cut', price: 60, duration: '45 min', icon: 'scissors', category: 'hair' },
  { id: 'blowout', price: 45, duration: '40 min', icon: 'wind', category: 'hair' },
  { id: 'hydration', price: 70, duration: '50 min', icon: 'droplets', category: 'treatments' },
  { id: 'color', price: 150, duration: '2h', icon: 'palette', category: 'hair' },
  { id: 'highlights', price: 250, duration: '2h 30', icon: 'sparkles', category: 'hair' },
  { id: 'straightening', price: 180, duration: '2h', icon: 'blend', category: 'treatments' },
  { id: 'manicure', price: 35, duration: '40 min', icon: 'hand', category: 'nails' },
  { id: 'pedicure', price: 40, duration: '45 min', icon: 'gem', category: 'nails' },
]

export const SERVICES = SERVICE_CATALOG

export const SERVICE_TRANSLATIONS: Record<
  ServiceId,
  Record<Locale, { name: string; description: string }>
> = {
  cut: {
    'pt-BR': {
      name: 'Corte feminino',
      description: 'Corte sob medida para valorizar o movimento e o formato do seu rosto.',
    },
    es: {
      name: 'Corte femenino',
      description: 'Corte a medida para realzar el movimiento y el óvalo de tu rostro.',
    },
  },
  blowout: {
    'pt-BR': {
      name: 'Escova',
      description: 'Finalização elegante, com brilho e caimento natural.',
    },
    es: {
      name: 'Brushing',
      description: 'Acabado elegante, con brillo y caída natural.',
    },
  },
  hydration: {
    'pt-BR': {
      name: 'Hidratação',
      description: 'Tratamento profundo para devolver maciez, saúde e luminosidade.',
    },
    es: {
      name: 'Hidratación',
      description: 'Tratamiento profundo para devolver suavidad, salud y luminosidad.',
    },
  },
  color: {
    'pt-BR': {
      name: 'Coloração',
      description: 'Cor precisa e sofisticada, pensada para a saúde dos fios.',
    },
    es: {
      name: 'Coloración',
      description: 'Color preciso y sofisticado, pensado para la salud del cabello.',
    },
  },
  highlights: {
    'pt-BR': {
      name: 'Mechas',
      description: 'Iluminação sutil ou marcada, com um resultado de salão editorial.',
    },
    es: {
      name: 'Mechas',
      description: 'Iluminación sutil o marcada, con un resultado de salón editorial.',
    },
  },
  straightening: {
    'pt-BR': {
      name: 'Progressiva',
      description: 'Alisamento controlado para um visual alinhado e duradouro.',
    },
    es: {
      name: 'Alisado progresivo',
      description: 'Alisado controlado para un look alineado y duradero.',
    },
  },
  manicure: {
    'pt-BR': {
      name: 'Manicure',
      description: 'Cuidado das unhas com acabamento limpo e elegante.',
    },
    es: {
      name: 'Manicura',
      description: 'Cuidado de uñas con un acabado limpio y elegante.',
    },
  },
  pedicure: {
    'pt-BR': {
      name: 'Pedicure',
      description: 'Bem-estar e acabamento refinado para os pés.',
    },
    es: {
      name: 'Pedicura',
      description: 'Bienestar y acabado refinado para los pies.',
    },
  },
}
