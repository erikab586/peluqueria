<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'
import { SERVICE_CATALOG } from '@/data/services'
import type { ServiceId } from '@/types'

type ChatStage =
  | 'menu'
  | 'booking-service'
  | 'booking-date'
  | 'booking-exact-date'
  | 'booking-name'
  | 'booking-whatsapp'
  | 'booking-done'
  | 'services'
  | 'location'
  | 'quote-notes'
  | 'quote-name'
  | 'quote-whatsapp'
  | 'quote-done'
  | 'lead-error'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
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

interface ChatAction {
  label: string
  value: string
}

const { t } = useI18n()
const isOpen = ref(false)
const isSending = ref(false)
const stage = ref<ChatStage>('menu')
const answer = ref('')
const selectedServiceId = ref<ServiceId | null>(null)
const preferredDate = ref('')
const name = ref('')
const whatsapp = ref('')
const notes = ref('')
const pendingLead = ref<LeadPayload | null>(null)
const showServiceDetails = ref(false)
const messages = ref<ChatMessage[]>([
  { role: 'assistant', content: t.value.chat.welcome },
])
const messageList = ref<HTMLElement | null>(null)

const serviceName = computed(() => {
  if (!selectedServiceId.value) return ''
  return t.value.services.items[selectedServiceId.value].name
})

const isTextStep = computed(() =>
  [
    'booking-exact-date',
    'booking-name',
    'booking-whatsapp',
    'quote-notes',
    'quote-name',
    'quote-whatsapp',
  ].includes(stage.value),
)

const inputPlaceholder = computed(() => {
  if (stage.value === 'booking-name' || stage.value === 'quote-name') return t.value.chat.inputName
  if (stage.value === 'booking-whatsapp' || stage.value === 'quote-whatsapp') {
    return t.value.chat.inputWhatsapp
  }
  if (stage.value === 'booking-exact-date') return t.value.chat.inputDate
  return t.value.chat.inputProject
})

const inputMaxLength = computed(() => {
  if (stage.value === 'booking-name' || stage.value === 'quote-name') return 120
  if (stage.value === 'booking-whatsapp' || stage.value === 'quote-whatsapp') return 40
  if (stage.value === 'booking-exact-date') return 160
  return 1000
})

const actions = computed<ChatAction[]>(() => {
  if (stage.value === 'menu') {
    return [
      { label: t.value.chat.menuBooking, value: 'booking' },
      { label: t.value.chat.menuServices, value: 'services' },
      { label: t.value.chat.menuLocation, value: 'location' },
      { label: t.value.chat.menuQuote, value: 'quote' },
    ]
  }

  if (stage.value === 'booking-service' || stage.value === 'services') {
    return [
      ...SERVICE_CATALOG.map((service) => ({
        label: `${t.value.services.items[service.id].name} · R$ ${service.price} · ${service.duration}`,
        value: `service:${service.id}`,
      })),
      { label: t.value.chat.serviceDifferent, value: 'quote' },
      ...(stage.value === 'services'
        ? [{ label: t.value.chat.serviceDetailsAction, value: 'details' }]
        : []),
    ]
  }

  if (stage.value === 'booking-date') {
    return [
      { label: t.value.chat.dateThisWeek, value: 'date:this-week' },
      { label: t.value.chat.dateNextWeek, value: 'date:next-week' },
      { label: t.value.chat.dateExact, value: 'date:exact' },
    ]
  }

  if (stage.value === 'location') {
    return [
      { label: t.value.chat.maps, value: 'maps' },
      { label: t.value.chat.bookVisit, value: 'booking' },
      { label: t.value.chat.backToMenu, value: 'menu' },
    ]
  }

  if (stage.value === 'booking-done' || stage.value === 'quote-done') {
    return [
      { label: t.value.chat.whatsappNow, value: 'whatsapp' },
      { label: t.value.chat.backToMenu, value: 'menu' },
    ]
  }

  if (stage.value === 'lead-error') {
    return [
      { label: t.value.chat.send, value: 'retry' },
      { label: t.value.chat.whatsappNow, value: 'whatsapp' },
      { label: t.value.chat.backToMenu, value: 'menu' },
    ]
  }

  return []
})

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Florian%C3%B3polis%2C%20SC'

function addMessage(role: ChatMessage['role'], content: string) {
  messages.value.push({ role, content })
}

function resetLead() {
  selectedServiceId.value = null
  preferredDate.value = ''
  name.value = ''
  whatsapp.value = ''
  notes.value = ''
  pendingLead.value = null
  showServiceDetails.value = false
}

function setStage(nextStage: ChatStage, prompt: string) {
  stage.value = nextStage
  addMessage('assistant', prompt)
}

function goToMenu() {
  resetLead()
  stage.value = 'menu'
  addMessage('assistant', t.value.chat.welcome)
}

function currentLead(): LeadPayload {
  return {
    nombre: name.value,
    whatsapp: whatsapp.value,
    intencion: stage.value.startsWith('quote') ? 'cotizar' : 'agendar',
    servicio_o_paquete: serviceName.value,
    fecha_preferida: preferredDate.value,
    notas: notes.value,
    origen_url: window.location.href,
  }
}

function createWhatsAppMessage(payload: LeadPayload) {
  const lines = [
    payload.intencion === 'agendar' ? t.value.chat.whatsappBooking : t.value.chat.whatsappQuote,
    payload.nombre ? `Nombre: ${payload.nombre}` : '',
    payload.whatsapp ? `WhatsApp: ${payload.whatsapp}` : '',
    payload.servicio_o_paquete
      ? `${t.value.chat.whatsappService}: ${payload.servicio_o_paquete}`
      : '',
    payload.fecha_preferida ? `${t.value.chat.whatsappDate}: ${payload.fecha_preferida}` : '',
    payload.notas ? `${t.value.chat.whatsappNotes}: ${payload.notas}` : '',
  ]

  return lines.filter(Boolean).join('\n')
}

const whatsappUrl = computed(() =>
  buildWhatsAppUrl(
    createWhatsAppMessage(stage.value === 'lead-error' && pendingLead.value ? pendingLead.value : currentLead()),
  ),
)

watch(
  messages,
  async () => {
    await nextTick()
    messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })
  },
  { deep: true },
)

watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
    messageList.value?.scrollTo({ top: messageList.value.scrollHeight })
  }
})

async function submitLead(payload: LeadPayload) {
  isSending.value = true
  pendingLead.value = payload
  let failureMessage = t.value.chat.leadError

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const errorBody: unknown = await response.json().catch(() => null)
      const code =
        typeof errorBody === 'object' &&
        errorBody !== null &&
        'code' in errorBody &&
        typeof errorBody.code === 'string'
          ? errorBody.code
          : ''

      if (import.meta.env.DEV && code === 'EMAIL_NOT_CONFIGURED') {
        failureMessage = t.value.chat.emailNotConfigured
      } else if (import.meta.env.DEV && code === 'EMAIL_SEND_FAILED') {
        failureMessage = t.value.chat.emailSendFailed
      }

      throw new Error(`Lead API returned ${response.status}${code ? ` (${code})` : ''}`)
    }

    stage.value = payload.intencion === 'agendar' ? 'booking-done' : 'quote-done'
    const successMessage =
      payload.intencion === 'agendar' ? t.value.chat.bookingSuccess : t.value.chat.quoteSuccess
    addMessage(
      'assistant',
      successMessage.replace('{name}', payload.nombre).replace('{service}', payload.servicio_o_paquete),
    )
  } catch (error) {
    console.error('Failed to submit chat lead:', error)
    stage.value = 'lead-error'
    addMessage('assistant', failureMessage)
  } finally {
    isSending.value = false
  }
}

async function handleAction(value: string) {
  if (isSending.value) return

  const action = actions.value.find((item) => item.value === value)
  if (action) addMessage('user', action.label)

  if (value === 'menu') {
    goToMenu()
  } else if (value === 'booking') {
    resetLead()
    setStage('booking-service', t.value.chat.chooseService)
  } else if (value === 'services') {
    resetLead()
    showServiceDetails.value = false
    addMessage('assistant', `${t.value.chat.servicesIntro}\n${t.value.chat.servicesQuestion}`)
    stage.value = 'services'
  } else if (value === 'location') {
    stage.value = 'location'
    addMessage('assistant', t.value.chat.locationInfo)
  } else if (value === 'quote') {
    resetLead()
    setStage('quote-notes', t.value.chat.quotePrompt)
  } else if (value === 'details') {
    showServiceDetails.value = !showServiceDetails.value
    const serviceDetails = SERVICE_CATALOG.map((service) => {
      const item = t.value.services.items[service.id]
      return `• ${item.name}: ${item.description}`
    }).join('\n')
    addMessage(
      'assistant',
      showServiceDetails.value
        ? `${serviceDetails}\n\n${t.value.chat.serviceDetails}`
        : t.value.chat.servicesQuestion,
    )
  } else if (value.startsWith('service:')) {
    const serviceId = value.slice('service:'.length) as ServiceId
    selectedServiceId.value = serviceId
    setStage('booking-date', t.value.chat.chooseDate)
  } else if (value.startsWith('date:')) {
    const dateChoice = value.slice('date:'.length)
    if (dateChoice === 'exact') {
      setStage('booking-exact-date', t.value.chat.exactDatePrompt)
    } else {
      preferredDate.value =
        dateChoice === 'this-week' ? t.value.chat.dateThisWeek : t.value.chat.dateNextWeek
      setStage('booking-name', t.value.chat.namePrompt)
    }
  } else if (value === 'maps') {
    window.open(mapsUrl, '_blank', 'noopener,noreferrer')
  } else if (value === 'whatsapp') {
    window.open(whatsappUrl.value, '_blank', 'noopener,noreferrer')
  } else if (value === 'retry' && pendingLead.value) {
    await submitLead(pendingLead.value)
  }
}

async function submitAnswer() {
  const content = answer.value.trim()
  if (!content || isSending.value) return

  if (stage.value === 'booking-name' || stage.value === 'quote-name') {
    if (content.length < 2) {
      addMessage('assistant', t.value.chat.invalidName)
      return
    }
    name.value = content
    addMessage('user', content)
    answer.value = ''
    if (stage.value === 'booking-name') {
      setStage('booking-whatsapp', t.value.chat.whatsappPrompt)
    } else {
      setStage('quote-whatsapp', t.value.chat.quoteWhatsappPrompt)
    }
    return
  }

  if (stage.value === 'booking-whatsapp' || stage.value === 'quote-whatsapp') {
    const digits = content.replace(/\D/g, '')
    if (digits.length < 8 || digits.length > 15) {
      addMessage('assistant', t.value.chat.invalidWhatsapp)
      return
    }
    whatsapp.value = content
    addMessage('user', content)
    answer.value = ''
    await submitLead(currentLead())
    return
  }

  addMessage('user', content)
  answer.value = ''
  if (stage.value === 'booking-exact-date') {
    preferredDate.value = content
    setStage('booking-name', t.value.chat.namePrompt)
  } else if (stage.value === 'quote-notes') {
    notes.value = content
    setStage('quote-name', t.value.chat.quoteNamePrompt)
  }
}
</script>

<template>
  <div class="chat-widget">
    <section v-if="isOpen" class="chat-panel" :aria-label="t.chat.title">
      <header class="chat-header">
        <div>
          <h2>{{ t.chat.title }}</h2>
          <p>{{ t.chat.subtitle }}</p>
        </div>
        <button class="home-button" type="button" :disabled="isSending" @click="goToMenu">
          {{ t.chat.restart }}
        </button>
        <button
          class="close-button"
          type="button"
          :aria-label="t.chat.close"
          @click="isOpen = false"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="m6 6 12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </header>

      <div ref="messageList" class="message-list" role="log" aria-live="polite">
        <template v-for="(message, index) in messages" :key="index">
          <article class="message" :class="`message-${message.role}`">
            {{ message.content }}
          </article>
        </template>
        <div v-if="actions.length" class="action-list" :aria-label="t.chat.optionsLabel">
          <button
            v-for="action in actions"
            :key="action.value"
            class="action-button"
            type="button"
            :disabled="isSending"
            @click="handleAction(action.value)"
          >
            {{ action.label }}
          </button>
        </div>
        <p v-if="isSending" class="sending-indicator" aria-live="polite">
          {{ t.chat.sending }}
        </p>
      </div>

      <form v-if="isTextStep" class="composer" @submit.prevent="submitAnswer">
        <label class="visually-hidden" for="chat-question">{{ t.chat.inputLabel }}</label>
        <input
          id="chat-question"
          v-model="answer"
          type="text"
          :maxlength="inputMaxLength"
          :placeholder="inputPlaceholder"
          :disabled="isSending"
        />
        <button type="submit" :disabled="isSending || !answer.trim()">
          {{ isSending ? t.chat.sending : t.chat.send }}
        </button>
      </form>

      <a class="whatsapp-link" :href="whatsappUrl" target="_blank" rel="noopener noreferrer">
        {{ t.chat.whatsappNow }}
      </a>
    </section>

    <button
      class="chat-launcher"
      type="button"
      :aria-label="isOpen ? t.chat.close : t.chat.open"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <svg v-if="!isOpen" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.4A7.5 7.5 0 1 1 20 11.5Z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.8"
        />
        <circle cx="9" cy="11.5" r="1" fill="currentColor" />
        <circle cx="12.5" cy="11.5" r="1" fill="currentColor" />
        <circle cx="16" cy="11.5" r="1" fill="currentColor" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          d="m6 6 12 12M18 6 6 18"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.chat-widget {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.chat-launcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-ink);
  box-shadow: 0 12px 32px rgba(18, 18, 18, 0.2);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.chat-launcher:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(18, 18, 18, 0.26);
}

.chat-launcher:focus-visible,
.close-button:focus-visible,
.home-button:focus-visible,
.action-button:focus-visible,
.composer button:focus-visible,
.whatsapp-link:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 3px;
}

.chat-panel {
  display: flex;
  flex-direction: column;
  width: min(390px, calc(100vw - 32px));
  height: min(690px, calc(100dvh - 104px));
  max-height: min(690px, calc(100dvh - 104px));
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 18px;
  background: var(--color-card);
  color: var(--color-ink);
  box-shadow: 0 18px 60px rgba(18, 18, 18, 0.24);
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 16px;
  background: var(--color-ink);
  color: var(--color-white);
  flex-shrink: 0;
}

.chat-header h2 {
  font-size: 1rem;
  font-weight: 600;
}

.chat-header p {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.78rem;
}

.home-button {
  margin-left: auto;
  padding: 7px 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.7rem;
  white-space: nowrap;
}

.home-button:hover {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-ink);
}

.close-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
}

.close-button:hover {
  background: var(--color-accent);
  color: var(--color-ink);
}

.message-list {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  background: var(--color-bg);
}

.message {
  max-width: 88%;
  padding: 10px 12px;
  border-radius: 14px;
  font-size: 0.86rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.message-assistant {
  align-self: flex-start;
  border: 1px solid var(--color-line);
  background: var(--color-card);
}

.message-user {
  align-self: flex-end;
  background: var(--color-accent);
  color: var(--color-ink);
}

.sending-indicator {
  align-self: flex-start;
  color: var(--color-ink-muted);
  font-size: 0.8rem;
}

.action-list {
  display: grid;
  gap: 7px;
  width: min(100%, 310px);
  margin-top: 2px;
  align-self: flex-start;
}

.action-button {
  padding: 9px 12px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-card);
  color: var(--color-ink);
  text-align: left;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}

.action-button:not(:disabled):hover,
.action-button:not(:disabled):focus-visible,
.action-button:not(:disabled):active {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-ink);
}

.action-button:focus-visible {
  outline: 2px solid var(--color-accent-dark);
  outline-offset: 2px;
}

.action-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.composer {
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid var(--color-line);
}

.composer input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-bg);
  color: var(--color-white);
  caret-color: var(--color-white);
  font: inherit;
  font-size: 0.83rem;
}

.composer input::placeholder {
  color: rgba(255, 255, 255, 0.72);
  opacity: 1;
}

.composer button {
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: var(--color-ink);
  color: var(--color-white);
  font-size: 0.78rem;
  font-weight: 600;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.composer button:not(:disabled):hover,
.composer button:not(:disabled):focus-visible,
.composer button:not(:disabled):active {
  background: var(--color-accent);
  color: var(--color-ink);
}

.composer button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.whatsapp-link {
  align-self: center;
  flex-shrink: 0;
  margin: 0 0 12px;
  color: var(--color-ink-muted);
  font-size: 0.76rem;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 480px) {
  .chat-widget {
    right: 12px;
    bottom: 12px;
  }

  .chat-panel {
    height: calc(100dvh - 86px);
    max-height: calc(100dvh - 86px);
  }

  .message-list {
    padding: 12px;
  }
}

@media (max-height: 560px) {
  .chat-panel {
    height: calc(100dvh - 86px);
    max-height: calc(100dvh - 86px);
  }

  .chat-header {
    padding-block: 12px;
  }

}

@media (min-width: 900px) {
  .chat-widget {
    right: 24px;
    bottom: 24px;
  }
}
</style>
