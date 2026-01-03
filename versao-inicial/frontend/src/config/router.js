import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/home/Home.vue";
import AdminPages from "../components/admin/AdminPages.vue";


const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})
