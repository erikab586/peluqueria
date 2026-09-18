<script setup lang="ts">
import { buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'
import { scrollToId } from '@/composables/useScrollTo'

const { t } = useI18n()
</script>

<template>
  <section class="cta">
    <div class="container" data-reveal>
      <h2>{{ t.cta.title }}</h2>
      <p>{{ t.cta.text }}</p>
      <div class="actions">
        <button class="btn btn-primary" type="button" @click="scrollToId('agendamento')">
          {{ t.cta.book }}
        </button>
        <a
          class="btn btn-light"
          :href="buildWhatsAppUrl(t.whatsapp.defaultMessage)"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t.cta.whatsapp }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta {
  padding: 96px 0;
  background: #111111;
  color: var(--color-text);
  text-align: center;
  border-top: 1px solid rgba(212, 175, 106, 0.22);
  border-bottom: 1px solid rgba(212, 175, 106, 0.22);
}

h2 {
  font-family: var(--font-sans);
  font-size: clamp(2.1rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--color-accent);
}

p {
  margin: 16px 0 32px;
  color: var(--color-text-secondary);
}

.actions {
  display: grid;
  gap: 12px;
  max-width: 420px;
  margin: 0 auto;
}

@media (min-width: 760px) {
  .cta {
    padding: 128px 0;
  }

  .actions {
    grid-template-columns: max-content max-content;
    max-width: none;
    justify-content: center;
  }

  .actions .btn {
    width: auto;
  }
}
</style>
