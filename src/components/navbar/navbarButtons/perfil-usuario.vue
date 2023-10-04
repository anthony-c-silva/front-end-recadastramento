<template>
  <q-avatar
    size="40px"
    style="margin-right: 30px; user-select: none;"
    flat
    round
    dense
    @click="profile = !profile"
  >
    <img :src="usuario.usuarioFoto" />

    <q-menu
      transition-show="scale"
      transition-hide="scale"
      anchor="bottom left"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white'"
    >
      <q-list dense style="min-width: 100px">
        <q-item v-if="mostrarNome" dense>
          <span
            :style="{
              'font-size': '14px',
              color: '#1085BB',
              'white-space': 'nowrap',
              overflow: 'hidden',
              'text-overflow': 'ellipsis',
            }"
            class="q-pt-xs"
          >
            {{ usuario?.usuarioEmail }}
          </span>
        </q-item>

        <q-separator v-if="mostrarNome" inset />

        <q-item dense clickable v-close-popup>
          <q-item-section>Ajuda</q-item-section>
        </q-item>

        <q-item @click="usuario.loggout()" dense clickable v-close-popup>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-avatar>
</template>
<script lang="ts">
import { ref } from 'vue';
import { useUsuario } from 'src/stores/login/Usuario';

export default {
  name: 'PerfilUsuario',

  setup() {
    const usuario = useUsuario();
    usuario.setUser();

    return {
      usuario,
    };
  },
  data() {
    return {
      profile: ref(false),
      mostrarNome: ref(true),
      emailAluno: ref(''),
      avatarUrl: ref(''),
    };
  },
  mounted() {
    window.addEventListener('resize', this.redimencionar);
    this.redimencionar();
  },
  methods: {
    redimencionar() {
      if (window.innerWidth <= 600) {
        this.mostrarNome = true;
      } else {
        this.mostrarNome = false;
      }
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.redimencionar);
    },
  },
};
</script>
<style></style>
src/stores/login/Usuario
