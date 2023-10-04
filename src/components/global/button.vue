<template>

  <q-btn
    :label="label"
    :type="type"
    :color="color"
    style="width: 60%; height: 50%;"
    push
    
  />

</template>

<script lang="ts">
export default {
  name:'ButtonPrincipal',
  props:{
    label: String,
    type: String,
    color: String,
  }
}
</script>
