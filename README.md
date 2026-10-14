# Lumière Beauty Studio

Landing page demo para un salón de belleza ficticio, pensada como pieza de portafolio para mostrar a peluquerías reales. El chat responde mediante una función serverless con información local.

## Stack

- Vue 3
- Vite
- TypeScript
- SCSS
- `@lucide/vue`

Sin base de datos ni Vue Router.

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

## Chat con información del catálogo

El chat usa respuestas predefinidas en `api/chat.ts`, basadas en los servicios, descripciones,
precios y duraciones de `src/data/services.ts`. No requiere una clave de IA ni genera respuestas
fuera de la información disponible. En producción, la función `/api/chat` se sirve desde Vercel;
`npm run dev` inicia solo Vite y no sirve esa función.

## Personalización rápida

- Identidad visual: `src/styles/tokens.css`
- Textos PT/ES: `src/data/pt-BR.ts` y `src/data/es.ts`
- WhatsApp demo: `WHATSAPP_NUMBER` en `src/constants.ts`

El idioma inicial es portugués (PT-BR) y se guarda en `localStorage`.
# peluqueria
