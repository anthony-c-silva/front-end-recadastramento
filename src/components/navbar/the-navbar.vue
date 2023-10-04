<template>
  <div
    reveal
    align="right"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white navbar'"
  >

    <!-- SWITCH DARK LIGHT -->
    <DarkModeToggle style="margin-right: 30px" />

    <!-- SELEÇÃO DE CURSO -->
    <NomeUsuario v-if="$q.screen.width >= 500" if="mostrarSelecionar" />

    <!-- PERFIL -->
    <PerfilUsuario />
  </div>
</template>

<script lang="ts">
import DarkModeToggle from './navbarButtons/dark-mode-toggle.vue';
import { ref } from 'vue'
import PerfilUsuario from 'src/components/navbar/navbarButtons/perfil-usuario.vue';
import NomeUsuario from 'src/components/navbar/navbarButtons/nome-usuario.vue';
// import LogoUniversidade from 'src/components/global/LogoUniversidade.vue';
export default {
  name: 'NavbarComponent',
  components: {
    DarkModeToggle,
    PerfilUsuario,
    NomeUsuario,
    // LogoUniversidade
  },
  data() {
      return {
          miniState: ref(true),
          mostraBotao: ref(false),
          mostrarSelecionar: ref(true),
          mostrarSidebar: ref(false),
          nomeAluno: ref(''),
          profile: ref(false),

      };
  },
  mounted() {
    window.addEventListener('resize', this.redimencionar);
    this.redimencionar();
  },
  methods: {
    redimencionar() {
      if (window.innerWidth <= 500) {
        this.mostraBotao = true;
        this.mostrarSidebar = true;
      } else {
        this.mostrarSidebar = false;
        this.mostraBotao = false;
      }
    },
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.redimencionar);
  },
};
</script>
<style>
.navbar {
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.5);
}
</style>
