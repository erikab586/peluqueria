import { ApiError, GoogleGenAI } from '@google/genai'
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

function buildSystemInstruction(locale: Locale, serviceIds: ServiceId[]) {
  const availableServices = SERVICE_CATALOG.map((service) => {
    const details = SERVICE_TRANSLATIONS[service.id][locale]
    return `- ${details.name}: ${details.description} Precio inicial: R$ ${service.price}. Duración estimada: ${service.duration}.`
  }).join('\n')

  const selectedServices = serviceIds.length
    ? serviceIds
        .map((id) => SERVICE_TRANSLATIONS[id][locale].name)
        .join(', ')
    : 'No hay servicios seleccionados.'

  const language = locale === 'es' ? 'español' : 'portugués brasileño'

  return `Eres el asistente virtual comercial de Lumière Beauty Studio, un salón de belleza en Florianópolis, SC.
Responde siempre en ${language}, con un tono elegante, profesional, atento y cercano. Sé conciso y limita tus respuestas a 2 o 3 párrafos cortos.

Información confirmada:
- Servicios, descripciones, precios iniciales y duraciones:
${availableServices}
- Horario: lunes a sábado, de 09:00 a 19:00.
- Ubicación: Florianópolis - SC.
- Sitio: https://lumierestudio-three.vercel.app/
- El cliente seleccionó: ${selectedServices}

Usa solo la información confirmada de arriba. Los precios son valores iniciales y pueden variar según la evaluación del servicio; no prometas un total combinado ni un precio final. No inventes disponibilidad, promociones, políticas, datos de contacto ni información técnica. Si no tienes suficiente información, dilo claramente y sugiere continuar por WhatsApp desde el chat. No confirmes citas ni afirmes que una reserva fue realizada.`
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

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured')
    response.status(503).json({
      error: 'Chat service is not configured',
      code: 'GEMINI_API_KEY_MISSING',
    })
    return
  }

  try {
    const ai = new GoogleGenAI({ apiKey })
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: buildSystemInstruction(body.locale, body.serviceIds),
      },
      contents: body.messages.map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: message.content }],
      })),
    })

    const reply = result.text?.trim()
    if (!reply) {
      console.error('Gemini returned an empty chat response')
      response.status(502).json({ error: 'Empty response from chat service' })
      return
    }

    response.status(200).json({ reply })
  } catch (error) {
    if (error instanceof ApiError) {
      const providerMessage = error.message.replaceAll(apiKey, '[REDACTED]').slice(0, 500)
      console.error(`Gemini API returned ${error.status}: ${providerMessage}`)

      if (error.status === 401 || error.status === 403) {
        response.status(503).json({
          error: 'Gemini API credentials are invalid or not authorized',
          code: 'GEMINI_API_KEY_REJECTED',
        })
        return
      }

      if (error.status === 429) {
        response.status(503).json({
          error: 'Gemini API quota or rate limit exceeded',
          code: 'GEMINI_RATE_LIMITED',
        })
        return
      }
    } else if (error instanceof Error) {
      console.error('Gemini chat request failed:', error.message)
    } else {
      console.error('Gemini chat request failed with a non-error value')
    }

    response.status(502).json({
      error: 'Unable to generate a chat response',
      code: 'GEMINI_REQUEST_FAILED',
    })
  }
}
