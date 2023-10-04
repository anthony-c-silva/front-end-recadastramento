import { defineStore } from 'pinia';

import { axiosStore } from 'src/stores/AxiosStore';
import { Recad } from 'src/model/aluno/Recad';
import { DadosRecad } from 'src/model/aluno/DadosRecad';

export const alunoStore = defineStore('aluno', {
  state: () => ({
    recad: [] as Recad[],
    dadosRecad: {} as DadosRecad,
  }),
  getters: {
    dadosRecadById(state) {
      return state?.dadosRecad;
    },
  },
  actions: {
    async setDadosRecads() {
      try {
        const axios = axiosStore();
        const data = await axios.getDados('/aluno/aluno/recad/recads');
        this.recad = data;
        return data;
      } catch (error) {
        // this.router.push('/login');
        return null
      }
    },
    async putEditarEmail(data: any){
      const axios = axiosStore();
      const response = await axios.putRecad('/aluno/pedido/email', data)
      return response;
    }

  },
});
