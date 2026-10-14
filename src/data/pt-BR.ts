import type { Translations } from '@/types'
import { SERVICE_TRANSLATIONS } from './services'

export const ptBR: Translations = {
  seo: {
    title: 'Lumière Beauty Studio | Salão de Beleza',
    description: 'Cuidados, beleza e estilo em um espaço pensado para você.',
  },
  skipLink: 'Ir para o conteúdo',
  nav: {
    home: 'Início',
    services: 'Serviços',
    gallery: 'Galeria',
    about: 'Sobre',
    contact: 'Contato',
    book: 'Agendar horário',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  language: {
    label: 'Selecionar idioma',
    pt: 'PT',
    es: 'ES',
  },
  hero: {
    titleLine1: 'Sua beleza,',
    titleLine2: 'seu momento.',
    subtitle:
      'Um espaço criado para cuidar do seu cabelo, valorizar sua beleza e transformar cada visita em uma experiência especial.',
    ctaBook: 'Agendar horário',
    ctaWhatsapp: 'Falar no WhatsApp',
    badge: 'Beleza • Cuidado • Estilo',
    imageAlt: 'Retrato editorial de uma mulher com cabelo cuidado e iluminado',
  },
  services: {
    eyebrow: '01 / Serviços',
    title: 'Nossos serviços',
    subtitle: 'Cuidados pensados para valorizar sua beleza.',
    from: 'A partir de',
    book: 'Agendar',
    filters: {
      all: 'Todos',
      hair: 'Cabelos',
      nails: 'Unhas',
      treatments: 'Tratamentos',
    },
    items: {
      cut: SERVICE_TRANSLATIONS.cut['pt-BR'],
      blowout: SERVICE_TRANSLATIONS.blowout['pt-BR'],
      hydration: SERVICE_TRANSLATIONS.hydration['pt-BR'],
      color: SERVICE_TRANSLATIONS.color['pt-BR'],
      highlights: SERVICE_TRANSLATIONS.highlights['pt-BR'],
      straightening: SERVICE_TRANSLATIONS.straightening['pt-BR'],
      manicure: SERVICE_TRANSLATIONS.manicure['pt-BR'],
      pedicure: SERVICE_TRANSLATIONS.pedicure['pt-BR'],
    },
  },
  about: {
    eyebrow: '02 / O espaço',
    title: 'Um espaço pensado para você',
    text: 'Na Lumière, acreditamos que cuidar da beleza também é reservar um momento para si.',
    imageAlt: 'Interior moderno e luminoso de um salão de beleza',
    stats: [
      { value: '+500', label: 'Atendimentos' },
      { value: '+8', label: 'Serviços' },
      { value: '5★', label: 'Experiência' },
    ],
  },
  gallery: {
    eyebrow: '03 / Galeria',
    title: 'Beleza em detalhes',
    subtitle: 'Uma seleção visual para apresentar a estética da marca.',
    categories: {
      hair: 'Cabelos',
      color: 'Coloração',
      highlights: 'Mechas',
      nails: 'Unhas',
    },
    alts: {
      g1: 'Cabelo castanho com ondas e brilho em luz quente',
      g2: 'Processo de coloração em um salão sofisticado',
      g3: 'Mechas caramelo com acabamento editorial',
      g4: 'Detalhe de unhas com esmaltação elegante',
      g5: 'Cabelo escuro com brilho e movimento',
      g6: 'Coloração ruiva em close sofisticado',
      g7: 'Iluminação loira-caramelo nos fios',
      g8: 'Manicure em tons neutros e refinados',
    },
  },
  benefits: {
    eyebrow: '04 / Diferenciais',
    title: 'Por que escolher a Lumière?',
    items: [
      {
        icon: 'heart',
        title: 'Atendimento personalizado',
        text: 'Cada detalhe pensado para você.',
      },
      {
        icon: 'award',
        title: 'Profissionais especializados',
        text: 'Experiência e cuidado em cada serviço.',
      },
      {
        icon: 'leaf',
        title: 'Produtos de qualidade',
        text: 'Selecionamos produtos para cuidar da saúde dos seus cabelos.',
      },
      {
        icon: 'sun',
        title: 'Ambiente acolhedor',
        text: 'Um espaço para relaxar e aproveitar seu momento.',
      },
    ],
  },
  testimonials: {
    eyebrow: '05 / Avaliações',
    title: 'O que nossas clientes dizem',
    demoNote: 'Depoimentos demonstrativos para apresentação do projeto.',
    items: [
      {
        quote:
          'Adorei o atendimento e o resultado. Meu cabelo ficou exatamente como eu imaginava.',
        name: 'Camila R.',
      },
      {
        quote:
          'Um ambiente lindo, atendimento impecável e profissionais muito atenciosos.',
        name: 'Helena M.',
      },
      {
        quote: 'Foi uma experiência maravilhosa. Com certeza vou voltar.',
        name: 'Sofia L.',
      },
    ],
  },
  booking: {
    eyebrow: '06 / Agenda',
    title: 'Agende seu horário',
    subtitle: 'Reserve seu momento em poucos passos. Entraremos em contato para confirmar.',
    demoNote: 'Demonstração estática. Nenhum agendamento real será registrado.',
    steps: ['Escolha o serviço', 'Escolha a data', 'Escolha o horário', 'Seus dados'],
    next: 'Continuar',
    back: 'Voltar',
    fields: {
      service: 'Serviço',
      date: 'Data',
      time: 'Horário',
      name: 'Nome',
      whatsapp: 'WhatsApp',
    },
    placeholders: {
      name: 'Seu nome',
      whatsapp: '(48) 99999-0000',
    },
    confirm: 'Confirmar agendamento',
    modalTitle: 'Seu horário foi solicitado!',
    modalText: 'Entraremos em contato pelo WhatsApp para confirmar seu atendimento.',
    modalWhatsapp: 'Falar pelo WhatsApp',
    modalClose: 'Fechar',
    errors: {
      service: 'Selecione um serviço para continuar.',
      date: 'Escolha uma data disponível.',
      time: 'Escolha um horário.',
      name: 'Informe seu nome.',
      whatsapp: 'Informe um WhatsApp válido.',
    },
  },
  cta: {
    title: 'Pronta para transformar seu visual?',
    text: 'Reserve seu momento de beleza.',
    book: 'Agendar horário',
    whatsapp: 'Falar no WhatsApp',
  },
  footer: {
    tagline: 'Beleza, cuidado e estilo.',
    location: 'Florianópolis - SC',
    hoursLabel: 'Horário',
    hours: 'Segunda a sábado, 09:00 às 19:00',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    copyright: '© 2026 Lumière Beauty Studio — Demo',
  },
  whatsapp: {
    ariaLabel: 'Conversar no WhatsApp',
    defaultMessage: 'Olá! Gostaria de agendar um horário na Lumière Beauty Studio.',
    bookingMessage:
      'Olá! Gostaria de agendar um horário na Lumière Beauty Studio.\nServiço: {service}\nData: {date}\nHorário: {time}\nNome: {name}',
  },
  chat: {
    open: 'Abrir assistente virtual',
    close: 'Fechar assistente virtual',
    title: 'Assistente Lumière',
    subtitle: 'Tire suas dúvidas sobre nossos serviços',
    welcome:
      'Olá! Posso ajudar com informações sobre serviços, valores e horários. Selecione um ou mais serviços ou me faça uma pergunta.',
    selectServices: 'Selecione os serviços',
    selectionHelp: 'Selecione um ou vários serviços.',
    selectedCount: 'selecionados',
    priceFrom: 'A partir de',
    inputLabel: 'Sua pergunta',
    placeholder: 'Escreva sua pergunta...',
    send: 'Enviar',
    sending: 'Respondendo...',
    error: 'Não foi possível obter uma resposta agora. Tente novamente ou fale conosco pelo WhatsApp.',
    configurationError:
      'O assistente não está configurado no momento. Fale conosco pelo WhatsApp para receber ajuda.',
    rateLimitError:
      'O assistente está ocupado agora. Tente novamente mais tarde ou fale conosco pelo WhatsApp.',
    whatsapp: 'Falar pelo WhatsApp',
  },
}
