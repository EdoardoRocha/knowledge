import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/articles/ArticlesByCategory.vue'
import ArticleById from '../components/articles/ArticleById.vue'
import Auth from '@/components/auth/Auth.vue'
import { userKey } from '@/global'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true },
  },
  {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory,
  },
  {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById,
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json)
    user && user.admin ? next() : next({ path: '/' })
  } else {
    next()
  }
})

export default router
