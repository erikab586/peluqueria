<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { locale, t, setLocale } = useI18n()
</script>

<template>
  <div class="switcher" role="group" :aria-label="t.language.label">
    <button
      class="lang-btn"
      type="button"
      :aria-pressed="locale === 'pt-BR'"
      @click="setLocale('pt-BR')"
    >
      <span class="flag" aria-hidden="true">🇧🇷</span>
      {{ t.language.pt }}
    </button>
    <span class="divider" aria-hidden="true">|</span>
    <button
      class="lang-btn"
      type="button"
      :aria-pressed="locale === 'es'"
      @click="setLocale('es')"
    >
      <span class="flag" aria-hidden="true">🇪🇸</span>
      {{ t.language.es }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.switcher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  flex-shrink: 0;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.lang-btn[aria-pressed='true'] {
  color: var(--color-accent);
}

.divider {
  color: var(--color-line);
  font-size: 0.8rem;
}

@media (max-width: 720px) {
  .flag {
    display: none;
  }
}
</style>
