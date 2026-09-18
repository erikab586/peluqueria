<script setup lang="ts">
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/constants'
import { buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'
import { scrollToId } from '@/composables/useScrollTo'

const { t } = useI18n()

const links = [
  { id: 'inicio', key: 'home' as const },
  { id: 'servicos', key: 'services' as const },
  { id: 'galeria', key: 'gallery' as const },
  { id: 'sobre', key: 'about' as const },
  { id: 'contato', key: 'contact' as const },
]
</script>

<template>
  <footer id="contato" class="footer">
    <div class="container grid">
      <div>
        <p class="brand-title">LUMIÈRE</p>
        <p class="brand-sub">BEAUTY STUDIO</p>
        <p class="tagline">{{ t.footer.tagline }}</p>
      </div>

      <nav :aria-label="t.nav.contact">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          @click.prevent="scrollToId(link.id)"
        >
          {{ t.nav[link.key] }}
        </a>
      </nav>

      <div class="info">
        <p>{{ t.footer.location }}</p>
        <p>{{ t.footer.hoursLabel }}: {{ t.footer.hours }}</p>
        <a
          :href="buildWhatsAppUrl(t.whatsapp.defaultMessage)"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t.footer.whatsapp }}
        </a>
        <p class="social">
          <a :href="INSTAGRAM_URL" target="_blank" rel="noopener noreferrer">
            {{ t.footer.instagram }}
          </a>
          <a :href="FACEBOOK_URL" target="_blank" rel="noopener noreferrer">
            {{ t.footer.facebook }}
          </a>
        </p>
      </div>
    </div>
    <div class="container copyright">
      <p>{{ t.footer.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 64px 0 96px;
  background: var(--color-bg);
  border-top: 1px solid var(--color-line);
}

.grid {
  display: grid;
  gap: 36px;
}

.brand-title {
  font-family: var(--font-sans);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.16em;
}

.brand-sub {
  margin-top: 6px;
  font-size: 0.66rem;
  letter-spacing: 0.28em;
  color: var(--color-text-secondary);
}

.tagline {
  margin-top: 16px;
  color: var(--color-text-secondary);
}

nav,
.info {
  display: grid;
  gap: 10px;
}

a {
  color: var(--color-text-secondary);
}

a:hover {
  color: var(--color-accent);
}

.social {
  display: flex;
  gap: 16px;
}

.copyright {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--color-line);
  color: var(--color-text-secondary);
  font-size: 0.86rem;
}

@media (min-width: 860px) {
  .grid {
    grid-template-columns: 1.3fr 0.8fr 1fr;
    gap: 48px;
  }
}
</style>
