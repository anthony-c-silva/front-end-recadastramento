<template>
  <div class="container q-pl-lg q-pr-lg q-pb-lg">
    <div class="q-pa-md">

    <div class="row tituloHeader">
      <div class="col-12 col-md q-mr-md q-mb-lg">
        <h5 :style="$q.dark.isActive ? 'color: #fff;' : 'color:#333333;'">Recadastramento</h5>
      </div>
    </div>

    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
      :contracted="$q.screen.width < 768"
    >
      <q-step
        :name="1"
        :title="'Básicos'"
        active-icon="mdi-account"
        icon="mdi-account"
        done-color="green"
        :caption="'Dados básicos'"
        :done="step > 1"
        :header-nav="step > 1"
      >

        <div class="row justify-center">
          <div class="col-12 col-md-11">

            <DespachoRecad  v-if="reajuste == 'S'" :idRecad= "idRecad"></DespachoRecad>
            <DadosBasicos :id-recad="idRecad" @event-step="fetchAvancarVoltar($event)"></DadosBasicos>
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        :title="'Complementar'"
        :caption="'Dados complementares'"
        icon="mdi-view-grid-plus"
        active-icon="mdi-view-grid-plus"
        done-color="green"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <div class="row justify-center">
          <div class="col-12 col-md-11">
            <DespachoRecad v-if="reajuste == 'S'" :idRecad= "idRecad"></DespachoRecad>
            <DadosComplementar :id-recad="idRecad" @event-step="fetchAvancarVoltar($event)"></DadosComplementar>
          </div>
        </div>

      </q-step>

      <q-step
        :name="3"
        :title="'Endereço'"
        :caption="'Dados de endereço'"
        icon="home"
        active-icon="home"
        done-color="green"
        :done="step > 3"
        :header-nav="step > 3"
      >

        <div class="row justify-center">
          <div class="col-12 col-md-11">
            <DespachoRecad v-if="reajuste == 'S'" :idRecad= "idRecad"></DespachoRecad>
            <DadosEndereco :id-recad="idRecad" @event-step="fetchAvancarVoltar($event)"></DadosEndereco>
          </div>
        </div>
      </q-step>
      <q-step
        :name="4"
        :title="'Documentos'"
        :caption="'Anexar documentos'"
        icon="mdi-file-document-multiple"
        active-icon="mdi-file-document-multiple"
        done-color="green"
        :done="step > 4"
        :header-nav="step > 4"
      >
       <div class="row justify-center">
          <div class="col-12 col-md-11">
            <DespachoRecad v-if="reajuste == 'S'" :idRecad= "idRecad"></DespachoRecad>
            <DadosDocumentos :id-recad="idRecad" :id-pedido-recad="idPedidoRecad" @event-step="fetchAvancarVoltar($event)"></DadosDocumentos>
          </div>
        </div>
      </q-step>

      <q-step
        :name="5"
        :title="'Confirmação'"
        :caption="'Confirmar dados'"
        icon="mdi-thumb-up"
        active-icon="mdi-thumb-up"
        done-color="green"
        :header-nav="step > 3"
      >
        <div class="row justify-center">
          <div class="col-12 col-md-11">
            <DadosConfirmacao :id-recad="idRecad" :id-pedido-recad="idPedidoRecad" @event-step="fetchAvancarVoltar($event)"></DadosConfirmacao>
          </div>
        </div>
      </q-step>

    </q-stepper>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { ref } from 'vue'
  import DadosBasicos from 'src/components/aluno/dados-basicos.vue';
  import DadosDocumentos from '../dados-documentos.vue'
  import DadosComplementar from '../dados-complementar.vue';
  import DadosEndereco from '../dados-endereco.vue';
  import DadosConfirmacao from '../dados-confirmacao.vue';
  import DespachoRecad from 'src/components/global/despacho-recad.vue'
  import { useQuasar } from 'quasar';
  import { useRoute } from 'vue-router';

  const $q = useQuasar();
  const $route = useRoute();

  const idRecad = $route.query.id?.toString();
  const reajuste = $route.query.reajuste?.toString();
  const idPedidoRecad = $route.query.idPedidoRecad?.toString();

  const step = ref(1);

  const fetchAvancarVoltar = (event: number) => {
    step.value += event
  }

</script>

<style lang="scss" scoped>

  .container {
    display: flex;
    flex-direction: column;
  }

  .tituloHeader h5{
    text-align: center;
    color: #333333;
    justify-content: center;
    font-weight: bold;
  }
</style>
