import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Entry point aplikasi: membuat Vue app, memasang router, lalu mount ke #app.
const app = createApp(App)

app.use(router)

app.mount('#app')
