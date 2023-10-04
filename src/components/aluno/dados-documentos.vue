<template>
  <div class="container">
      <q-form @submit="avancar" class="q-gutter-md">
        <div class="row justify-center">
          <div v-if="docConfigRecad.exigeDocIdentidade !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                :tooltipTxt= mensagemArquivo+docConfigRecad.tamAnexosKb+tipoMedida
                :multiple = false
                label = "Cópia de Identidade"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.DocIdentidade = $event"
                lazy-rules
                :rules="'Este campo é obrigatório'"
              >
              </filePiker>
          </div>

          <div v-if="docConfigRecad.exigeConclEnsMedio !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia Conclusão Ens. Médio"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.ConclEnsMedio = $event"
              >
              </filePiker>
          </div>
        </div>
        <div v-if="docConfigRecad.exigeComprovEstagio !== 'N'" class="row justify-center">
          <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia certificado Estágio"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.ComprovEstagio = $event"
              >
              </filePiker>
          </div>
          <div v-if="docConfigRecad.exigeProvaColacao !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia Prova Colação"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.ProvaColacao = $event"
              >
              </filePiker>
          </div>
        </div>
        <div v-if="docConfigRecad.exigeCertNasc !== 'N'" class="row justify-center">
          <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia Certidão de Nascimento"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.CertNasc = $event"
              >
              </filePiker>
          </div>
          <div v-if="docConfigRecad.exigeCertCasamento !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia certidão de casamento"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.CertCasamento = $event"
              >
              </filePiker>
          </div>
        </div>
        <div v-if="docConfigRecad.exigeTituloEleitor !== 'N'" class="row justify-center">
          <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia título eleitoral"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.TituloEleitor = $event"
              >
              </filePiker>
          </div>
          <div v-if="docConfigRecad.exigeAtoNatural !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
              <filePiker
                tooltip-txt="Insira um arquivo!"
                :multiple = false
                label = "Cópia ato natural"
                lazy-rules
                :rules="'Este campo é obrigatório'"
                :maxFileSize = docConfigRecad.tamAnexosKb*1000
                @update:value="dadosDocumentos.AtoNatural = $event"
              >
              </filePiker>
          </div>
        </div>
        <div class="row justify-between">
            <div class="col-md-2">
              <q-btn @click="voltar" icon="mdi-chevron-left" style="width: 100%;" color="primary" label="Voltar" class="q-ml-sm" />
            </div>
            <div class="col-md-2">
              <q-btn type="submit" style="width: 100%;" icon-right="mdi-chevron-right" color="primary" label="Continue" />
            </div>
        </div>
      </q-form>
  </div>
</template>

<script setup lang="ts">
  import filePiker from '../global/file-picker.vue';

  import { ref, watch, onMounted } from 'vue';
  import { Recad } from 'src/model/aluno/Recad';
  import { axiosStore } from 'src/stores/AxiosStore';
  import { useQuasar } from 'quasar';

  const mensagemArquivo = ref('Adicione um arquivo de no máximo ');
  const tipoMedida = ref(' kB');
  const axios = axiosStore();
  const $q = useQuasar();

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

  const dadosRecad = ref(new Recad());
  const dadosDocumentos = ref({

    idPedidoRecad: 0 ,
    DocIdentidade: '',
    ConclEnsMedio: '',
    ComprovEstagio: '',
    ProvaColacao: '',
    CertNasc: '',
    CertCasamento: '',
    TituloEleitor: '',
    AtoNatural: '',
  })

  const docConfigRecad = ref ({
    idPedidoRecad: 0 ,
    exigeDocIdentidade: '',
    exigeConclEnsMedio: '',
    exigeComprovEstagio: '',
    exigeProvaColacao: '',
    exigeCertNasc: '',
    exigeCertCasamento: '',
    exigeTituloEleitor: '',
    exigeAtoNatural: '',
    tamAnexosKb: 0,
  })

  const getDadosPedido = async (idRecad: string) => {
    try {
      dadosRecad.value = await axios.getDados('/aluno/recad?idConfigRecad='+idRecad)

        docConfigRecad.value.idPedidoRecad = props.idPedidoRecad ? Number(props.idPedidoRecad) : 0;
        docConfigRecad.value.exigeDocIdentidade = dadosRecad.value.exigeDocIdentidade ? dadosRecad.value.exigeDocIdentidade : '';
        docConfigRecad.value.exigeConclEnsMedio = dadosRecad.value.exigeConclEnsMedio ? dadosRecad.value.exigeConclEnsMedio : '';
        docConfigRecad.value.exigeComprovEstagio = dadosRecad.value.exigeComprovEstagio ? dadosRecad.value.exigeComprovEstagio : '';
        docConfigRecad.value.exigeProvaColacao = dadosRecad.value.exigeProvaColacao ? dadosRecad.value.exigeProvaColacao : '';
        docConfigRecad.value.exigeCertNasc = dadosRecad.value.exigeCertNasc ? dadosRecad.value.exigeCertNasc : '';
        docConfigRecad.value.exigeCertCasamento = dadosRecad.value.exigeCertCasamento ? dadosRecad.value.exigeCertCasamento : '';
        docConfigRecad.value.exigeTituloEleitor = dadosRecad.value.exigeTituloEleitor ? dadosRecad.value.exigeTituloEleitor : '';
        docConfigRecad.value.exigeAtoNatural = dadosRecad.value.exigeAtoNatural ? dadosRecad.value.exigeAtoNatural : '';
        docConfigRecad.value.tamAnexosKb =  dadosRecad.value.tamAnexosKb ? dadosRecad.value.tamAnexosKb : 0;

    } catch (error) {
      console.error(error)
    }
  }
  const emit = defineEmits(['eventDadosDocumentos', 'eventStep']);

  const avancar = async () => {
    try {
      await salvarDadosDocumentos()
      emit('eventStep', 1)
    } catch (error){
      console.error(error)
    }
  }

  const voltar = () => {
    emit('eventStep', -1)
  }

  const salvarDadosDocumentos = async () => {
    try {
      let response = '';

      // montar objeto para post
      // [
      //  {
      //   "arquivoString": "string",
      //   "nome": "string",
      //   "extensao": "string"
      //  }
      //]

      // response = await axios.postDados('/aluno/pedido/basicos', props.idRecad)
      console.log(dadosDocumentos);
      if (response === '') {
        $q.notify({
          color: 'positive',
          icon: 'check',
          message: 'Dados documentos salvos!',
        })
        emit('eventStep', 1)
      }
    }catch (error){
      console.error(error)
    }
  }

  watch( () => [docConfigRecad.value.exigeDocIdentidade,
                docConfigRecad.value.exigeConclEnsMedio,
                docConfigRecad.value.exigeComprovEstagio,
                docConfigRecad.value.exigeProvaColacao,
                docConfigRecad.value.exigeCertNasc,
                docConfigRecad.value.exigeCertCasamento,
                docConfigRecad.value.exigeTituloEleitor,
                docConfigRecad.value.exigeAtoNatural,], () => {
    emit('eventDadosDocumentos', docConfigRecad.value);
  });

</script>
<style lang="scss" scoped>
 .container {
        width: 100%;
    }
</style>
