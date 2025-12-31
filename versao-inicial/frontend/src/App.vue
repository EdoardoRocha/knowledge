<template>
  <div id="app">
    <HeaderT />
    <MenuT />
    <ContentT />
    <FooterT />
  </div>
</template>

<script>
  import HeaderT from '@/components/template/HeaderT.vue';
  import MenuT from '@/components/template/MenuT.vue';
  import ContentT from '@/components/template/ContentT.vue';
  import FooterT from '@/components/template/FooterT.vue';

  export default {
    name: "App",
    components: {
      HeaderT,
      MenuT,
      ContentT,
      FooterT
    }
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
      "header header"
      "menu content"
      "menu footer"
    ;
  }
</style>
