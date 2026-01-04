import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isMenuVisible: false,
    user: null,
    isMobile: window.innerWidth <= 768
  }),

  actions: {
    toggleMenu(isVisible) {
      if (!this.user) {
        this.isMenuVisible = isVisible === undefined ? !this.isMenuVisible : isVisible
        return
      }
      // if(!this.user) {
      //   this.isMenuVisible = false
      //   return
      // }

      if (typeof isVisible !== 'boolean') {
        this.isMenuVisible = !this.isMenuVisible
      } else {
        this.isMenuVisible = isVisible
      }
    },
    setUser(user) {
      this.user = user
      if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        this.isMenuVisible = !this.isMobile
      } else {
        delete axios.defaults.headers.common['Authorization']
        this.isMenuVisible = false
      }
    },
    setIsMobile(value) {
      this.isMobile = value
      if(value) this.isMenuVisible = false 
    }
  },
})
