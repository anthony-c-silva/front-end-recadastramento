import { defineStore } from 'pinia';
import { axiosStore } from 'src/stores/AxiosStore';
import { Recadastramento } from 'src/model/administrador/Recadastramento';

export const administradorStore = defineStore('administrador', {
  state: () => ({
    dados: [] as Recadastramento[], // Inicialize como um array vazio de objetos Recadastramentos
    recadastramentoById: {} as Recadastramento,
    ativos: [] as Recadastramento[],
  }),
  getters: {
    dadosRecadastramentos(state) {
      return state?.dados;
    },
    idConfigRecad(state) {
      // ponto de interrogação é para lidar com valores possivelmente nulos.
      return state?.dados[0]?.id;
    },
    dadosRecadastramentoById(state) {
      return state?.recadastramentoById;
    },
    dadosRecadastramentosAtivos(state) {
      return state?.dados;
    },
  },
  actions: {
    async setDadosRecadastramento() {
      const axios = axiosStore();
      const data = await axios.getDados('/adm/recadastramentos');

   
      this.dados = data;
    },
    async setDadosRecadastramentosAtivos(){
      const axios = axiosStore();
      const data = await axios.getDados('/adm/recadastramentos/ativos');
      this.dados = data
    },
    async setDadosRecadastramentoById(id: any){
      const axios = axiosStore();
      const data = await axios.getDados('/adm/recadastramentos/recad?idRecad='+id);
      this.recadastramentoById = data
    },
    async postNovoRecadastramento(data: any){
      const axios = axiosStore();
      const response = await axios.postRecad('/adm/recadastramentos/recad', data);
      return response;
    },
    async putEditarRecadastramento(data: any){
      const axios = axiosStore();
      const response = await axios.putRecad('/adm/recadastramentos/recad', data);
      return response;
    }
  },
});
