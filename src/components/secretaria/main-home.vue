<template>
  
    <Suspense>
      <template #fallback>
        <div>Loading</div>
      </template>
      <listaRecadastramento></listaRecadastramento>
    </Suspense>

</template>
<script lang="ts">
import { secretariaStore } from 'src/stores/secretaria/SecStore';
import listaRecadastramento from 'src/components/secretaria/secretaria-home.vue';

export default {
    name: 'MainHome',
    components: { listaRecadastramento },
    setup() {
        const recadastramentos = secretariaStore();
        recadastramentos.setDadosRecadastramento();
        return {
            recadastramentos,
        };
    },

};
</script>
<style lang="scss" scoped>
  .content-container {
    height: 50%;
  }
</style>
