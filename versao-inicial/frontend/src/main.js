import { createApp } from "vue";
import App from './App.vue';

const app = createApp(App);

//Importando o CSS Global
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';

app.mount("#app")
