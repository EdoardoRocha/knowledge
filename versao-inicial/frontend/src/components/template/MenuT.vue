<template>
  <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
import { mapState } from 'pinia';
import { useAuthStore } from '@/config/store';


export default {
  name: "MenuT",
  computed: {
    ...mapState(useAuthStore, ['isMenuVisible'])
  }
}
</script>

<style>
  .menu {
    grid-area: menu;
    background: linear-gradient(to right, #232526, #414345);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
</style>

