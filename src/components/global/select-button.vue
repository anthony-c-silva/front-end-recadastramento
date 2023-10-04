<template>
  <div >
    <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">{{ label }}</span>
    <q-select
      :bg-color="$q.dark.isActive ? 'black' : 'accent'"
      :popup-content-style="{ backgroundColor: $q.dark.isActive ? 'black' : 'accent' }"
      outlined
      :model-value="selected"
      :options="options"
      :emit-value="emitValue"
      @update:model-value="(value) => emit('update:selected', value)"
      :map-options="mapOptions"
      :disable="desabilitar"
      label="Escolha uma opção"
      dense
      :lazy-rules="lazyRules"
      :rules="[(val) => !!val || rules ]"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps({
    selected: {
      required: false,
      type: [String, Number, Object]
    },
    options: Array,
    label: String,
    emitValue: Boolean,
    mapOptions: Boolean,
    desabilitar: {
      type: Boolean,
      required: false
    },
    rules: String,
    lazyRules: Boolean,
  });
  
  const emit = defineEmits(['update:selected']);

</script>

<style lang="scss">
.span {
  font-size: 14px;
  font-weight: 600;
  color: #4f4f4f;
}
</style>