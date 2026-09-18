<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

function initials(name: string) {
  return name
    .replaceAll('.', '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading :eyebrow="t.testimonials.eyebrow" :title="t.testimonials.title" />
      <p class="note" data-reveal>{{ t.testimonials.demoNote }}</p>

      <div class="grid">
        <blockquote
          v-for="(item, index) in t.testimonials.items"
          :key="item.name"
          data-reveal
          :style="{ transitionDelay: `${index * 70}ms` }"
        >
          <p class="stars" aria-label="5">★★★★★</p>
          <p class="quote">“{{ item.quote }}”</p>
          <footer>
            <span class="avatar" aria-hidden="true">{{ initials(item.name) }}</span>
            <cite>{{ item.name }}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 24px 0 88px;
}

.note {
  margin-top: 14px;
  font-size: 0.86rem;
  color: var(--color-text-secondary);
}

.grid {
  display: grid;
  gap: 18px;
  margin-top: 36px;
}

blockquote {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 28px 24px;
  background: var(--color-card);
  color: var(--color-ink);
  border: 1px solid rgba(212, 175, 106, 0.28);
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
}

.stars {
  margin-bottom: 16px;
  color: var(--color-accent);
  letter-spacing: 0.12em;
}

.quote {
  flex: 1;
  font-family: var(--font-sans);
  font-size: 1.1rem;
  font-weight: 500;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-ink);
}

footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3ead6;
  color: var(--color-accent-dark);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

cite {
  font-style: normal;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

@media (min-width: 800px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1100px) {
  .section {
    padding: 0 0 120px;
  }
}
</style>
