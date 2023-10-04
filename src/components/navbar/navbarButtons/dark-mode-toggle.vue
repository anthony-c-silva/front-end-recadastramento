<template>
  <q-toggle
      v-model="darkMode"
      checked-icon="dark_mode"
      color="primary"
      unchecked-icon="light_mode"
      size="lg"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { useQuasar } from 'quasar';

  export default defineComponent({
      setup () {
          const darkMode = ref(false)
          const $q = useQuasar()

          watch(darkMode, (darkMode) => {
              $q.dark.set(darkMode)
              $q.localStorage.set('darkMode', darkMode)
          })

          onMounted(() => {
              const darkModeIsActive = $q.localStorage.getItem('darkMode')
              if (darkModeIsActive) {
                  darkMode.value = true
              }
          })

          return{
              darkMode
          }
      }
  })
</script>
