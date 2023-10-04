<template>
  <div class="container">
    <div v-if="$q.screen.width >= 800" class="no-wrap items-center justify-around" style="height: 100vh">
      <div class="slogan">
        <h4 class="textoSlogan">
          "Renove sua conexão, atualize sua história. Recadastre-se e faça parte
          do próximo capítulo."
        </h4>
      </div>
      <div class="imagem">
        <q-img style="width: 25vw" src="../../assets/login/img-slogan.png" />
      </div>
      <div></div>
    </div>
    <div class="login column no-wrap items-center justify-around" style="height: 100vh">
      <q-card class="borda column items-center shadow-8 borderRadius justify-evenly"
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '380px' }">
        <LogoUniversidade tamanho="50%" tamanhoMd="50%" class="logoUni no-wrap"></LogoUniversidade>

        <q-form class="q-gutter-md column form no-wrap" style="width: 85%" @submit="login">
          <InputTextfield labelIn="Login" v-model="usuarioLogin.username" placeholder="Sua Matrícula | Ex 202323456"
            @update:value="imputLogin" tooltipTxt="Insira seu número de matricula." type="text" style="font-size: 1.5rem"
            rules="Insira um número válido." data-cy="main-login-login">
          </InputTextfield>

          <InputTextfield labelIn="Senha" v-model="usuarioLogin.password" placeholder="Insira sua senha"
            @update:value="imputSenha" tooltipTxt="Insira sua senha de acesso." type="password" :btnVisualizar="true"
            rules="Insira uma senha." data-cy="main-login-senha">
          </InputTextfield>

          <div class="column items-center botaoEntrar">
            <ButtonPrimary label="Entrar" color="primary" type="submit" :loading="loading" data-cy="main-login-entrar"></ButtonPrimary>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>
<script lang="ts">
import InputTextfield from 'components/global/input-textfield.vue';
import ButtonPrimary from 'components/global/button.vue';
import LogoUniversidade from '../global/logo-universidade.vue';

import { useUsuario } from 'src/stores/login/Usuario';
import { useAuth } from 'src/stores/login/Auth';
import { reactive, ref } from 'vue';


import { useQuasar } from 'quasar';
import { axiosStore } from 'src/stores/AxiosStore';

export default {
  name: 'mainLoginComponent',
  components: {
    InputTextfield,
    ButtonPrimary,
    LogoUniversidade,
  },
  data() {
    return {
      dadosUsuario: {}
    }

  },
  setup() {
    const axios = axiosStore();
    const auth = useAuth();
    const usuario = useUsuario();
    const quasar = useQuasar();
    const usuarioLogin = reactive({
      username: '',
      password: '',
    });
    let loading = ref(false);
    let isPwd = ref(true);

    return {
      usuario,
      usuarioLogin,
      loading,
      auth,
      quasar,
      isPwd,
      axios,
    };
  },
  methods: {
    imputLogin(valor: string) {
      this.usuarioLogin.username = valor;
    },
    imputSenha(valor: string) {
      this.usuarioLogin.password = valor;
    },
    async login() {
      this.loading = true;
      const dados = {
        username: this.usuarioLogin.username,
        password: this.usuarioLogin.password,
      };
      try {
        const data = await this.axios.postDados('/api/auth/login', dados);
        this.auth.setToken(data.accessToken);

        this.dadosUsuario = await this.usuario.setUser();

        const grupo = this.dadosUsuario;

        if (grupo && Array.isArray(grupo)) {
          grupo.forEach((dado: { nome?: string }) => {
            if (dado?.nome === 'Portal do Aluno') {
              //this.$router.push({ name: 'verifica-email' });
              // this.$router.push({ name: 'aluno-recadastramento' });
              this.$router.push({ name: 'escolha-recads' });
            }
            if (dado?.nome === 'PGD ADM') {
              this.$router.push({ name: 'administrador-home' });
            }
            if (dado?.nome?.trim() === 'PGD Secretaria') {
              this.$router.push({ name: 'secretaria-home' });
            }
          });
        }
      } catch (err: unknown) {
        this.loading = false;
      }
    },
  },
  mounted() {
    useQuasar();
    this.auth.clear();
  },
  created() {
    this.auth.clear();
  },
};
</script>

<style lang="scss" scoped>
.imagem {
  padding-top: 3%;
  text-align: center;
}

.slogan {
  padding: 8% 6% 6% 6%;
}

.textoSlogan {
  text-align: center;
  color: #8ec0e4;
  font-weight: bold;
  user-select: none;
}

.login {
  background-color: #1085bb;
  background-image: linear-gradient(180deg, #1085bb, #8ec0e4);
}

.container {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.container>div {
  width: 100%;
  height: 100%;
}

.borda {
  padding-top: 6%;
  padding-bottom: 6%;
}

.form {
  padding-top: 15%;
}

.botaoEntrar {
  padding-top: 10%;
}

.borderRadius {
  border-radius: 10px;
}

.txtNone {
  text-decoration: none;
}

.cinzaB {
  color: $accent;
  font-weight: 800;
}

.primary {
  color: $primary;
}

.bgPrimary {
  background-color: $primary;
}
</style>
