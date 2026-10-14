<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'
import { SERVICE_CATALOG, SERVICE_TRANSLATIONS } from '@/data/services'
import type { ServiceId } from '@/types'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const { locale, t } = useI18n()
const isOpen = ref(false)
const isSending = ref(false)
const hasError = ref(false)
const question = ref('')
const selectedServiceIds = ref<ServiceId[]>([])
const messages = ref<ChatMessage[]>([
  { role: 'assistant', content: t.value.chat.welcome },
])
const messageList = ref<HTMLElement | null>(null)

const whatsappUrl = computed(() => {
  const selected = SERVICE_CATALOG.filter((service) =>
    selectedServiceIds.value.includes(service.id),
  )
    .map((service) => SERVICE_TRANSLATIONS[service.id][locale.value].name)
    .join(', ')

  const message = selected
    ? `${t.value.whatsapp.defaultMessage}\n${t.value.chat.selectServices}: ${selected}`
    : t.value.whatsapp.defaultMessage

  return buildWhatsAppUrl(message)
})

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

function toggleService(serviceId: ServiceId) {
  selectedServiceIds.value = selectedServiceIds.value.includes(serviceId)
    ? selectedServiceIds.value.filter((id) => id !== serviceId)
    : [...selectedServiceIds.value, serviceId]
}

async function sendMessage() {
  const content = question.value.trim()
  if (!content || isSending.value) return

  const history = messages.value
    .slice(1)
    .slice(-10)
    .map(({ role, content: messageContent }) => ({ role, content: messageContent }))
  if (history[0]?.role === 'assistant') history.shift()

  messages.value.push({ role: 'user', content })
  question.value = ''
  hasError.value = false
  isSending.value = true

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale: locale.value,
        serviceIds: selectedServiceIds.value,
        messages: [...history, { role: 'user', content }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Chat API returned ${response.status}`)
    }

    const result: unknown = await response.json()
    if (
      typeof result !== 'object' ||
      result === null ||
      !('reply' in result) ||
      typeof result.reply !== 'string' ||
      result.reply.trim() === ''
    ) {
      throw new Error('Chat API returned an invalid response')
    }

    messages.value.push({ role: 'assistant', content: result.reply })
  } catch (error) {
    console.error('Failed to send chat message:', error)
    hasError.value = true
  } finally {
    isSending.value = false
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
        <article
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="`message-${message.role}`"
        >
          {{ message.content }}
        </article>
        <p v-if="isSending" class="sending-indicator" aria-live="polite">
          {{ t.chat.sending }}
        </p>
      </div>

      <div class="service-picker">
        <div class="picker-heading">
          <h3>{{ t.chat.selectServices }}</h3>
          <span v-if="selectedServiceIds.length">
            {{ selectedServiceIds.length }} {{ t.chat.selectedCount }}
          </span>
        </div>
        <p class="picker-help">{{ t.chat.selectionHelp }}</p>
        <div class="service-list">
          <label v-for="service in SERVICE_CATALOG" :key="service.id" class="service-option">
            <input
              type="checkbox"
              :checked="selectedServiceIds.includes(service.id)"
              @change="toggleService(service.id)"
            />
            <span class="service-name">
              {{ t.services.items[service.id].name }}
              <small>{{ service.duration }}</small>
            </span>
            <span class="service-price">
              {{ t.chat.priceFrom }} R$ {{ service.price }}
            </span>
          </label>
        </div>
      </div>

      <p v-if="hasError" class="error-message" role="alert">{{ t.chat.error }}</p>

      <form class="composer" @submit.prevent="sendMessage">
        <label class="visually-hidden" for="chat-question">{{ t.chat.inputLabel }}</label>
        <input
          id="chat-question"
          v-model="question"
          type="text"
          maxlength="1000"
          :placeholder="t.chat.placeholder"
          :disabled="isSending"
        />
        <button type="submit" :disabled="isSending || !question.trim()">
          {{ isSending ? t.chat.sending : t.chat.send }}
        </button>
      </form>

      <a class="whatsapp-link" :href="whatsappUrl" target="_blank" rel="noopener noreferrer">
        {{ t.chat.whatsapp }}
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
.composer button:focus-visible,
.whatsapp-link:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 3px;
}

.chat-panel {
  display: flex;
  flex-direction: column;
  width: min(390px, calc(100vw - 32px));
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
  background: rgba(255, 255, 255, 0.12);
}

.message-list {
  display: flex;
  flex: 1 1 150px;
  flex-direction: column;
  gap: 10px;
  min-height: 72px;
  max-height: 210px;
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

.service-picker {
  flex: 0 1 auto;
  min-height: 0;
  padding: 14px 16px 10px;
  border-top: 1px solid var(--color-line);
}

.picker-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.picker-heading h3 {
  font-size: 0.86rem;
  font-weight: 600;
}

.picker-heading span,
.picker-help {
  color: var(--color-ink-muted);
  font-size: 0.72rem;
}

.picker-help {
  margin-top: 2px;
}

.service-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  min-height: 0;
  max-height: 156px;
  overflow-y: auto;
  margin-top: 10px;
}

.service-option {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  padding: 7px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  cursor: pointer;
}

.service-option:has(input:checked) {
  border-color: var(--color-accent);
  background: rgba(212, 175, 106, 0.12);
}

.service-option input {
  flex: 0 0 auto;
  margin: 3px 0 0;
  accent-color: var(--color-accent);
}

.service-name {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  font-size: 0.73rem;
  font-weight: 600;
}

.service-name small {
  margin-top: 2px;
  color: var(--color-ink-muted);
  font-size: 0.65rem;
  font-weight: 400;
}

.service-price {
  flex: 0 0 auto;
  color: var(--color-ink-muted);
  font-size: 0.64rem;
}

.error-message {
  margin: 0 16px 8px;
  color: #a33b32;
  font-size: 0.78rem;
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
    max-height: calc(100dvh - 86px);
  }

  .message-list {
    flex-basis: 90px;
    max-height: 100px;
  }

  .service-list {
    max-height: 92px;
  }
}

@media (max-height: 560px) {
  .chat-panel {
    max-height: calc(100dvh - 86px);
  }

  .chat-header {
    padding-block: 12px;
  }

  .message-list {
    flex-basis: 80px;
    max-height: 88px;
  }

  .service-picker {
    padding-block: 10px 6px;
  }

  .service-list {
    max-height: 84px;
  }
}

@media (min-width: 900px) {
  .chat-widget {
    right: 24px;
    bottom: 24px;
  }
}
</style>
