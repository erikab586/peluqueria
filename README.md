# Lumière Beauty Studio

Landing page demo para un salón de belleza ficticio, pensada como pieza de portafolio para mostrar a peluquerías reales.

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

## Chat y captura de solicitudes

El asistente ofrece flujos guiados para agendar, consultar servicios y precios, ver ubicación y
horarios, o solicitar una cotización. El catálogo y sus precios salen de `src/data/services.ts`.
Al completar una solicitud, `/api/lead` envía el JSON
`{ nombre, whatsapp, intencion, servicio_o_paquete, fecha_preferida, notas, origen_url }`
al correo configurado. El destinatario de prueba es `yosoyproferika@gmail.com`.

Para probar localmente, copia `.env.example` como `.env` y configura la contraseña de aplicación
de Gmail en `SMTP_PASSWORD`. Gmail requiere verificación en dos pasos y una contraseña de aplicación;
no uses la contraseña normal de tu cuenta. Puedes pegar la clave con los espacios que muestra Google;
el servidor los quita antes de autenticar. Guarda la clave solo en `.env`, nunca en `.env.example` o
en el repositorio. El envío se realiza desde el servidor y las variables secretas no se exponen al
navegador. Vite expone `/api/lead` solo durante `npm run dev`; en producción, configura las mismas
variables en el entorno del despliegue (por ejemplo Vercel).

Si falta la configuración SMTP o el servidor de correo rechaza el envío, el chat informa que no
pudo registrar la solicitud y ofrece continuar por WhatsApp.

La información del proyecto solo especifica Florianópolis - SC y el horario de lunes a sábado,
09:00 a 19:00. El chat no inventa una dirección exacta ni paquetes que no estén definidos.

## Personalización rápida

- Identidad visual: `src/styles/tokens.css`
- Textos PT/ES: `src/data/pt-BR.ts` y `src/data/es.ts`
- WhatsApp demo: `WHATSAPP_NUMBER` en `src/constants.ts`

El idioma inicial es portugués (PT-BR) y se guarda en `localStorage`.
# peluqueria
