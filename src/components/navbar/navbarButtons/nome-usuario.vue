<template>
  <span style="margin-right: 30px; user-select: none;">{{ nomeUsuario.usuarioNome }}</span>
</template>

<script lang="ts">
import { useUsuario } from 'src/stores/login/Usuario';
export default {
  name: 'NomeUsuario',
  setup() {
    const nomeUsuario = useUsuario();
    nomeUsuario.setUser();

    return {
      nomeUsuario,
    };
  },
};
</script>

src/stores/login/Usuario
