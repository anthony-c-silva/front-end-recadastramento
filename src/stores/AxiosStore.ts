import { defineStore } from 'pinia';
import axiosService from 'src/services/AxiosService';

export const axiosStore = defineStore('axios', {
  state: () => ({

  }),
  getters: {},
  actions: {
    async getDados(endPoint: string) {
      const { data } = await axiosService.get(endPoint)
      return data;
    },
    async postDados(endPoint: string, dados: object ) {
      const { data } = await axiosService.post( endPoint, dados);
      return data;
    },
    async putDados(endPoint: string, dados: object ) {
      const { data } = await axiosService.put( endPoint, dados);
      return data;
    },
    async postRecad(endPoint: string, dados: object ) {
      const { data } = await axiosService.post( endPoint, dados);
      return data;
    },
    async putRecad(endPoint: string, dados: object ) {
      const { data } = await axiosService.put( endPoint, dados);
      return data;
    },

  },
});
