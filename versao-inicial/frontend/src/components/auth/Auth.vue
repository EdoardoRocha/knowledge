<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="../../assets/logo.png" alt="Logo" width="200" />
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

      <input v-if="showSignup" v-model="user.name" placeholder="Nome" type="text" />
      <input v-model="user.email" type="text" placeholder="E-mail" />
      <input v-model="user.password" type="password" placeholder="Senha" />
      <input
        v-if="showSignup"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirme a senha"
      />

      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesso o login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/config/store'
import axios from 'axios'

export default {
  name: 'Auth',
  data: function () {
    return {
      showSignup: false,
      user: {},
    }
  },
  methods: {
    async signin() {
      // Inicializamos as ferramentas dentro do método
      const toast = useToast()
      const authStore = useAuthStore()

      try {
        const res = await axios.post(`${baseApiUrl}/signin`, {
          email: this.user.email,
          password: this.user.password,
        })

        // Atualiza o estado na Store Pinia
        // Verifique se sua store tem a action 'setUser'.
        // Se não tiver, use: authStore.user = res.data
        if (typeof authStore.setUser === 'function') {
          authStore.setUser(res.data)
        } else {
          authStore.user = res.data
        }

        localStorage.setItem(userKey, JSON.stringify(res.data))
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        this.$router.push({ path: '/' })
      } catch (e) {
        showError(e)
      }
    },
    async signup() {
      const toast = useToast()

      try {
        await axios.post(`${baseApiUrl}/signup`, this.user)
        toast.success('Sucesso!')
        this.user = {}
        this.showSignup = false
      } catch (e) {
        showError(e)
      }
    },
  },
}
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
