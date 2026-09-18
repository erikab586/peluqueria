<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Menu, X } from '@lucide/vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useI18n } from '@/composables/useI18n'
import { scrollToId } from '@/composables/useScrollTo'

const { t } = useI18n()
const open = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const links = [
  { id: 'inicio', key: 'home' as const },
  { id: 'servicos', key: 'services' as const },
  { id: 'galeria', key: 'gallery' as const },
  { id: 'sobre', key: 'about' as const },
  { id: 'contato', key: 'contact' as const },
]

function goTo(id: string) {
  open.value = false
  document.body.style.overflow = ''
  scrollToId(id)
}

function toggleMenu() {
  open.value = !open.value
  document.body.style.overflow = open.value ? 'hidden' : ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    toggleMenu()
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    menuRef.value?.querySelector<HTMLElement>('button, a')?.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <a class="brand" href="#inicio" @click.prevent="goTo('inicio')">
        <span class="brand-title">LUMIÈRE</span>
        <span class="brand-sub">BEAUTY STUDIO</span>
      </a>

      <nav class="desktop-nav" :aria-label="t.nav.home">
        <a
          v-for="link in links"
          :key="link.id"
          class="nav-link"
          :href="`#${link.id}`"
          @click.prevent="goTo(link.id)"
        >
          {{ t.nav[link.key] }}
        </a>
      </nav>

      <div class="desktop-actions">
        <LanguageSwitcher />
        <button class="btn btn-primary" type="button" @click="goTo('agendamento')">
          {{ t.nav.book }}
        </button>
      </div>

      <div class="mobile-actions">
        <LanguageSwitcher />
        <button
          class="icon-btn"
          type="button"
          :aria-expanded="open"
          :aria-label="open ? t.nav.closeMenu : t.nav.openMenu"
          @click="toggleMenu"
        >
          <X v-if="open" :size="22" :stroke-width="1.5" />
          <Menu v-else :size="22" :stroke-width="1.5" />
        </button>
      </div>
    </div>

    <div class="mobile-panel" :class="{ open }" :aria-hidden="!open">
      <nav ref="menuRef" class="mobile-nav">
        <a
          v-for="link in links"
          :key="link.id"
          class="mobile-link"
          :href="`#${link.id}`"
          @click.prevent="goTo(link.id)"
        >
          {{ t.nav[link.key] }}
        </a>
        <button class="btn btn-primary" type="button" @click="goTo('agendamento')">
          {{ t.nav.book }}
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(11, 11, 11, 0.82);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--color-line);
}

.navbar-inner {
  width: min(var(--container), calc(100% - 24px));
  min-height: var(--nav-height);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
}

.brand {
  display: flex;
  flex-direction: column;
  line-height: 1;
  min-width: 0;
}

.brand-title {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.brand-sub {
  margin-top: 5px;
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  color: var(--color-text-secondary);
}

.desktop-nav,
.desktop-actions {
  display: none;
}

.nav-link {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
}

.nav-link:hover {
  color: var(--color-accent);
}

.desktop-actions {
  align-items: center;
  gap: 18px;
}

.desktop-actions .btn {
  width: auto;
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  background: var(--color-accent);
  color: #121212;
  flex-shrink: 0;
}

.mobile-panel {
  position: absolute;
  inset: var(--nav-height) 0 auto;
  height: calc(100dvh - var(--nav-height));
  background: var(--color-bg);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.mobile-panel.open {
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 36px 20px 48px;
}

.mobile-link {
  font-family: var(--font-sans);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.1;
}

@media (max-width: 720px) {
  .brand-sub {
    display: none;
  }
}

@media (min-width: 980px) {
  .navbar-inner {
    width: min(var(--container), calc(100% - 32px));
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .brand-title {
    font-size: 1.2rem;
    letter-spacing: 0.16em;
  }

  .desktop-nav,
  .desktop-actions {
    display: flex;
  }

  .desktop-nav {
    gap: 28px;
  }

  .mobile-actions,
  .mobile-panel {
    display: none;
  }
}
</style>
