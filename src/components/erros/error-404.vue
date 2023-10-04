<template>
  <div
    class="fullscreen text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">
        <q-img
          src="../../assets/error-404.png"
          style="width: 30vw"
        />
      </div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        text-color="white"
        unelevated
        to="/login"
        label="Voltar para o Login"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound',
});
</script>
