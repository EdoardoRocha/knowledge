import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
import Toast from 'vue-toastification';
import App from './App.vue'
import router from './config/router'
import axios from 'axios'

const pinia = createPinia()
const app = createApp(App)

//Importando o CSS Global
import 'vue-toastification/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@fortawesome/fontawesome-free/css/all.css'

axios.defaults.headers.common['Authorization'] =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkVkb2FyZG8gUi4gUGF6IiwiZW1haWwiOiJwYXplZG9hcmRvQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE3NjczNzk1MzEsImV4cCI6MTc2NzYzODczMX0.17wzjjKFyiyYLx0Kx8kmlPTpTQ_P5Tcip_6hTYHsiDw'

const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false
}

app.use(Toast, toastOptions)
app.use(createBootstrap())
app.use(pinia)
app.use(router)
app.mount('#app')
