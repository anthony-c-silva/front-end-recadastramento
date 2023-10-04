import { defineStore } from 'pinia';
import { axiosStore } from 'src/stores/AxiosStore';
import { Recadastramento } from 'src/model/administrador/Recadastramento';
import { PedidoDto } from 'src/model/PedidoDto';
import { DetalhamentoPedido } from 'src/model/DetalhamentoPedido';




export const secretariaStore = defineStore('secretaria', {
  state: () => ({
    dados: [] as Recadastramento[], // Inicialize como um array vazio de objetos Recadastramentos
    recadastramentoById: {} as Recadastramento,
    ativos: [] as Recadastramento[],
    pedidosDto: [] as PedidoDto[],
    detalhamentoPedido: {} as DetalhamentoPedido,
  }),
  getters: {
    dadosRecadastramentos(state) {
      return state?.dados;
    },
    dadosPedidosDto(state){
      return state?.dados
    }
  },
  actions: {
    async setDadosRecadastramento() {
      const axios = axiosStore();
      const data = await axios.getDados('/sec/recadastramentos');   
      this.dados = data;  
    },
    async setDadosPeditosDto(id: any){
      const axios = axiosStore();
      const data = await axios.getDados('/sec/pedidos?idConfigRecad='+id);
      this.pedidosDto = data
    }
  },
});
