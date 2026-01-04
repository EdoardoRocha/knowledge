import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
import { QuillEditor } from '@vueup/vue-quill'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './config/router'


const pinia = createPinia()
const app = createApp(App)

//Importando o CSS Global
import 'vue-toastification/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import './config/axios'


const toastOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
}


app.component('QuillEditor', QuillEditor)
app.use(Toast, toastOptions)
app.use(createBootstrap())
app.use(pinia)
app.use(router)
app.mount('#app')
