<template>
  <div class="container">
    <div :class="$q.screen.lt.sm ? 'textoTituloSm' : 'textoTitulo'">
      <span :class="$q.dark.isActive ? 'corDark' : 'corLight'">
        Verificação de E-mail</span>
    </div>
    <div :class="$q.screen.lt.sm ? 'textoSubSm' : 'textoSub'">
      <span :class="$q.dark.isActive ? 'corDark' : 'corLight'">
        Digite o código enviado para seu E-mail para confirmar sua identidade
      </span>
    </div>

    <q-form @submit="validar">
      <div class="paddingTop containerInput">
        <div class="inputCodigo">
          <InputTextfieldCodigo type="text" styles="font-size: 1.5rem" placeholder="0 0 0 0 0 0"
            @update:value="inputCodigo"></InputTextfieldCodigo>
        </div>
      </div>

      <div :class="$q.screen.lt.sm ? 'textoSubSm' : 'textoSub'">
        <span :class="$q.dark.isActive ? 'corDark' : 'corLight'">
          O código não chegou ?
        </span>
      </div>

      <div :class="$q.screen.lt.sm ? 'textoLinkSm' : 'textoLink'">
        <q-btn @click="reenviar"> Reenviar código </q-btn>

        <q-btn @click="editarEmail"> Editar E-mail </q-btn>
      </div>

      <div class="containerBotao">
        <div>
          <ButtonEnviar label="Validar" color="primary" type="submit"></ButtonEnviar>
        </div>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import InputTextfieldCodigo from 'src/components/global/input-textfield-codigo.vue';
import ButtonEnviar from 'components/global/button.vue';
import { axiosStore } from 'src/stores/AxiosStore';
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';

export default {
  name: 'VerificaCodigo',
  components: {
    InputTextfieldCodigo,
    ButtonEnviar,
  },
  setup() {
    const route = useRoute();
    const axios = axiosStore();
    let codigoVerificacao = ref();
    const  opEditEmail = ref('N');
    return {
      axios,
      route,
      codigoVerificacao,
      opEditEmail,
    };


  },

  methods: {
    inputCodigo(valor: string) {
      this.codigoVerificacao = valor
    },
    async validar() {
      const dados = {
        idConfigRecad: this.$route.query.idConfig,
        codigoDeValidacao: this.codigoVerificacao.replaceAll(" ", "")
      };
      try {
        await this.axios.postDados(
          'aluno/recad/email/validar/codigo',
          dados
        );
        Notify.create({
          color: 'positive',
          message: "Código validado com sucesso.",
        })

        this.$router.push({ name: 'aluno-recadastramento',  query: { id: this.$route.query.idConfig || 0 } })

      } catch (err: unknown) {
        console.log(err)
      }
    },
    async reenviar() {
      const dados = {
        idConfigRecad: this.$route.query.idConfig,
        email: this.$route.query.email,
      };

      try {
        await this.axios.postDados(
          '/aluno/recad/email/reenviar',
          dados
        );
        Notify.create({
          color: 'positive',
          message: "Seu e-email está sendo enviado.",
        })
      } catch (error) {
        console.log(error)
      }

    },
    async editarEmail(){
      this.opEditEmail = 'S';

      this.$router.push({
          name: 'verifica-email',
          query: {
            idConfig: this.$route.query.idConfig,
            op: this.opEditEmail,
          }
        })
    }
  },
};
</script>
<style  lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.container>div {
  width: 100%;
  height: 100%;
  text-align: center;
}

.containerInput {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
}

.containerInput>div {
  min-width: 70%;
  max-width: 70%;
  height: 100%;
  text-align: center;
}

.containerBotao {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
}

.containerBotao>div {
  padding-top: 10%;
  min-width: 70%;
  max-width: 70%;
  height: 100%;
  text-align: center;
}

.textoTitulo {
  text-align: center;
  color: #333333;
  font-weight: bold;
  font-size: 2.5rem;
  padding-top: 5%;
}

.textoTituloSm {
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  padding-top: 10%;
}

.textoSub {
  text-align: center;
  color: #333333;
  font-weight: 700;
  font-size: 1rem;
  padding-top: 3%;
}

.textoSubSm {
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  padding-top: 10%;
}

.textoLink {
  text-align: center;
  color: #1976d2;
  font-weight: 700;
  font-size: 1rem;
  padding-top: 5%;
}

.textoLinkSm {
  text-align: center;
  font-weight: 700;
  color: #1976d2;
  font-size: 0.9rem;
  padding-top: 5%;
}

.corLight {
  color: #333333;
}

.corDark {
  color: #ffffff;
}

.paddingTop {
  padding-top: 5%;
}

.espaçoCodigo {
  padding-left: 2%;
}

.botaoValidar {
  text-align: center;
}

.botaoValidarSm {
  text-align: center;
}

.imputCodigo {
  padding-top: 5%;
  padding-bottom: 8%;
}
</style>
