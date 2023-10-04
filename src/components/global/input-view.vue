<template>
    <div class="q-pt-md q-pl-md">
      <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">{{ label }}</span>
      <q-input
        dense
        :bg-color="$q.dark.isActive ? 'black' : 'accent'"
        outlined
        :model-value="value"
        :label="label"
        :type="type"
        :mask="mask"
        :placeholder="placeholder"
        lazy-rules
        :label-color="'#4F4F4F'"
        :readonly="readonly"
      >

    </q-input>
    </div>
  </template>

  <script lang="ts">

  import { defineComponent } from 'vue';
  

  export default defineComponent({
    name: 'InputView',
    props: {
        readonly:Boolean,
        value:String,
        labelIn: String,
        label: String,
        type: String as () => 'number' | 'text' | 'password' | 'email' | 'date',
        placeholder: String,
        tooltipTxt: String,
        mask: String,
    }
  });
  </script>
  s
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
