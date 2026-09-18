<script setup lang="ts">
import { buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <a
    class="fab"
    :href="buildWhatsAppUrl(t.whatsapp.defaultMessage)"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="t.whatsapp.ariaLabel"
  >
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.11 1.03 6.97 2.9a9.8 9.8 0 0 1 2.9 6.97c0 5.44-4.43 9.86-9.87 9.86Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a8.97 8.97 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.14 4.54 1.8.78 2.5.84 3.4.71.52-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  </a>
</template>

<style scoped lang="scss">
.fab {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(37, 211, 102, 0.78);
  color: var(--color-white);
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 32px rgba(18, 18, 18, 0.16);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.fab:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(18, 18, 18, 0.2);
}

.fab:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 3px;
}

@media (min-width: 900px) {
  .fab {
    right: 24px;
    bottom: 24px;
  }
}
</style>
