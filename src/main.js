import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import your router
import { createPinia } from 'pinia';

const pinia = createPinia();

const app = createApp(App)
app.use(router) // Use Vue Router
app.use(pinia) // Use Vue Router
app.mount('#app')
