import type { IncomingMessage, ServerResponse } from 'node:http'
import nodemailer from 'nodemailer'

interface ApiRequest extends IncomingMessage {
  body?: unknown
}

interface ApiResponse extends ServerResponse {
  status(statusCode: number): ApiResponse
  json(body: { error?: string; code: string }): ApiResponse
}

interface LeadPayload {
  nombre: string
  whatsapp: string
  intencion: 'agendar' | 'cotizar'
  servicio_o_paquete: string
  fecha_preferida: string
  notas: string
  origen_url: string
}

interface LeadResult {
  status: number
  body: { error?: string; code: string }
}

const TEST_RECIPIENT = 'yosoyproferika@gmail.com'

function isLeadPayload(value: unknown): value is LeadPayload {
  if (typeof value !== 'object' || value === null) return false

  const body = value as Record<string, unknown>
  const stringFields = [
    'nombre',
    'whatsapp',
    'servicio_o_paquete',
    'fecha_preferida',
    'notas',
    'origen_url',
  ]
  if (
    Object.keys(body).length !== stringFields.length + 1 ||
    stringFields.some((field) => typeof body[field] !== 'string') ||
    (body.intencion !== 'agendar' && body.intencion !== 'cotizar')
  ) {
    return false
  }

  const limits: Record<string, number> = {
    nombre: 120,
    whatsapp: 40,
    servicio_o_paquete: 120,
    fecha_preferida: 160,
    notas: 1000,
    origen_url: 2048,
  }
  if (stringFields.some((field) => (body[field] as string).length > limits[field])) {
    return false
  }

  const phoneDigits = (body.whatsapp as string).replace(/\D/g, '')
  if (
    (body.nombre as string).trim().length < 2 ||
    phoneDigits.length < 8 ||
    phoneDigits.length > 15 ||
    (body.intencion === 'agendar' && !(body.servicio_o_paquete as string).trim()) ||
    (body.intencion === 'cotizar' && !(body.notas as string).trim())
  ) {
    return false
  }

  try {
    const origin = new URL(body.origen_url as string)
    return origin.protocol === 'http:' || origin.protocol === 'https:'
  } catch {
    return false
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

export async function processLeadRequest(method: string, body: unknown): Promise<LeadResult> {
  if (method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' } }
  }

  if (!isLeadPayload(body)) {
    return { status: 400, body: { error: 'Invalid lead payload', code: 'INVALID_LEAD' } }
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD?.replace(/\s/g, '')
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !password) {
    return {
      status: 503,
      body: { error: 'Email delivery is not configured', code: 'EMAIL_NOT_CONFIGURED' },
    }
  }

  const labels = {
    nombre: 'Nombre',
    whatsapp: 'WhatsApp',
    intencion: 'Intención',
    servicio_o_paquete: 'Servicio o paquete',
    fecha_preferida: 'Fecha preferida',
    notas: 'Notas',
    origen_url: 'Página de origen',
  }
  const rows = Object.entries(labels).map(([field, label]) => {
    const value = body[field as keyof LeadPayload] || '—'
    return `${label}: ${value}`
  })
  const subject = `Nueva solicitud Lumière: ${body.intencion}`
  const text = rows.join('\n')
  const html = rows
    .map((row) => `<p>${escapeHtml(row)}</p>`)
    .join('')

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    })

    await transporter.sendMail({
      from: user,
      to: process.env.LEAD_EMAIL_TO || TEST_RECIPIENT,
      subject,
      text,
      html,
    })

    return { status: 200, body: { code: 'LEAD_EMAIL_SENT' } }
  } catch (error) {
    console.error('Failed to send lead email:', error)
    return { status: 502, body: { error: 'Could not send lead email', code: 'EMAIL_SEND_FAILED' } }
  }
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const result = await processLeadRequest(request.method ?? '', request.body)
  response.status(result.status).json(result.body)
}
