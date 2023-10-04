import { defineStore } from 'pinia';

import { axiosStore } from 'src/stores/AxiosStore';
import { Usuario } from 'src/model/usuario/Usuario';

export const useUsuario = defineStore('user', {
  state: () => {
    return {
      user: new Usuario(),
      token: localStorage.getItem('token'),
      logado: false,
    };
  },
  getters: {
    usuario(state) {
      return state?.user;
    },
    usuarioNome(state) {
      return state?.user?.nome;
    },
    usuarioEmail(state) {
      return state?.user?.email;
    },
    usuarioGrupo(state){
      return state?.user?.grupos;
    },
    usuarioFoto(state) {
      const baseUrl = 'https://ui-avatars.com/api/?';
      const backgroundColor = 'background=' + '1085BB' + '&';
      const color = 'color=' + 'fff' + '&';
      const name = 'name=' + state.user?.nome;
      const foto = baseUrl + backgroundColor + color + name;
      return foto;
    },
  },
  actions: {
    async setUser() {
      try {
        const axios = axiosStore();
        const data = await axios.getDados('/usuario');
        this.user = data;
        this.logado = true;
        return data.grupos
      } catch (error) {
        this.logado = false;
        this.router.push('/login');
      }
    },
    loggout() {
      this.logado = false;
      this.router.push('/login');
      localStorage.removeItem('token');
    },
  },
});
