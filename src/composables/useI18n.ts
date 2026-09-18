import { computed, ref } from 'vue'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '@/constants'
import { dictionaries } from '@/data'
import type { Locale } from '@/types'

const locale = ref<Locale>(DEFAULT_LOCALE)

function isLocale(value: string | null): value is Locale {
  return value === 'pt-BR' || value === 'es'
}

function applyDocumentMeta(next: Locale) {
  const seo = dictionaries[next].seo
  document.documentElement.lang = next
  document.title = seo.title

  const description = document.querySelector('meta[name="description"]')
  if (description) {
    description.setAttribute('content', seo.description)
  }

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', seo.title)
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) {
    ogDescription.setAttribute('content', seo.description)
  }

  const ogLocale = document.querySelector('meta[property="og:locale"]')
  if (ogLocale) {
    ogLocale.setAttribute('content', next === 'pt-BR' ? 'pt_BR' : 'es_ES')
  }
}

export function initLocale() {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  locale.value = isLocale(stored) ? stored : DEFAULT_LOCALE
  applyDocumentMeta(locale.value)
}

export function useI18n() {
  const t = computed(() => dictionaries[locale.value])

  function setLocale(next: Locale) {
    locale.value = next
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
    applyDocumentMeta(next)
  }

  return {
    locale,
    t,
    setLocale,
  }
}
