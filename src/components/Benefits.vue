<script setup lang="ts">
import { Award, Heart, Leaf, Sun } from '@lucide/vue'
import type { Component } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useI18n } from '@/composables/useI18n'
import type { BenefitIconName } from '@/types'

const { t } = useI18n()

const icons: Record<BenefitIconName, Component> = {
  heart: Heart,
  award: Award,
  leaf: Leaf,
  sun: Sun,
}
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeading :eyebrow="t.benefits.eyebrow" :title="t.benefits.title" />
      <div class="grid">
        <article
          v-for="(item, index) in t.benefits.items"
          :key="item.title"
          class="card"
          data-reveal
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <component :is="icons[item.icon]" :size="22" :stroke-width="1.4" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 88px 0;
}

.grid {
  display: grid;
  gap: 18px;
  margin-top: 40px;
}

.card {
  padding: 24px 22px;
  background: var(--color-card);
  color: var(--color-ink);
  border: 1px solid rgba(212, 175, 106, 0.28);
  border-radius: 16px;
  box-shadow: var(--shadow-soft);
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lift);
}

.card :deep(svg) {
  color: var(--color-accent);
}

h3 {
  margin: 18px 0 10px;
  font-family: var(--font-sans);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-ink);
}

p {
  color: var(--color-ink-muted);
}

@media (min-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 40px;
  }
}

@media (min-width: 1100px) {
  .section {
    padding: 120px 0;
  }

  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
