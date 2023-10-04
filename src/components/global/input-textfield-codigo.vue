<template>
  <q-input dense :bg-color="$q.dark.isActive ? 'black' : 'accent'" outlined v-model="inputValor" mask="# # # # # #"
    :type="isPwd ? type : 'text'" :placeholder="placeholder" lazy-rules :rules="[(val) => val.length == 11]"
    class="imputCodigo" :style="styles">
  </q-input>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ReusableInput',
  props: {
    width: String,
    size: String,
    labelIn: String,
    label: String,
    type: String as () => 'number' | 'text' | 'password' | 'email',
    placeholder: String,
    tooltipTxt: String,
    btnVisualizar: Boolean,
    styles: String,

  },
  emits: ['update:value'], // Emitirá um evento para atualização do valor
  setup(props, { emit }) {
    const inputValor = ref('');
    let isPwd = ref(true);
    //Monitorar alterações no inputValue e emitir evento quando alterado
    watch(inputValor, (newValue) => {
      emit('update:value', newValue);
    });

    return {
      inputValor,
      isPwd
    };
  },
});
</script>
s
<style lang="scss">
.mainImput {
  display: flex;
}

.span {
  font-size: 18px;
  font-weight: 600;
  color: #4f4f4f;
}

.imputCodigo input {
  text-align: center;
}
</style>
