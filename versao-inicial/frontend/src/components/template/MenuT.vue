<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
        class="filter-field"
      />
    </div>
    <Tree
      v-if="Object.keys(treeData).length > 0"
      :nodes="treeData"
      :config="treeConfig"
      :filter="treeFilter"
      @node-focus="onNodeSelect"
      class="tree"
    />
  </aside>
</template>

<script>
import { mapState } from 'pinia'
import { useAuthStore } from '@/config/store'
import Tree from 'vue3-treeview'
import 'vue3-treeview/dist/style.css'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  name: 'Menu',
  components: { Tree },
  computed: {
    ...mapState(useAuthStore, ['isMenuVisible']),
  },
  data() {
    return {
      treeFilter: '',
      treeData: {},
      treeConfig: {
        roots: [],
        keyboardNavigation: true,
      },
    }
  },
  methods: {
    async fetchTreeData() {
      const url = `${baseApiUrl}/categories/tree`
      try {
        const res = await axios.get(url)
        // res.data é o Array que aparece no seu console.log
        const { nodes, roots } = this.transformToTreeFormat(res.data)

        this.treeData = nodes
        this.treeConfig.roots = roots
      } catch (error) {
        console.error('Erro ao carregar árvore:', error)
      }
    },

    // Função para transformar Array Aninhado em Objeto Plano (Exigência da lib)
    transformToTreeFormat(data) {
      const nodes = {}
      const roots = []

      const traverse = (items) => {
        items.forEach((item) => {
          // Mapeia os campos da sua API para o padrão da lib
          nodes[item.id] = {
            id: item.id,
            text: item.name, // A lib usa 'text' para exibir o nome
            children: item.children ? item.children.map((c) => String(c.id)) : [],
          }

          // Se não tem pai, é um nó raiz
          if (item.parentId === null) {
            roots.push(String(item.id))
          }

          // Se tiver filhos, percorre recursivamente
          if (item.children && item.children.length > 0) {
            traverse(item.children)
          }
        })
      }

      traverse(data)
      return { nodes, roots }
    },

    onNodeSelect(node) {
      this.$router.push({
        name: 'articlesByCategory',
        params: { id: node.id },
      })

      const authStore = useAuthStore()
      if (authStore.isMobile) {
        // Se sua store usa Pinia, chame a action diretamente
        authStore.toggleMenu(false)
      }
    },
  },
  mounted() {
    this.fetchTreeData()
  },
}
</script>

<style>
/* Estilos Globais para o componente da árvore */
.tree-view {
  /* Cores base */
  --treeview-text-color: #ccc !important;
  --treeview-hover-bg: rgba(255, 255, 255, 0.1) !important;
  --treeview-selected-bg: rgba(255, 255, 255, 0.2) !important;

  background-color: transparent !important;
}

/* Ajuste das linhas da árvore */
.tree-node {
  cursor: pointer;
  transition: background 0.2s;
}

/* O texto dentro do nó */
.tree-text {
  font-size: 1.1rem;
}

/* Escondendo a borda ou fundo branco padrão se houver */
.tree-root {
  background: transparent !important;
  border: none !important;
}
</style>

<style scoped>
/* ESTILOS ESCOPADOS: Layout do Menu e Filtro */
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input.filter-field {
  color: #fff;
  font-size: 1.1rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}
.tree :deep(.tree-node) {
  color: #ccc;
}

.tree :deep(.tree-content:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.tree :deep(.tree-anchor) {
  color: inherit;
  text-decoration: none;
}

/* Seletor para o nó focado/selecionado */
.tree :deep(.tree-node--focused > .tree-content) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #fff;
}
</style>
