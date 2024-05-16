import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.css'
import pinia from '@/stores/repo'
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
