export type Locale = 'pt-BR' | 'es'

export type ServiceId =
  | 'cut'
  | 'blowout'
  | 'hydration'
  | 'color'
  | 'highlights'
  | 'straightening'
  | 'manicure'
  | 'pedicure'

export type ServiceIconName =
  | 'scissors'
  | 'wind'
  | 'droplets'
  | 'palette'
  | 'sparkles'
  | 'blend'
  | 'hand'
  | 'gem'

export type ServiceCategory = 'hair' | 'nails' | 'treatments'

export type GalleryCategory = 'hair' | 'color' | 'highlights' | 'nails'

export type BenefitIconName = 'heart' | 'award' | 'leaf' | 'sun'

export interface ServiceMeta {
  id: ServiceId
  price: number
  duration: string
  icon: ServiceIconName
  category: ServiceCategory
}

export interface GalleryMeta {
  id: string
  src: string
  category: GalleryCategory
}

export interface Translations {
  seo: {
    title: string
    description: string
  }
  skipLink: string
  nav: {
    home: string
    services: string
    gallery: string
    about: string
    contact: string
    book: string
    openMenu: string
    closeMenu: string
  }
  language: {
    label: string
    pt: string
    es: string
  }
  hero: {
    titleLine1: string
    titleLine2: string
    subtitle: string
    ctaBook: string
    ctaWhatsapp: string
    badge: string
    imageAlt: string
  }
  services: {
    eyebrow: string
    title: string
    subtitle: string
    from: string
    book: string
    filters: {
      all: string
      hair: string
      nails: string
      treatments: string
    }
    items: Record<ServiceId, { name: string; description: string }>
  }
  about: {
    eyebrow: string
    title: string
    text: string
    imageAlt: string
    stats: { value: string; label: string }[]
  }
  gallery: {
    eyebrow: string
    title: string
    subtitle: string
    categories: Record<GalleryCategory, string>
    alts: Record<string, string>
  }
  benefits: {
    eyebrow: string
    title: string
    items: {
      icon: BenefitIconName
      title: string
      text: string
    }[]
  }
  testimonials: {
    eyebrow: string
    title: string
    demoNote: string
    items: {
      quote: string
      name: string
    }[]
  }
  booking: {
    eyebrow: string
    title: string
    subtitle: string
    demoNote: string
    steps: string[]
    next: string
    back: string
    fields: {
      service: string
      date: string
      time: string
      name: string
      whatsapp: string
    }
    placeholders: {
      name: string
      whatsapp: string
    }
    confirm: string
    modalTitle: string
    modalText: string
    modalWhatsapp: string
    modalClose: string
    errors: {
      service: string
      date: string
      time: string
      name: string
      whatsapp: string
    }
  }
  cta: {
    title: string
    text: string
    book: string
    whatsapp: string
  }
  footer: {
    tagline: string
    location: string
    hoursLabel: string
    hours: string
    whatsapp: string
    instagram: string
    facebook: string
    copyright: string
  }
  whatsapp: {
    ariaLabel: string
    defaultMessage: string
    bookingMessage: string
  }
  chat: {
    open: string
    close: string
    title: string
    subtitle: string
    welcome: string
    selectServices: string
    selectionHelp: string
    selectedCount: string
    priceFrom: string
    inputLabel: string
    placeholder: string
    send: string
    sending: string
    error: string
    configurationError: string
    rateLimitError: string
    whatsapp: string
  }
}
