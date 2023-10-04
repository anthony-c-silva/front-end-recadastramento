<template>
    <div>
      <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">{{ label }}</span>
      <q-input
        dense
        :bg-color="$q.dark.isActive ? 'black' : 'accent'"
        outlined
        :label="labelIn"
        :readonly="readonly"
        :type="type"
        :mask="mask"
        :placeholder="placeholder"
        :model-value="text"
        @update:model-value="(value) => emit('update:text', value)"
        :disable="desabilitar"
        lazy-rules
        :rules="[(val) => !!val || rules ]"
      >
      <TooltipeMsg :texto="tooltipTxt" ></TooltipeMsg>
    </q-input>
    </div>
  </template>
  
  <script setup lang="ts">
  import TooltipeMsg from 'components/global/tooltip-msg.vue';

  defineProps({
    text: {
      required: false,
      type: [String,Number]
    },
    readonly: {
      required: false,
      type: Boolean,
    },
    width: String,
    size: String,
    labelIn: String,
    label: String,
    type: String as () => 'number' | 'text' | 'password' | 'email' | 'date',
    placeholder: String,
    tooltipTxt: String,
    btnVisualizar: Boolean,
    rules: String,
    mask: String,
    desabilitar: Boolean,
  });
    const emit = defineEmits(['update:text']);

  </script>

  <style lang="scss">
  .mainImput{
    display: flex;
  }
  .span {
    font-size: 14px;
    font-weight: 600;
    color: #4f4f4f;
  }
  </style>
  