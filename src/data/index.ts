import type { Locale, Translations } from '@/types'
import { es } from './es'
import { ptBR } from './pt-BR'

export const dictionaries: Record<Locale, Translations> = {
  'pt-BR': ptBR,
  es,
}
