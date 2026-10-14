# Lumière Beauty Studio

Landing page demo (frontend estático) para un salón de belleza ficticio. Pensada como pieza de portafolio para mostrar a peluquerías reales.

## Stack

- Vue 3
- Vite
- TypeScript
- SCSS
- `@lucide/vue`

Sin backend, base de datos ni Vue Router.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Chat con Gemini

El chat usa la función de servidor `api/chat.ts`; la clave de Gemini solo se lee en el servidor.
En Vercel, configura `GEMINI_API_KEY` en **Project Settings → Environment Variables** y vuelve
a desplegar. No añadas la clave al código ni a variables `VITE_*`.

Para probar el chat localmente, ejecuta el proyecto con Vercel CLI (`vercel dev`) y define
`GEMINI_API_KEY` en el entorno local. `npm run dev` inicia solo Vite y no sirve la función `/api/chat`.

## Personalización rápida

- Identidad visual: `src/styles/tokens.css`
- Textos PT/ES: `src/data/pt-BR.ts` y `src/data/es.ts`
- WhatsApp demo: `WHATSAPP_NUMBER` en `src/constants.ts`

El idioma inicial es portugués (PT-BR) y se guarda en `localStorage`.
# peluqueria
