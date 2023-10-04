<template>
  <q-tooltip
          class="bg-indigo"
          v-bind:style="
            $q.screen.lt.md ? { display: 'none' } : { display: '' }
          "
          anchor="center right"
          self="center left"
        >
          {{texto}}
  </q-tooltip>
</template>

<script lang="ts">
export default {
  name:'TooltipMsg',
  props:{
    texto: String
  }
}
</script>
