<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Blend,
  Droplets,
  Gem,
  Hand,
  Palette,
  Scissors,
  Sparkles,
  Wind,
} from '@lucide/vue'
import type { Component } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useI18n } from '@/composables/useI18n'
import { scrollToId } from '@/composables/useScrollTo'
import { SERVICES } from '@/data/content'
import type { ServiceCategory, ServiceIconName } from '@/types'

const { t } = useI18n()
const activeFilter = ref<'all' | ServiceCategory>('all')

const icons: Record<ServiceIconName, Component> = {
  scissors: Scissors,
  wind: Wind,
  droplets: Droplets,
  palette: Palette,
  sparkles: Sparkles,
  blend: Blend,
  hand: Hand,
  gem: Gem,
}

const filters = [
  { id: 'all' as const, key: 'all' as const },
  { id: 'hair' as const, key: 'hair' as const },
  { id: 'treatments' as const, key: 'treatments' as const },
  { id: 'nails' as const, key: 'nails' as const },
]

const visibleServices = computed(() =>
  activeFilter.value === 'all'
    ? SERVICES
    : SERVICES.filter((service) => service.category === activeFilter.value),
)

function formatPrice(value: number) {
  return `R$ ${value}`
}
</script>

<template>
  <section id="servicos" class="section">
    <div class="container">
      <SectionHeading
        :eyebrow="t.services.eyebrow"
        :title="t.services.title"
        :subtitle="t.services.subtitle"
      />

      <div class="tabs" role="tablist" :aria-label="t.services.title">
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="tab"
          type="button"
          role="tab"
          :aria-selected="activeFilter === filter.id"
          @click="activeFilter = filter.id"
        >
          {{ t.services.filters[filter.key] }}
        </button>
      </div>

      <div class="grid">
        <article
          v-for="service in visibleServices"
          :key="service.id"
          class="card"
        >
          <div class="icon">
            <component :is="icons[service.icon]" :size="20" :stroke-width="1.4" />
          </div>
          <h3>{{ t.services.items[service.id].name }}</h3>
          <p>{{ t.services.items[service.id].description }}</p>
          <div class="meta">
            <span>{{ t.services.from }} {{ formatPrice(service.price) }}</span>
            <span>{{ service.duration }}</span>
          </div>
          <button class="btn btn-ghost" type="button" @click="scrollToId('agendamento')">
            {{ t.services.book }}
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 88px 0;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.tab {
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
}

.tab[aria-selected='true'] {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #121212;
}

.grid {
  display: grid;
  gap: 18px;
  margin-top: 28px;
}

.card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 28px 24px 22px;
  background: var(--color-card);
  color: var(--color-ink);
  border: 1px solid rgba(212, 175, 106, 0.28);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.card:hover {
  transform: translateY(-6px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lift);
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 18px;
  color: var(--color-accent);
  border: 1px solid #eadfce;
  border-radius: var(--radius);
}

h3 {
  font-family: var(--font-sans);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-ink);
}

p {
  flex: 1;
  margin: 10px 0 22px;
  color: var(--color-ink-muted);
  font-size: 0.95rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  padding-top: 14px;
  border-top: 1px solid #eadfce;
  font-size: 0.82rem;
  color: var(--color-ink);
  font-weight: 600;
}

.btn {
  justify-content: flex-start;
  width: auto;
}

@media (min-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .section {
    padding: 120px 0;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
