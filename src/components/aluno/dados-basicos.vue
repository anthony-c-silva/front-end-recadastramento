<template>
    <div class="container">
      <q-form @submit="avancar" class="q-gutter-md">
      <div v-if="$q.screen.width < 768" class="row justify-center">
        <h5 class="subTitulo" :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4F4F4F;'">Dados Básicos:</h5>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 q-pl-md q-pr-md q-pt-md">
            <inputTextfield :label="'Nome Completo'" :readonly="true" lazy-rules :rules="'Este campo é obrigatório'" :type="'text'" :label-in="'Seu nome social'"
                :tooltip-txt="'Seu nome social'" v-model:text="dadosBasicos.nomeSocial"
            ></inputTextfield>
        </div>
        <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
            <inputTextfield :label="'CPF'" :type="'text'" lazy-rules :rules="'Este campo é obrigatório'" :label-in="'Digite seu CPF'"
                :tooltip-txt="'Digite seu CPF'" :mask="'###.###.###-##'" v-model:text="dadosBasicos.cpf"
            ></inputTextfield>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 q-pl-md q-pr-md">
            <inputTextfield :label="'Nome da Mãe'" :type="'text'" lazy-rules :rules="'Este campo é obrigatório'" :label-in="'Digite o nome completo de sua mãe'"
                :tooltip-txt="'Digite o nome completo'" v-model:text="dadosBasicos.nomeMae"
            ></inputTextfield>
        </div>
        <div class="col-12 col-md-4 q-pl-md q-pr-md">
            <selectButton :label="'Sexo'" :options="optionsSexo" :lazy-rules="true" :rules="'Este campo é obrigatório'" :emit-value="true" :map-options="true" v-model:selected="dadosBasicos.sexo">
            </selectButton>
        </div>
        <div class="col-12 col-md-2 q-pl-md q-pr-md">
            <inputTextfield :type="'date'" :label="'Data de Nascimento'" :placeholder="'dd/mm/aaaa'"
                :tooltip-txt="'Sua data de nascimento'" lazy-rules :rules="'Este campo é obrigatório'" v-model:text="dadosBasicos.dataNascimento">
            </inputTextfield>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 q-pl-md q-pr-md">
            <inputEmail :label="'E-mail'" :label-in="'Digite seu melhor e-mail'"  type="email" :read-only="true"
                :tooltip-txt="'Seu e-mail'" v-model:text="modelEmail"></inputEmail>
        </div>
        <div class="col-12 col-md-6 q-pl-md q-pr-md">
            <inputTextfield :type="'text'" :mask="'(##) #####-####'" :label="'Celular'" :label-in="'Somente números'"
                v-model:text="dadosBasicos.celular" :tooltip-txt="'Número de seu celular'" :placeholder="'(00) 00000-0000'"
            ></inputTextfield>
        </div>

      </div>

      <div class="row justify-between">
            <div class="col-md-2">
              <q-btn @click="sair" icon="fa-solid fa-right-from-bracket flip-horizontal" style="width: 100%;" color="primary" label="Voltar" class="q-ml-sm" />
            </div>
            <div class="col-md-2">
              <q-btn type="submit" style="width: 100%;" icon-right="mdi-chevron-right" color="primary" label="Continue" />
            </div>
      </div>

      </q-form>
    </div>
  </template>
  <script setup lang="ts">
  import inputTextfield from '../global/input-textfield-vmodel.vue';
  import inputEmail from '../global/input-textfield-email-vmodel.vue';
  import selectButton from 'src/components/global/select-button.vue';
  import { ref, onMounted } from 'vue';
  import { useUsuario } from 'src/stores/login/Usuario';
  import { axiosStore } from 'src/stores/AxiosStore';
  import { useQuasar } from 'quasar';
  import { DadosRecad } from 'src/model/aluno/DadosRecad';
  import { DadosBasicosDto } from 'src/model/aluno/DadosBasicosDto';
  import { verificarMudancas } from 'src/services/Utils';
  import { useRouter } from 'vue-router';

  const usuario = useUsuario();
  const axios = axiosStore();
  const $q = useQuasar();
  const $router = useRouter();

  const props = defineProps({
    idRecad: {
      required: false,
      type: String
    },
    idPedidoRecad: {
      required: false,
      type: String
    },
  })

  onMounted(async () => {
    if (props.idRecad != null) {
      await getDadosPedido(props.idRecad)
    }
  })

  const dadosRecadSie = ref(new DadosRecad());
  const dadosRecadPedido = ref(new DadosRecad());
  const dadosBasicos = ref (new DadosBasicosDto());
  const modelEmail = ref ();

  const getDadosPedido = async (idRecad: string) => {
    try {

      dadosRecadSie.value = await axios.getDados('/aluno/recad/dados/sie?idConfigRecad='+idRecad)
      dadosRecadPedido.value = await axios.getDados('/aluno/recad/dados/pedido?idConfigRecad='+idRecad)

      dadosRecadPedido.value.dadosBasicosDto.idConfigRecad = Number(idRecad);
      dadosRecadSie.value.dadosBasicosDto.idConfigRecad = Number(idRecad);
      modelEmail.value = dadosRecadPedido.value.email

      dadosBasicos.value.idConfigRecad = Number(idRecad)

      let dadosMudou = verificarMudancas(dadosRecadSie.value.dadosBasicosDto, dadosRecadPedido.value.dadosBasicosDto)

      if (dadosMudou === true) {
        dadosBasicos.value = dadosRecadPedido.value.dadosBasicosDto!
      } else {
        dadosBasicos.value = dadosRecadSie.value.dadosBasicosDto!
      }

    } catch (error) {
      console.error(error)
    }

  }

  const optionsSexo = [
    {
        value: 'M',
        label: 'Masculino'
    },
    {
        value: 'F',
        label: 'Feminino'
    }
  ]

  const emit = defineEmits(['eventDadosBasicos', 'eventStep']);

  const avancar = async () => {
    try {
      await salvarDadosBasicos()
    } catch (error){
      console.error(error)
    }

  }

  const sair = () => {
    $router.push({ name: 'escolha-recads' });
  }

  const salvarDadosBasicos = async () => {
    try {
      let response = '';
      response = await axios.putDados('/aluno/pedido/basicos', dadosBasicos.value)

      if (response === '') {
        $q.notify({
          color: 'positive',
          icon: 'check',
          message: 'Dados básicos salvos!',
        })

        emit('eventStep', 1)
      }
    }catch (error){
      console.error(error)
    }
  }

  </script>
  <style lang="scss" scoped>
    .container {
        width: 100%;
    }
    .subTitulo {
      font-size: 1.3rem;
      font-weight: 600;
    }
  </style>
