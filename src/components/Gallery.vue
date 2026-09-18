<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { useI18n } from '@/composables/useI18n'
import { GALLERY } from '@/data/content'

const { t } = useI18n()
</script>

<template>
  <section id="galeria" class="section">
    <div class="container">
      <SectionHeading
        :eyebrow="t.gallery.eyebrow"
        :title="t.gallery.title"
        :subtitle="t.gallery.subtitle"
      />

      <div class="masonry">
        <figure
          v-for="item in GALLERY"
          :key="item.id"
          class="item"
        >
          <img
            :src="item.src"
            :alt="t.gallery.alts[item.id]"
            width="900"
            height="1100"
            loading="lazy"
          />
          <figcaption>
            <span>{{ t.gallery.categories[item.category] }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding: 88px 0;
  background: var(--color-bg-secondary);
}

.masonry {
  column-count: 1;
  column-gap: 16px;
  margin-top: 40px;
}

.item {
  position: relative;
  overflow: hidden;
  margin: 0 0 16px;
  border-radius: 12px;
  background: #ddd6ce;
  break-inside: avoid;
  box-shadow: var(--shadow-soft);
}

.item img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.item:nth-child(3n) img {
  height: 360px;
}

.item:nth-child(4n) img {
  height: 240px;
}

.item figcaption {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 18px;
  background: linear-gradient(180deg, transparent 48%, rgba(18, 18, 18, 0.55) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.item span {
  color: var(--color-accent);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
}

.item:hover img,
.item:focus-within img {
  transform: scale(1.08);
}

.item:hover figcaption,
.item:focus-within figcaption {
  opacity: 1;
}

@media (hover: none) {
  .item figcaption {
    opacity: 1;
  }
}

@media (min-width: 640px) {
  .masonry {
    column-count: 2;
  }
}

@media (min-width: 1100px) {
  .section {
    padding: 120px 0;
  }

  .masonry {
    column-count: 3;
  }
}
</style>
