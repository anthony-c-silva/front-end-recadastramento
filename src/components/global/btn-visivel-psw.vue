<template v-slot:append>
  <q-icon
    :name="isPwd ? 'visibility_off' : 'visibility'"
    class="cursor-pointer"
    @click="isPwd = !isPwd"
  />
</template>
<script lang="ts">
import {ref} from 'vue';

export default {
  name:'BtnVisivelPsw',
  props:{
    estado: Boolean
  },
  setup(){
    let isPwd = ref(true)

    return{isPwd}
  }
}
</script>
