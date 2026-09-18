import { createApp } from 'vue'
import App from './App.vue'
import { initLocale } from './composables/useI18n'
import './styles/tokens.css'
import './styles/base.scss'

initLocale()
createApp(App).mount('#app')
