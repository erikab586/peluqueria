<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { useI18n } from '@/composables/useI18n'
import { ABOUT_IMAGE } from '@/data/content'

const { t } = useI18n()
</script>

<template>
  <section id="sobre" class="section">
    <div class="container layout">
      <div class="media" data-reveal>
        <img :src="ABOUT_IMAGE" :alt="t.about.imageAlt" width="1200" height="1500" loading="lazy" />
      </div>
      <div class="copy">
        <SectionHeading :eyebrow="t.about.eyebrow" :title="t.about.title" />
        <p class="lead" data-reveal="delay">{{ t.about.text }}</p>
        <ul class="stats" data-reveal="delay-2">
          <li v-for="stat in t.about.stats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 24px 0 88px;
}

.layout {
  display: grid;
  gap: 32px;
}

.media {
  overflow: hidden;
  border-radius: 16px;
  background: var(--color-bg-secondary);
  box-shadow: var(--shadow-soft);
}

.media img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.media:hover img {
  transform: scale(1.04);
}

.lead {
  margin-top: 20px;
  max-width: 34rem;
  font-size: 1.12rem;
  color: var(--color-text-secondary);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 36px 0 0;
  padding: 0;
  list-style: none;
}

li {
  padding-right: 8px;
}

strong {
  display: block;
  font-family: var(--font-sans);
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 600;
  line-height: 1;
  color: var(--color-accent);
}

span {
  display: block;
  margin-top: 8px;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

@media (min-width: 900px) {
  .section {
    padding: 40px 0 120px;
  }

  .layout {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 72px;
  }

  .media img {
    height: 640px;
  }
}
</style>
