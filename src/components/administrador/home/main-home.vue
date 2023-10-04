<template>
  <q-page class="content-container">
    <Suspense>
      <template #fallback>
        <div>Loading</div>
      </template>

      <listaRecadastramento></listaRecadastramento>
    </Suspense>
  </q-page>
</template>
<script lang="ts">
import { administradorStore } from 'src/stores/administrador/home/AdminStore';
import listaRecadastramento from 'src/components/administrador/home/lista-recadastramento.vue';

export default {
    name: 'MainHome',
    components: { listaRecadastramento },
    setup() {
        const recadastramentos = administradorStore();
        recadastramentos.setDadosRecadastramento();
        return {
            recadastramentos,
        };
    },

};
</script>
<style lang="scss" scoped>
.content-container {
  margin-top: -3rem;
  height: auto;
}
</style>
