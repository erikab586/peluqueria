<script setup lang="ts">
import { onMounted } from 'vue'
import About from '@/components/About.vue'
import Benefits from '@/components/Benefits.vue'
import Booking from '@/components/Booking.vue'
import CTA from '@/components/CTA.vue'
import Footer from '@/components/Footer.vue'
import Gallery from '@/components/Gallery.vue'
import Hero from '@/components/Hero.vue'
import Navbar from '@/components/Navbar.vue'
import Services from '@/components/Services.vue'
import Testimonials from '@/components/Testimonials.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'
import { useI18n } from '@/composables/useI18n'
import { initReveals } from '@/composables/useReveal'

const { t } = useI18n()

onMounted(() => {
  initReveals()
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t.skipLink }}</a>
  <Navbar />
  <main id="main">
    <Hero />
    <Services />
    <About />
    <Gallery />
    <Benefits />
    <Testimonials />
    <Booking />
    <CTA />
  </main>
  <Footer />
  <WhatsAppButton />
</template>
