import type { GalleryMeta } from '@/types'

export { SERVICES } from './services'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const GALLERY: GalleryMeta[] = [
  { id: 'g1', src: asset('images/gallery-01.jpg'), category: 'hair' },
  { id: 'g2', src: asset('images/gallery-02.jpg'), category: 'color' },
  { id: 'g3', src: asset('images/gallery-03.jpg'), category: 'highlights' },
  { id: 'g4', src: asset('images/gallery-04.jpg'), category: 'nails' },
  { id: 'g5', src: asset('images/gallery-05.jpg'), category: 'hair' },
  { id: 'g6', src: asset('images/gallery-06.jpg'), category: 'color' },
  { id: 'g7', src: asset('images/gallery-07.jpg'), category: 'highlights' },
  { id: 'g8', src: asset('images/gallery-08.jpg'), category: 'nails' },
]

export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
]

export const HERO_IMAGE = asset('images/hero.jpg')
export const ABOUT_IMAGE = asset('images/about.jpg')
