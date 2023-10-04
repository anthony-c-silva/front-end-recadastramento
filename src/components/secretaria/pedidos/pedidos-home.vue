<template> 
    <div class="row  q-ml-lg q-mr-lg" >   
        <div class="row justify-center col-12  shadow-5 rounded-borders q-pa-sm">          
            <ListaPedidos  
                class="col-4 col-md-4" 
                v-on:pedidoSelecionado="getDetalhamentoPedido"
                :key="keyIndexListaPedidos"  
            />                          
            <DetalhamentoPedidos 
                :somenteVisualizacao="false" 
                :key="keyIndex"  
                :dados="(dados as DadosRecad)" 
                class="col-8 col-md-8"
                v-on:pedidoAnalisado="atualizaListagemPedidos"
            />                        
        </div>
        <div class="col-2">
            <q-btn
                label="Voltar"
                @click="voltar"
                icon="mdi-chevron-left"
                color="#FFF"
                class="q-mt-lg"
                style="background-color: #1085BB; width: 100%;"
            />
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue'
import ListaPedidos from './lista-pedidos.vue'
import DetalhamentoPedidos from './detalhamento-pedido.vue'
import { axiosStore } from 'src/stores/AxiosStore';
import { DadosRecad } from 'src/model/aluno/DadosRecad';
import { useRouter } from 'vue-router';

    const keyIndex = ref(0)
    const keyIndexListaPedidos = ref(0)
    let dados: any
    const axios = axiosStore();
    const router = useRouter()  
    
    const atualizaListagemPedidos = () =>{
        keyIndexListaPedidos.value = keyIndexListaPedidos.value + 1
        dados = null
    }
    
     const getDetalhamentoPedido = async (idPedido: number) => {        
        await axios.getDados('/sec/pedido/dados/pedido?idPedidoRecad='+idPedido).then( d => {
            dados = d            
            keyIndex.value = idPedido
     }); 
    }

    const voltar = () => {
        router.back()
    }

    
</script>
<style lang="scss" scoped>
.content-container {
    margin-top: -3rem;
    height: auto;
}
</style>
