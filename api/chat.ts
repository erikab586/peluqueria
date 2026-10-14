import type { IncomingMessage, ServerResponse } from 'node:http'
import { SERVICE_CATALOG, SERVICE_TRANSLATIONS } from '../src/data/services.js'
import type { Locale, ServiceId } from '../src/types/index.js'

interface ApiRequest extends IncomingMessage {
  body?: unknown
}

interface ApiResponse extends ServerResponse {
  status(statusCode: number): ApiResponse
  json(body: { error?: string; code?: string; reply?: string }): ApiResponse
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequestBody {
  locale: Locale
  serviceIds: ServiceId[]
  messages: ChatMessage[]
}

function isChatRequestBody(value: unknown): value is ChatRequestBody {
  if (typeof value !== 'object' || value === null) return false

  const body = value as Record<string, unknown>
  if (
    (body.locale !== 'es' && body.locale !== 'pt-BR') ||
    !Array.isArray(body.serviceIds) ||
    body.serviceIds.length > SERVICE_CATALOG.length ||
    !Array.isArray(body.messages) ||
    body.messages.length === 0 ||
    body.messages.length > 12
  ) {
    return false
  }

  if (
    body.serviceIds.some(
      (id) => typeof id !== 'string' || !SERVICE_CATALOG.some((service) => service.id === id),
    ) ||
    new Set(body.serviceIds).size !== body.serviceIds.length
  ) {
    return false
  }

  if (!body.messages.every((message) => {
    if (
      typeof message !== 'object' ||
      message === null ||
      !('role' in message) ||
      !('content' in message)
    ) {
      return false
    }

    return (
      (message.role === 'user' || message.role === 'assistant') &&
      typeof message.content === 'string' &&
      message.content.trim().length > 0 &&
      message.content.length <= 1000
    )
  })) {
    return false
  }

  const lastMessage = body.messages[body.messages.length - 1]
  return (
    typeof lastMessage === 'object' &&
    lastMessage !== null &&
    'role' in lastMessage &&
    lastMessage.role === 'user'
  )
}

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function formatService(serviceId: ServiceId, locale: Locale): string {
  const service = SERVICE_CATALOG.find(({ id }) => id === serviceId)
  if (!service) return ''
  const details = SERVICE_TRANSLATIONS[serviceId][locale]

  return `- ${details.name}: ${details.description} R$ ${service.price} (${service.duration}).`
}

function generatePredefinedReply(
  locale: Locale,
  serviceIds: ServiceId[],
  userQuery: string,
): string {
  const query = normalizeText(userQuery)
  const isSpanish = locale === 'es'
  const words = query.split(/\W+/u)
  const includesAny = (...terms: string[]) =>
    terms.some((term) =>
      words.some((word) => word === term || (term.length >= 5 && word.startsWith(term))),
    )

  if (
    includesAny(
      'horario',
      'hora',
      'abierto',
      'aberta',
      'funcionamento',
      'atendimento',
      'open',
    )
  ) {
    return isSpanish
      ? 'Atendemos de lunes a sábado, de 09:00 a 19:00. Para coordinar una cita, puedes escribirnos por WhatsApp.'
      : 'Atendemos de segunda a sábado, das 09:00 às 19:00. Para combinar um horário, fale conosco pelo WhatsApp.'
  }

  if (
    includesAny(
      'ubicacion',
      'donde',
      'direccion',
      'localizacao',
      'onde',
      'endereco',
      'address',
    )
  ) {
    return isSpanish
      ? 'Estamos en Florianópolis, SC. Puedes conocer más en nuestro sitio: https://lumierestudio-three.vercel.app/'
      : 'Estamos em Florianópolis, SC. Saiba mais em nosso site: https://lumierestudio-three.vercel.app/'
  }

  if (
    includesAny(
      'reserva',
      'cita',
      'agendar',
      'agendamento',
      'marcar',
      'appointment',
    )
  ) {
    return isSpanish
      ? 'Para confirmar y coordinar tu cita, escríbenos directamente por WhatsApp.'
      : 'Para confirmar e combinar seu horário, fale diretamente conosco pelo WhatsApp.'
  }

  const matchingServices = SERVICE_CATALOG.filter((service) => {
    const serviceName = normalizeText(SERVICE_TRANSLATIONS[service.id][locale].name)
    return query.includes(serviceName) || words.includes(serviceName.split(' ')[0])
  })
  const requestedServices = matchingServices.length
    ? matchingServices.map(({ id }) => id)
    : serviceIds

  if (
    requestedServices.length &&
    (matchingServices.length > 0 ||
      includesAny(
        'precio',
        'cuanto',
        'costo',
        'preco',
        'quanto',
        'valor',
        'servicio',
        'servico',
        'duracion',
        'dura',
        'tempo',
      ))
  ) {
    const serviceDetails = requestedServices
      .map((id) => formatService(id, locale))
      .join('\n')

    return isSpanish
      ? `Información de los servicios:\n${serviceDetails}\n\nLos precios son iniciales y pueden variar según la evaluación. Para confirmar los detalles, contáctanos por WhatsApp.`
      : `Informações dos serviços:\n${serviceDetails}\n\nOs valores são iniciais e podem variar após uma avaliação. Para confirmar os detalhes, fale conosco pelo WhatsApp.`
  }

  if (includesAny('precio', 'cuanto', 'costo', 'preco', 'quanto', 'valor', 'duracion', 'dura', 'tempo')) {
    return isSpanish
      ? 'Los precios dependen del servicio y son valores iniciales. ¿Qué servicio te interesa?'
      : 'Os valores dependem do serviço e são preços iniciais. Qual serviço você gostaria de consultar?'
  }

  if (includesAny('servicio', 'servicios', 'servico', 'servicos')) {
    const serviceList = SERVICE_CATALOG.map((service) => formatService(service.id, locale)).join('\n')
    return isSpanish
      ? `Estos son nuestros servicios:\n${serviceList}\n\nLos precios son iniciales y pueden variar según la evaluación.`
      : `Estes são nossos serviços:\n${serviceList}\n\nOs valores são iniciais e podem variar após uma avaliação.`
  }

  return isSpanish
    ? 'Puedo ayudarte con información sobre servicios, precios, horarios y ubicación. Si tienes una consulta específica, escríbenos por WhatsApp.'
    : 'Posso ajudar com informações sobre serviços, valores, horários e localização. Se tiver uma dúvida específica, fale conosco pelo WhatsApp.'
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = request.body
  if (!isChatRequestBody(body)) {
    response.status(400).json({ error: 'Invalid chat request' })
    return
  }

  const lastMessage = body.messages[body.messages.length - 1]
  const reply = generatePredefinedReply(body.locale, body.serviceIds, lastMessage.content)
  response.status(200).json({ reply })
}
