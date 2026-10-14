import type { Translations } from '@/types'
import { SERVICE_TRANSLATIONS } from './services'

export const es: Translations = {
  seo: {
    title: 'Lumière Beauty Studio | Salón de Belleza',
    description: 'Belleza, cuidado y estilo en un espacio pensado para ti.',
  },
  skipLink: 'Ir al contenido',
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    gallery: 'Galería',
    about: 'Sobre',
    contact: 'Contacto',
    book: 'Agendar horario',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  language: {
    label: 'Seleccionar idioma',
    pt: 'PT',
    es: 'ES',
  },
  hero: {
    titleLine1: 'Tu belleza,',
    titleLine2: 'tu momento.',
    subtitle:
      'Un espacio creado para cuidar tu cabello, realzar tu belleza y transformar cada visita en una experiencia especial.',
    ctaBook: 'Agendar horario',
    ctaWhatsapp: 'Hablar por WhatsApp',
    badge: 'Belleza • Cuidado • Estilo',
    imageAlt: 'Retrato editorial de una mujer con el cabello cuidado e iluminado',
  },
  services: {
    eyebrow: '01 / Servicios',
    title: 'Nuestros servicios',
    subtitle: 'Cuidados pensados para realzar tu belleza.',
    from: 'A partir de',
    book: 'Agendar',
    filters: {
      all: 'Todos',
      hair: 'Cabello',
      nails: 'Uñas',
      treatments: 'Tratamientos',
    },
    items: {
      cut: SERVICE_TRANSLATIONS.cut.es,
      blowout: SERVICE_TRANSLATIONS.blowout.es,
      hydration: SERVICE_TRANSLATIONS.hydration.es,
      color: SERVICE_TRANSLATIONS.color.es,
      highlights: SERVICE_TRANSLATIONS.highlights.es,
      straightening: SERVICE_TRANSLATIONS.straightening.es,
      manicure: SERVICE_TRANSLATIONS.manicure.es,
      pedicure: SERVICE_TRANSLATIONS.pedicure.es,
    },
  },
  about: {
    eyebrow: '02 / El espacio',
    title: 'Un espacio pensado para ti',
    text: 'En Lumière, creemos que cuidar la belleza también es reservar un momento para ti.',
    imageAlt: 'Interior moderno y luminoso de un salón de belleza',
    stats: [
      { value: '+500', label: 'Atenciones' },
      { value: '+8', label: 'Servicios' },
      { value: '5★', label: 'Experiencia' },
    ],
  },
  gallery: {
    eyebrow: '03 / Galería',
    title: 'Belleza en los detalles',
    subtitle: 'Una selección visual para presentar la estética de la marca.',
    categories: {
      hair: 'Cabellos',
      color: 'Coloración',
      highlights: 'Mechas',
      nails: 'Uñas',
    },
    alts: {
      g1: 'Cabello castaño con ondas y brillo en luz cálida',
      g2: 'Proceso de coloración en un salón sofisticado',
      g3: 'Mechas caramelo con acabado editorial',
      g4: 'Detalle de uñas con esmaltado elegante',
      g5: 'Cabello oscuro con brillo y movimiento',
      g6: 'Coloración pelirroja en un close sofisticado',
      g7: 'Iluminación rubio-caramelo en el cabello',
      g8: 'Manicura en tonos neutros y refinados',
    },
  },
  benefits: {
    eyebrow: '04 / Diferenciales',
    title: '¿Por qué elegir Lumière?',
    items: [
      {
        icon: 'heart',
        title: 'Atención personalizada',
        text: 'Cada detalle pensado para ti.',
      },
      {
        icon: 'award',
        title: 'Profesionales especializados',
        text: 'Experiencia y cuidado en cada servicio.',
      },
      {
        icon: 'leaf',
        title: 'Productos de calidad',
        text: 'Seleccionamos productos para cuidar la salud de tu cabello.',
      },
      {
        icon: 'sun',
        title: 'Ambiente acogedor',
        text: 'Un espacio para relajarte y disfrutar tu momento.',
      },
    ],
  },
  testimonials: {
    eyebrow: '05 / Opiniones',
    title: 'Lo que dicen nuestras clientas',
    demoNote: 'Testimonios demostrativos para la presentación del proyecto.',
    items: [
      {
        quote:
          'Me encantó la atención y el resultado. Mi cabello quedó exactamente como lo imaginaba.',
        name: 'Camila R.',
      },
      {
        quote:
          'Un ambiente hermoso, atención impecable y profesionales muy atentos.',
        name: 'Helena M.',
      },
      {
        quote: 'Fue una experiencia maravillosa. Sin duda voy a volver.',
        name: 'Sofia L.',
      },
    ],
  },
  booking: {
    eyebrow: '06 / Reserva',
    title: 'Agenda tu horario',
    subtitle: 'Reserva tu momento en pocos pasos. Te contactaremos para confirmar.',
    demoNote: 'Demostración estática. No se registrará ninguna reserva real.',
    steps: ['Elige el servicio', 'Elige la fecha', 'Elige el horario', 'Tus datos'],
    next: 'Continuar',
    back: 'Volver',
    fields: {
      service: 'Servicio',
      date: 'Fecha',
      time: 'Horario',
      name: 'Nombre',
      whatsapp: 'WhatsApp',
    },
    placeholders: {
      name: 'Tu nombre',
      whatsapp: '(48) 99999-0000',
    },
    confirm: 'Confirmar reserva',
    modalTitle: '¡Tu horario fue solicitado!',
    modalText: 'Nos pondremos en contacto por WhatsApp para confirmar tu atención.',
    modalWhatsapp: 'Hablar por WhatsApp',
    modalClose: 'Cerrar',
    errors: {
      service: 'Selecciona un servicio para continuar.',
      date: 'Elige una fecha disponible.',
      time: 'Elige un horario.',
      name: 'Ingresa tu nombre.',
      whatsapp: 'Ingresa un WhatsApp válido.',
    },
  },
  cta: {
    title: '¿Lista para transformar tu look?',
    text: 'Reserva tu momento de belleza.',
    book: 'Agendar horario',
    whatsapp: 'Hablar por WhatsApp',
  },
  footer: {
    tagline: 'Belleza, cuidado y estilo.',
    location: 'Florianópolis - SC',
    hoursLabel: 'Horario',
    hours: 'Lunes a sábado, 09:00 a 19:00',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    copyright: '© 2026 Lumière Beauty Studio — Demo',
  },
  whatsapp: {
    ariaLabel: 'Conversar por WhatsApp',
    defaultMessage: 'Hola! Me gustaría agendar un horario en Lumière Beauty Studio.',
    bookingMessage:
      'Hola! Me gustaría agendar un horario en Lumière Beauty Studio.\nServicio: {service}\nFecha: {date}\nHorario: {time}\nNombre: {name}',
  },
  chat: {
    open: 'Abrir asistente virtual',
    close: 'Cerrar asistente virtual',
    title: 'Asistente Lumière',
    subtitle: 'Resuelve tus dudas sobre nuestros servicios',
    welcome:
      '¡Hola! Puedo ayudarte con información sobre servicios, precios y horarios. Selecciona uno o varios servicios o hazme una pregunta.',
    selectServices: 'Selecciona los servicios',
    selectionHelp: 'Selecciona uno o varios servicios.',
    selectedCount: 'seleccionados',
    priceFrom: 'Desde',
    inputLabel: 'Tu pregunta',
    placeholder: 'Escribe tu pregunta...',
    send: 'Enviar',
    sending: 'Respondiendo...',
    error: 'No se pudo obtener una respuesta en este momento. Inténtalo de nuevo o escríbenos por WhatsApp.',
    configurationError:
      'El asistente no está configurado por el momento. Escríbenos por WhatsApp para ayudarte.',
    rateLimitError:
      'El asistente está ocupado en este momento. Inténtalo de nuevo más tarde o escríbenos por WhatsApp.',
    whatsapp: 'Hablar por WhatsApp',
  },
}
