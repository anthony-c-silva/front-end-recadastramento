<template>
  <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">{{ label }}</span>
  <q-input dense :bg-color="$q.dark.isActive ? 'black' : 'accent'" outlined v-model="inputValor" :label="labelIn"
    :type="isPwd ? type : 'text'" :placeholder="placeholder" lazy-rules
    :rules="[val => !!val || 'Insira um e-mail válido.', emailValida]" :style="styles">
    <template v-if="btnVisualizar" v-slot:append>
      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
    </template>
    <TooltipeMsg :texto="tooltipTxt"></TooltipeMsg>
  </q-input>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import TooltipeMsg from 'components/global/tooltip-msg.vue';

export default defineComponent({
  name: 'ReusableInput',
  components: {
    TooltipeMsg,
  },
  props: {
    width: String,
    size: String,
    labelIn: String,
    label: String,
    type: String as () => 'number' | 'text' | 'password' | 'email',
    placeholder: String,
    tooltipTxt: String,
    btnVisualizar: Boolean,
    rules: String,
    styles: String
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
  methods: {
    emailValida() {
      const emailPadrao = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPadrao.test(this.inputValor) || 'Email Inválido';
    },
  }
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
</style>
