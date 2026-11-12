import { fileURLToPath, URL } from 'node:url'
import type { IncomingMessage, ServerResponse } from 'node:http'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { processLeadRequest } from './api/lead.js'

function localLeadApi(): Plugin {
  return {
    name: 'local-lead-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/lead', (request: IncomingMessage, response: ServerResponse) => {
        const respond = (status: number, body: { error?: string; code: string }) => {
          response.statusCode = status
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(JSON.stringify(body))
        }

        if (request.method !== 'POST') {
          void processLeadRequest(request.method ?? '', undefined).then(({ status, body }) => {
            respond(status, body)
          })
          return
        }

        request.setEncoding('utf8')
        let rawBody = ''
        let bodyTooLarge = false
        request.on('data', (chunk: string) => {
          if (bodyTooLarge) return
          rawBody += chunk
          if (rawBody.length > 10_000) {
            bodyTooLarge = true
            respond(413, { error: 'Request body too large', code: 'BODY_TOO_LARGE' })
            request.destroy()
          }
        })
        request.on('end', () => {
          if (bodyTooLarge) return
          let body: unknown
          try {
            body = JSON.parse(rawBody)
          } catch {
            respond(400, { error: 'Invalid JSON body', code: 'INVALID_JSON' })
            return
          }

          void processLeadRequest('POST', body).then(({ status, body: resultBody }) => {
            if (!response.writableEnded) respond(status, resultBody)
          })
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'LEAD_EMAIL_TO']) {
    if (env[key]) process.env[key] = env[key]
  }

  return {
    base: './',
    plugins: [vue(), localLeadApi()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
