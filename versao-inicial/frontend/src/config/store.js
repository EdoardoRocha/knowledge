import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isMenuVisible: true,
    user: {
      name: 'Edoardo Paz',
      email: 'pazedoardo@gmail.com'
    }
  }),

  actions: {
    toggleMenu(isVisible) {
      // if(!this.user) {
      //   this.isMenuVisible = false
      //   return
      // }

      if(typeof isVisible !== 'boolean') {
        this.isMenuVisible = !this.isMenuVisible
      } else {
        this.isMenuVisible = isVisible
      }
    }
  }
})

