<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <HeaderT title="MoguU - Base de conhecimento" :hideToggle="!user" :hideUserDropdown="!user" />
    <MenuT v-if="user" />
    <Loading v-if="validatingToken" />
    <ContentT v-else />
    <FooterT />
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from './global'
import HeaderT from '@/components/template/HeaderT.vue'
import MenuT from '@/components/template/MenuT.vue'
import ContentT from '@/components/template/ContentT.vue'
import FooterT from '@/components/template/FooterT.vue'
import { mapState } from 'pinia'
import { useAuthStore } from '@/config/store'
import Loading from './components/template/Loading.vue'

export default {
  name: 'App',
  components: {
    HeaderT,
    MenuT,
    ContentT,
    FooterT,
    Loading,
  },
  computed: {
    ...mapState(useAuthStore, ['isMenuVisible', 'user']),
  },
  data: function () {
    return {
      validatingToken: true,
    }
  },
  methods: {
    async validateToken() {
      const authStore = useAuthStore()
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)

      if (!userData) {
        this.validatingToken = false
        // Correção: usar $route em vez de $router para checar o nome
        if (this.$route.name !== 'auth') {
          this.$router.push({ name: 'auth' })
        }
        return
      }

      try {
        // Valida o token no backend
        const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

        if (res.data) {
          authStore.setUser(userData)

          if (this.$route.name === 'auth') this.$router.push({ path: '/' })
        } else {
          localStorage.removeItem(userKey)
          authStore.setUser(null)
          this.$router.push({ name: 'auth' })
        }
      } catch (e) {
        // Se houver erro de rede/servidor, limpa e desloga por segurança
        localStorage.removeItem(userKey)
        authStore.setUser(null)
        if (this.$route.name !== 'auth') this.$router.push({ name: 'auth' })
      } finally {
        // Garante que o spinner de Loading saia da tela
        this.validatingToken = false
      }
    },
  },
  mounted() {
    this.validateToken()

    const authStore = useAuthStore()
    window.addEventListener('resize', () => {
      authStore.setIsMobile(window.innerWidth <= 768)
    })
  }, unmounted() {
    window.removeEventListener('resize', () => {})
  },
}
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'header header'
    'menu content'
    'menu footer';
}

#app.hide-menu {
  grid-template-areas:
    'header header'
    'content content'
    'footer footer';
}
</style>
