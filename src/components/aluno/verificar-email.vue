<template>
  <div class="container">
    <div :class="$q.screen.lt.sm ? 'textoTituloSm' : 'textoTitulo'">
      <span :class="$q.dark.isActive ? 'corDark' : 'corLight'">
        Verificação de E-mail</span>
    </div>
    <div :class="$q.screen.lt.sm ? 'textoSubSm' : 'textoSub'">
      <span :class="$q.dark.isActive ? 'corDark' : 'corLight'">
        Digite o seu E-mail para confirmar sua identidade
      </span>
    </div>
    <div class="q-gutter-md no-wrap"
      v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '50%' } && $q.screen.lt.md ? { width: '70%' } : { width: '50%' }">
      <q-form @submit="enviar">
        <div class="imputEmail">
          <InputTextfieldEmail labelIn="E-mail" @update:value="imputEmail"
            placeholder="Seu e-mail | ex: eusouavmb@avmb.com.br" tooltipTxt="Insira o seu melhor e-mail" type="email"
            styles="font-size: 1rem">
          </InputTextfieldEmail>
        </div>
        <div class=" items-center botaoEnviar">
          <div>
            <ButtonEnviar label="Verificar E-mail" color="primary" type="submit"
              :style="$q.screen.lt.sm ? 'width: 70%;' : 'width: 50%;'" :loading="enviarEmail"></ButtonEnviar>
          </div>
        </div>
        <q-dialog v-model="modal" persistent>
          <q-card :style="$q.dark.isActive ? 'background: black' : 'background: #8EC0E4 '">
            <q-card-section align="center">
              <div class="text-h6 bold">Confirmação de e-mail</div>
            </q-card-section>

            <q-card-section class="q-pt-none" align="center">
              Para seguir com o seu recadastramento é preciso confirmar seu email.
              Certifique-se que o e-mail abaixo está correto:
            </q-card-section>

            <q-card-section class="q-pt-none" align="center"
              :style="$q.dark.isActive ? 'color: #8EC0E4' : 'color: white '">
              {{ usuarioEmail.email }}
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat label="CONFIRMO" color="primary" v-close-popup @click="enviaCodigo" />

              <q-btn flat label="EDITAR E-MAIL" color="accent" v-close-popup @click="enviarEmail = !enviarEmail" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-form>
    </div>
  </div>
</template>
<script lang="ts">
import InputTextfieldEmail from 'components/global/input-textfield-email.vue';
import ButtonEnviar from 'components/global/button.vue';

import { reactive, ref } from 'vue';
import { axiosStore } from 'src/stores/AxiosStore';
import { useQuasar } from 'quasar';
import { Notify } from 'quasar';
import { alunoStore } from 'src/stores/aluno/AlunoStore';
export default {
  name: 'VerificaEmail',
  components: { InputTextfieldEmail, ButtonEnviar },

  setup() {
    const usuarioEmail = reactive({ email: '', });
    const modal = ref(false);
    const confirmado = ref(false);
    let enviarEmail = ref(false);
    const quasar = useQuasar();
    const axios = axiosStore();
    const putAluno = alunoStore()
    const dados = {};
    const dadosEditarEmail = {}
    const alunoEmail = reactive({
      username: '',
      password: '',
    });
    return {
      usuarioEmail,
      enviarEmail,
      modal,
      quasar,
      confirmado,
      axios,
      alunoEmail,
      dados,
      putAluno,
      dadosEditarEmail
    }
  },
  methods: {
    imputEmail(valor: string) {
      this.usuarioEmail.email = valor;
    },
    async enviaCodigo() {
      this.enviarEmail = !this.enviarEmail

      this.dados = {
        idConfigRecad: this.$route.query.idConfig,
        email: this.usuarioEmail.email,
      };
      this.dadosEditarEmail = {
        email: this.usuarioEmail.email,
        idConfigRecad: this.$route.query.idConfig,
      }
      try {
        console.log('AQUIIII',this.$route.query.op);

        if(this.$route.query.op === 'S'){
          await this.putAluno.putEditarEmail(this.dadosEditarEmail);
          Notify.create({
            color: 'positive',
            message: 'Seu e-email foi editado e está sendo enviado.',
          })
        }else{
          await this.axios.postDados('/aluno/recad/email/validar', this.dados);
          Notify.create({
            color: 'positive',
            message: 'Seu e-email está sendo enviado.',
          })
        }
        this.$router.push({
          name: 'verifica-codigo',
          query: {
            idConfig: this.$route.query.idConfig,
            email: this.usuarioEmail.email,
          }
        })

      } catch (err: unknown) {
        this.enviarEmail = false
      }

    },
    async enviar() {
      this.enviarEmail = true
      this.modal = true;
    }
  }
};
</script>
<style lang="scss" scoped>
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
  padding-top: 5%;
}

.textoTitulo {
  text-align: center;
  color: #333333;
  font-weight: bold;
  font-size: 2.5rem;
}

.textoSub {
  text-align: center;
  color: #333333;
  font-weight: 700;
  font-size: 1rem;
}

.textoSubSm {
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.textoTituloSm {
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
}

.botaoEnviar {
  padding-top: 10%;
}

.bold {
  font-weight: bold;
}
</style>
