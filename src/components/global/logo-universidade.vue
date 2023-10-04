<template>
  <q-img
    src="../../assets/login/avmb.png"
    
    v-bind:style="$q.screen.lt.md ? {'width': tamanhoMd} : {'width': tamanho}"
  />
</template>
<script lang="ts">
 export default{
   name: 'LogoUniversidade',
   props:{
    tamanhoMd: String,
    tamanho: String
   }
 }
 </script>
