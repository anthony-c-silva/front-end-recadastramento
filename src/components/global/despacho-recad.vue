<template>
  <template v-for="(d) in dados " :key="d.situcaoPedido">

      <span
        v-if="d.situcaoPedido === 'REAJUSTE'"
        style="color: #d32f2f; font-weight: bold;"
      >
      <q-icon name="mdi-alert-circle" size="22px" />
        Reajustes: {{ d.descricao }}
      </span>
  </template>
</template>
<script setup lang="ts">

  import { axiosStore } from 'src/stores/AxiosStore';
  import { onMounted, ref } from 'vue'

  const axios = axiosStore();
  const dados = ref()

  const props = defineProps({
      idRecad: {
          type: String
      }
  })
  onMounted( async () => {
      await getLogs()
  });


  const getLogs = async () => {
     axios.getDados('/aluno/pedido/logs?idConfigRecad='+ props.idRecad).then( d => {
      dados.value = d
     })
  }
</script>
