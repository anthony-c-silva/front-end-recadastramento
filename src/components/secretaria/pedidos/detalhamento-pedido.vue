<template>
    <div v-if="$props.dados != null" class="q-pb-lg">
      <q-scroll-area style="height: 100%;">
      <div class="q-pa-xl text-center">
        <p class="titulo">Analizar Pedido e Documentação</p>
        <p style="color: #D32F2F;">
          <q-icon class="q-pr-sm" size="xs" name="mdi-information"/>
          Campos alterados pelo aluno foram destacados em vermelho
        </p>
      </div>     
          <Basico
            :nome-completo="$props.dados?.dadosBasicosDto?.nomeCompleto"
            :nome-social="$props.dados?.dadosBasicosDto?.nomeSocial"
            :cpf="$props.dados?.dadosBasicosDto?.cpf"
            :sexo="$props.dados?.dadosBasicosDto?.sexo"
            :nome-mae="$props.dados?.dadosBasicosDto?.nomeMae"
            :data-nascimento="$props.dados?.dadosBasicosDto?.dataNascimento"
            :email="$props.dados?.email"
            :celular="$props.dados?.dadosBasicosDto?.celular"
          />
          <Complementar
            :raca="$props.dados.dadosComplementaresDto?.etniaDto as TabEstruturada"
            :nacionalidade="$props.dados.dadosComplementaresDto?.nacionalidadeDto as TabEstruturada"
            :deficiencias="$props.dados.dadosComplementaresDto?.pedidoDeficRecad"
            :indDeficiencia="$props.dados.dadosComplementaresDto?.indDeficiencia"
            :anoConcEnsMedio="$props.dados.dadosComplementaresDto?.anoConcEnsMedio"
            :nomeEscolaEnsMedio="$props.dados.dadosComplementaresDto?.escolasRecadDto?.nomeEscola"
            :indSemEscola="$props.dados.dadosComplementaresDto?.indSemEscola"
            :justSemEscola="$props.dados.dadosComplementaresDto?.justEscola"
          />  
          <Endereco
            :cep="$props.dados.dadosEnderecoDto?.cep"
            :logradouro="$props.dados.dadosEnderecoDto?.logradouro"
            :numero="$props.dados.dadosEnderecoDto?.numero"
            :bairro="$props.dados.dadosEnderecoDto?.bairro"
            :estado="$props.dados.dadosEnderecoDto?.estadoDto?.sigla"
            :cidade="$props.dados.dadosEnderecoDto?.cidade?.nome"           
          />    
          
         <AnalisePedido 
            v-if="!$props.somenteVisualizacao && $props.dados.situacaoPedido == 'CONCLUIDO'"   
            :idPedidoRecad="$props.dados.idPedidoRecad"
            v-on:pedidoAnalisado="pedidoAnalisado"
          />
    
        </q-scroll-area>   
    </div>
    <p v-else class="text-center">Selecione um pedido</p>
    
</template>

<script setup lang="ts"> 
  import { TabEstruturada } from 'src/model/tabEstruturada/TabEstruturada';
  import Basico from './blocos/pedido-basico.vue';
  import Complementar from './blocos/pedido-complementar.vue'
  import Endereco from './blocos/pedido-endereco.vue'
  import AnalisePedido from './blocos/analise-pedido.vue';

  const emit = defineEmits(['pedidoAnalisado']) 
  const props = defineProps({
    dados: Object,
    somenteVisualizacao: {
      type: Boolean,
      default: true
    }
  })

  const pedidoAnalisado = () =>{
    emit("pedidoAnalisado")
  }




 
</script>

<style scoped> 

.titulo{
  color: #333;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.00469rem;
}

.titulo2{
  color: #8EC0E4;
  font-family: Manrope;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.00469rem;
}
.span {
    font-weight: 600;
}



</style>src/model/DetalhamentoPedido