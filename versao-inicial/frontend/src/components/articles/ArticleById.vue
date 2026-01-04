<template>
  <div class="article-by-id">
    <PageTitle icon="fa fa-file" :main="article.name" :sub="article.description" />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle.vue'
import { nextTick } from 'vue'

export default {
  name: 'ArticleById',
  components: { PageTitle },
  data: function () {
    return {
      article: {},
    }
  },methods: {
    async fetchArticle() {
      const url = `${baseApiUrl}/articles/${this.$route.params.id}`

      try {
        const res = await axios.get(url)
        this.article = res.data

        await nextTick()
        this.applyHighlight()
      } catch (e) {
        showError(e)
      }
    },
    applyHighlight() {
      document.querySelectorAll('.article-content pre').forEach(el => {
        hljs.highlightElement(el)
      })
    }
  },
  mounted() {
    this.fetchArticle()
  },
  updated() {
    document.querySelectorAll(`pre`).forEach(e => {
      hljs.highlightBlock(e)
    })
  }
}
</script>

<style>
  .article-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 25px;
  }


  .article-content pre {
    padding: 20px;
    border-radius: 8px;
    font-size: 1.2rem;
    background-color: #1e1e1e;
    color: #fff;
  }

  .article-content img {
    max-width: 100%;
  }

  .article-content :last-child {
    margin-bottom: 0px;
  }
</style>
