<template>
    <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">{{ label }}</span>
    <q-input dense :bg-color="$q.dark.isActive ? 'black' : 'accent'" outlined :label="labelIn" :readonly="readOnly"
      :type="type" :placeholder="placeholder" lazy-rules :model-value="text" @update:model-value="(value) => emit('update:text', value)"
      :rules="[val => !!val || 'Insira um e-mail válido.', emailValida]" :style="styles">
      <TooltipeMsg :texto="tooltipTxt"></TooltipeMsg>
    </q-input>
  </template>
  
  <script setup lang="ts">
  
  import { defineComponent, ref, watch } from 'vue';
  import TooltipeMsg from 'components/global/tooltip-msg.vue';
  
    defineProps({
      width: String,
      size: String,
      labelIn: String,
      label: String,
      type: String as () => 'email',
      placeholder: String,
      tooltipTxt: String,
      btnVisualizar: Boolean,
      rules: String,
      styles: String,
      text: {
        required: false,
        type: String,
      },
      readOnly: {
        required: false,
        type: Boolean
      }
    });

    const emit = defineEmits(['update:text']);

    const emailValida = (email: string) => {
        const emailPadrao = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPadrao.test(email) || 'Email Inválido';
    };
    
  </script>
  
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
  