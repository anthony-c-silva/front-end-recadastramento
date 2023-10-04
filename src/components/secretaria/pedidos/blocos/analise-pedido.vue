<template>
    <div>
        <q-form class="q-pt-lg q-pb-lg" @submit="confirmarAnalise()">
            <div class="row q-pa-lg">
              <p class="col-12 text-center titulo2">Análise do pedido</p>
              <div class="col-8">
                <span :style="$q.dark.isActive ? 'color: #D9D9D9;font-size: 14px; font-weight: 600;' : 'color:#333333;font-size: 14px; font-weight: 600;'" class="span ">Deferir pedido?</span>
                <q-select :readonly="false" :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                  dense outlined label="Selecione uma opção" emit-value  :options="options"
                  class ="col-6" v-model="deferido" :rules="[val => !!val || 'Campo obrigatório']"
                  ></q-select>
                <q-tooltip 
                  v-if="$q.screen.width > 680" 
                  class="bg-indigo" 
                  anchor="center right"
                  self="center left"
                >
                  DEFERIDO - Deferir pedido <br>
                  INDEFERIDO - Indererir pedido <br>
                  REAJUSTE - Solicitar reajuste para o aluno
                </q-tooltip>
              </div>            
              <div  class="col-12 q-pt-lg">
                <span :style="$q.dark.isActive ? 'color: #D9D9D9;font-size: 14px; font-weight: 600;' : 'color:#333333;font-size: 14px; font-weight: 600;'" class="span ">
                 Mensagem ao Aluno (enviada via e-mail)
                </span>             
                <q-input
                  v-model="msgAoAluno"
                  filled
                  type="textarea"
                  :rules="[val => !!val || 'Campo obrigatório']"
                />
              </div>
              <div  class="col-12 q-pt-lg">
                <span :style="$q.dark.isActive ? 'color: #D9D9D9;font-size: 14px; font-weight: 600;' : 'color:#333333;font-size: 14px; font-weight: 600;'" class="span ">
                 Despacho final
                </span>             
                <q-input
                  v-model="despachoFinal"
                  filled
                  type="textarea"
                  :rules="[val => !!val || 'Campo obrigatório']"
                />
              </div>
            </div>
            <div class="col-md-2 q-pa-lg row justify-center">
              <q-btn type="submit" icon-right="mdi-check-bold" color="primary" label="Confirmar" />
            </div>
          </q-form>
    </div>
</template>

<script setup lang="ts">
import { axiosStore } from 'src/stores/AxiosStore';
import { ref } from 'vue'
import { Notify } from 'quasar';

    const props = defineProps({
        idPedidoRecad: Number,
        situacaoPedido: String
    })

    const deferido = ref()
    const msgAoAluno = ref()
    const despachoFinal = ref()
    const emit = defineEmits(['pedidoAnalisado'])
    const options = ref([
        {
            'value':'DEFERIDO',
            'label': 'DEFERIDO'
        },
        {
            'value':'INDEFERIDO',
            'label': 'INDEFERIDO'
        },
        {
            'value':'REAJUSTE',
            'label': 'REAJUSTE'
        }
    ]) 
    const axios = axiosStore();
    

    const confirmarAnalise = async () => {
    const dados = {
        idPedidoRecad: props.idPedidoRecad,
        novaSituacaoPedido: deferido.value ,
        despachoAnalista: despachoFinal.value
      };
      try {
        await axios.putDados(
          '/sec/pedido',
          dados
        );
        Notify.create({
          color: 'positive',
          message: "Pedido atualizado com sucesso.",
        })

        emit('pedidoAnalisado')
      } catch (err: unknown) {
        console.log(err)
      }

     
    }
</script>

<style scoped>
.titulo2{
  color: #8EC0E4;
  font-family: Manrope;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.00469rem;
}
</style>