import type { Translations } from '@/types'

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
      cut: {
        name: 'Corte femenino',
        description: 'Corte a medida para realzar el movimiento y el óvalo de tu rostro.',
      },
      blowout: {
        name: 'Brushing',
        description: 'Acabado elegante, con brillo y caída natural.',
      },
      hydration: {
        name: 'Hidratación',
        description: 'Tratamiento profundo para devolver suavidad, salud y luminosidad.',
      },
      color: {
        name: 'Coloración',
        description: 'Color preciso y sofisticado, pensado para la salud del cabello.',
      },
      highlights: {
        name: 'Mechas',
        description: 'Iluminación sutil o marcada, con un resultado de salón editorial.',
      },
      straightening: {
        name: 'Alisado progresivo',
        description: 'Alisado controlado para un look alineado y duradero.',
      },
      manicure: {
        name: 'Manicura',
        description: 'Cuidado de uñas con un acabado limpio y elegante.',
      },
      pedicure: {
        name: 'Pedicura',
        description: 'Bienestar y acabado refinado para los pies.',
      },
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
}
