<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible }">
    <HeaderT title="Cod3r - Base de conhecimento" :hideToggle="false" :hideUserDropdown="false"/>
    <MenuT v-show="user"/>
    <ContentT />
    <FooterT />
  </div>
</template>

<script>
import HeaderT from '@/components/template/HeaderT.vue'
import MenuT from '@/components/template/MenuT.vue'
import ContentT from '@/components/template/ContentT.vue'
import FooterT from '@/components/template/FooterT.vue'
import { mapState } from 'pinia'
import { useAuthStore } from '@/config/store'

export default {
  name: 'App',
  components: {
    HeaderT,
    MenuT,
    ContentT,
    FooterT,
  },
  computed: {
    ...mapState(useAuthStore, ['isMenuVisible', 'user']),
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
