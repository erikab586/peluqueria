<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { X } from '@lucide/vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { fillMessage, buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'
import { SERVICES, TIME_SLOTS } from '@/data/content'
import type { ServiceId } from '@/types'

const { t } = useI18n()

const step = ref(1)
const direction = ref<'next' | 'prev'>('next')
const submitted = ref(false)
const error = ref('')

const form = reactive({
  service: '' as ServiceId | '',
  date: '',
  time: '',
  name: '',
  whatsapp: '',
})

const minDate = computed(() => {
  const today = new Date()
  const month = `${today.getMonth() + 1}`.padStart(2, '0')
  const day = `${today.getDate()}`.padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
})

const selectedServiceName = computed(() => {
  if (!form.service) return ''
  return t.value.services.items[form.service].name
})

const formattedDate = computed(() => {
  if (!form.date) return ''
  const [year, month, day] = form.date.split('-')
  return `${day}/${month}/${year}`
})

const bookingMessage = computed(() =>
  fillMessage(t.value.whatsapp.bookingMessage, {
    service: selectedServiceName.value,
    date: formattedDate.value,
    time: form.time,
    name: form.name,
  }),
)

const progress = computed(() => (step.value / 4) * 100)

function validateStep() {
  if (step.value === 1 && !form.service) {
    error.value = t.value.booking.errors.service
    return false
  }
  if (step.value === 2 && !form.date) {
    error.value = t.value.booking.errors.date
    return false
  }
  if (step.value === 3 && !form.time) {
    error.value = t.value.booking.errors.time
    return false
  }
  if (step.value === 4) {
    if (form.name.trim().length < 2) {
      error.value = t.value.booking.errors.name
      return false
    }
    if (!/^\+?\d{10,13}$/.test(form.whatsapp.replace(/\D/g, ''))) {
      error.value = t.value.booking.errors.whatsapp
      return false
    }
  }
  error.value = ''
  return true
}

function next() {
  if (!validateStep()) return
  direction.value = 'next'
  if (step.value < 4) {
    step.value += 1
  }
}

function back() {
  error.value = ''
  direction.value = 'prev'
  if (step.value > 1) {
    step.value -= 1
  }
}

function confirm() {
  if (!validateStep()) return
  submitted.value = true
}

function closeModal() {
  submitted.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && submitted.value) {
    closeModal()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

function selectService(id: ServiceId) {
  form.service = id
  error.value = ''
}
</script>

<template>
  <section id="agendamento" class="section">
    <div class="container">
      <SectionHeading
        :eyebrow="t.booking.eyebrow"
        :title="t.booking.title"
        :subtitle="t.booking.subtitle"
      />
      <p class="note" data-reveal>{{ t.booking.demoNote }}</p>

      <form class="panel" data-reveal="delay" @submit.prevent="step === 4 ? confirm() : next()">
        <div class="progress" aria-hidden="true">
          <span :style="{ width: `${progress}%` }" />
        </div>

        <ol class="steps">
          <li
            v-for="(label, index) in t.booking.steps"
            :key="label"
            :class="{ active: step === index + 1, done: step > index + 1 }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ label }}
          </li>
        </ol>

        <div class="stage">
          <Transition :name="direction === 'next' ? 'slide-next' : 'slide-prev'" mode="out-in">
            <div v-if="step === 1" key="service" class="step-body">
              <p class="field-label">{{ t.booking.fields.service }}</p>
              <div class="options">
                <button
                  v-for="service in SERVICES"
                  :key="service.id"
                  class="service-option"
                  type="button"
                  :aria-pressed="form.service === service.id"
                  @click="selectService(service.id)"
                >
                  {{ t.services.items[service.id].name }}
                </button>
              </div>
            </div>
            <div v-else-if="step === 2" key="date" class="step-body">
              <label class="field-label" for="booking-date">{{ t.booking.fields.date }}</label>
              <input
                id="booking-date"
                v-model="form.date"
                class="input"
                type="date"
                :min="minDate"
                required
              />
            </div>
            <div v-else-if="step === 3" key="time" class="step-body">
              <p class="field-label">{{ t.booking.fields.time }}</p>
              <div class="times">
                <button
                  v-for="slot in TIME_SLOTS"
                  :key="slot"
                  class="time-slot"
                  type="button"
                  :aria-pressed="form.time === slot"
                  @click="form.time = slot; error = ''"
                >
                  {{ slot }}
                </button>
              </div>
            </div>
            <div v-else key="data" class="step-body fields">
              <label class="field-label" for="booking-name">{{ t.booking.fields.name }}</label>
              <input
                id="booking-name"
                v-model="form.name"
                class="input"
                type="text"
                autocomplete="name"
                :placeholder="t.booking.placeholders.name"
              />
              <label class="field-label" for="booking-whatsapp">{{ t.booking.fields.whatsapp }}</label>
              <input
                id="booking-whatsapp"
                v-model="form.whatsapp"
                class="input"
                type="tel"
                autocomplete="tel"
                :placeholder="t.booking.placeholders.whatsapp"
              />
            </div>
          </Transition>
        </div>

        <p v-if="error" class="error" role="alert">{{ error }}</p>

        <div class="actions">
          <button v-if="step > 1" class="btn btn-outline" type="button" @click="back">
            {{ t.booking.back }}
          </button>
          <button v-if="step < 4" class="btn btn-primary" type="submit">
            {{ t.booking.next }}
          </button>
          <button v-else class="btn btn-primary" type="submit">
            {{ t.booking.confirm }}
          </button>
        </div>
      </form>
    </div>

    <Transition name="modal">
      <div
        v-if="submitted"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div class="modal-card">
          <button class="icon-btn" type="button" :aria-label="t.booking.modalClose" @click="closeModal">
            <X :size="18" :stroke-width="1.5" />
          </button>
          <h3 id="booking-modal-title">{{ t.booking.modalTitle }}</h3>
          <p>{{ t.booking.modalText }}</p>
          <div class="modal-actions">
            <a
              class="btn btn-primary"
              :href="buildWhatsAppUrl(bookingMessage)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t.booking.modalWhatsapp }}
            </a>
            <button class="btn btn-outline" type="button" @click="closeModal">
              {{ t.booking.modalClose }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 88px 0;
  background: var(--color-bg-secondary);
}

.note {
  margin-top: 14px;
  font-size: 0.86rem;
  color: var(--color-text-secondary);
}

.panel {
  position: relative;
  overflow: hidden;
  margin-top: 36px;
  padding: 28px 20px 22px;
  background: var(--color-card);
  color: var(--color-ink);
  border: 1px solid rgba(212, 175, 106, 0.32);
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #eadfce;
}

.progress span {
  display: block;
  height: 100%;
  background: var(--color-accent);
  transition: width 0.35s ease;
}

.steps {
  display: grid;
  gap: 10px;
  margin: 8px 0 28px;
  padding: 0;
  list-style: none;
}

.steps li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.86rem;
  color: var(--color-ink-muted);
}

.steps span {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  color: var(--color-accent);
}

.steps li.active,
.steps li.done {
  color: var(--color-ink);
}

.stage {
  min-height: 220px;
}

.field-label {
  display: block;
  margin-bottom: 12px;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-ink);
}

.options,
.times {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.service-option,
.time-slot,
.input {
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid #eadfce;
  border-radius: var(--radius);
  background: #fff;
  color: var(--color-ink);
}

.service-option,
.time-slot {
  text-align: left;
}

.service-option[aria-pressed='true'],
.time-slot[aria-pressed='true'] {
  border-color: var(--color-accent);
  background: #f7f1e6;
}

.fields .input + .field-label {
  margin-top: 18px;
}

.input {
  width: 100%;
}

.error {
  margin-top: 16px;
  color: #8a3b32;
  font-size: 0.9rem;
}

.actions {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(18, 18, 18, 0.42);
  backdrop-filter: blur(8px);
}

.modal-card {
  position: relative;
  width: min(460px, 100%);
  padding: 40px 28px 28px;
  background: var(--color-card);
  color: var(--color-ink);
  border: 1px solid rgba(212, 175, 106, 0.35);
  border-radius: 16px;
  box-shadow: var(--shadow-lift);
}

.modal-card h3 {
  font-family: var(--font-sans);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.15;
  color: var(--color-ink);
}

.modal-card p {
  margin: 14px 0 24px;
  color: var(--color-ink-muted);
}

.modal-actions {
  display: grid;
  gap: 10px;
}

.icon-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-white);
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.32s ease,
    transform 0.32s ease;
}

.slide-next-enter-from,
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(28px);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-28px);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  transform: translateY(18px);
}

@media (min-width: 800px) {
  .panel {
    padding: 40px 40px 32px;
  }

  .steps {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .options {
    grid-template-columns: repeat(4, 1fr);
  }

  .times {
    grid-template-columns: repeat(3, 1fr);
  }

  .actions {
    grid-template-columns: max-content max-content;
    justify-content: flex-end;
  }

  .actions .btn,
  .modal-actions .btn {
    width: auto;
  }
}

@media (min-width: 1100px) {
  .section {
    padding: 120px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide-next-enter-from,
  .slide-next-leave-to,
  .slide-prev-enter-from,
  .slide-prev-leave-to,
  .modal-enter-from .modal-card,
  .modal-leave-to .modal-card {
    transform: none;
  }
}
</style>
