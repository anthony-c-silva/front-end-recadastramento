<template>
  <div class="q-pl-md q-pr-md q-b-md">
    <div class="q-pa-md">

      <div class="row justify-center q-pb-md">
        <h4 class="tituloHeader" :style="$q.dark.isActive ? 'color: #4CAF50;' : 'color:#4CAF50;'">Recadastramento concluído!!</h4>
      </div>

      <div class="row justify-center q-pa-lg">
        <h5 class="subTitulo" :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4F4F4F;'">Acompanhe o fluxo do Recadastramento:</h5>
      </div>

      <div class="row justify-center">

        <logsPedido :idRecad = $route.query.id?.toString() ></logsPedido>

      </div>

      <div class="row justify-between q-pt-lg">
        <div class="col-md-1">
          <q-btn @click="sair" icon="fa-solid fa-right-from-bracket flip-horizontal" style="width: 100%;" color="primary" label="Sair" class="q-ml-sm" />
        </div>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">

  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import logsPedido from 'src/components/global/logs-pedido-copia.vue'

  const $router = useRouter();
  const $route = useRoute();
  const sair = () => {
    $router.push({name: 'escolha-recads'})
  }
</script>

<style lang="scss" scoped>
.tituloHeader {
    font-size: 2rem;
    font-weight: 600;
    user-select: none;
    text-align: center;
}
.subTitulo {
    font-size: 1.5rem;
    font-weight: 600;
    user-select: none;
    text-align: center;
}
</style>
