<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle?: string
  light?: boolean
}>()
</script>

<template>
  <header class="heading" :class="{ light }" data-reveal>
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
.heading {
  max-width: 640px;
}

.light {
  color: var(--color-text);

  .eyebrow {
    color: var(--color-accent);
  }

  .section-subtitle {
    color: var(--color-text-secondary);
  }
}
</style>
