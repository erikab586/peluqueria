<script setup lang="ts">
import { HERO_IMAGE } from '@/data/content'
import { buildWhatsAppUrl } from '@/composables/useWhatsApp'
import { useI18n } from '@/composables/useI18n'
import { scrollToId } from '@/composables/useScrollTo'

const { t } = useI18n()
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-media">
      <img
        :src="HERO_IMAGE"
        :alt="t.hero.imageAlt"
        width="1400"
        height="1750"
        fetchpriority="high"
      />
    </div>

    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow" data-reveal>{{ t.hero.badge }}</p>
        <h1 class="hero-title" data-reveal>
          <span>{{ t.hero.titleLine1 }}</span>
          <em>{{ t.hero.titleLine2 }}</em>
        </h1>
        <p class="hero-subtitle" data-reveal="delay">{{ t.hero.subtitle }}</p>
        <div class="hero-actions" data-reveal="delay-2">
          <button class="btn btn-primary" type="button" @click="scrollToId('agendamento')">
            {{ t.hero.ctaBook }}
          </button>
          <a
            class="btn btn-outline"
            :href="buildWhatsAppUrl(t.whatsapp.defaultMessage)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t.hero.ctaWhatsapp }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  padding-bottom: 56px;
}

.hero-media {
  position: relative;
  min-height: 62vw;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.hero-media img {
  width: 100%;
  height: min(52vh, 420px);
  object-fit: cover;
  object-position: center 18%;
}

.hero-grid {
  position: relative;
  margin-top: -42px;
}

.hero-copy {
  padding: 28px 22px 8px;
  background: var(--color-bg);
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-family: var(--font-sans);
  font-size: clamp(2.6rem, 10vw, 5.4rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: var(--color-text);
}

.hero-title em {
  font-style: italic;
  color: var(--color-accent);
}

.hero-subtitle {
  max-width: 34rem;
  margin-top: 22px;
  color: var(--color-text-secondary);
}

.hero-actions {
  display: grid;
  gap: 12px;
  margin-top: 28px;
}

@media (min-width: 900px) {
  .hero {
    min-height: calc(100vh - var(--nav-height));
    padding: 0;
  }

  .hero-media {
    position: absolute;
    top: 0;
    right: 0;
    width: 52%;
    height: 100%;
    min-height: 0;
  }

  .hero-media img {
    height: 100%;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    min-height: calc(100vh - var(--nav-height));
    margin-top: 0;
  }

  .hero-copy {
    max-width: 560px;
    padding: 80px 0;
    background: transparent;
  }

  .hero-actions {
    grid-template-columns: max-content max-content;
    width: max-content;
  }

  .hero-actions .btn {
    width: auto;
  }
}
</style>
