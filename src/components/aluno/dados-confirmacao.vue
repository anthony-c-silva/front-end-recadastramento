<template>
    <div class="container">
      <q-form @submit="continuar" class="q-gutter-md">

        <div class="row justify-center q-pb-md">
            <h5 class="titleConfirmar">Confirme seus dados:</h5>
        </div>

        <q-card>
          <q-card-section>
            <div class="row justify-center">
                <span class="cardTitle" :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'">Dados básicos:</span>
            </div>
            <div class="row">
                <div class="col-12 col-md-8 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'Nome Completo:'"
                        :value="dadosRecad.dadosBasicosDto?.nomeSocial"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'CPF:'"
                        :value="dadosRecad.dadosBasicosDto?.cpf"
                        :readonly="true"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-6 q-pl-md q-pr-md">
                    <inputView
                        :label="'Nome da mãe:'"
                        :value="dadosRecad.dadosBasicosDto?.nomeMae"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-3 q-pl-md q-pr-md">
                    <inputView v-if="dadosRecad.dadosBasicosDto?.sexo === 'M'"
                        :label="'Sexo:'"
                        :value="'Masculino'"
                        :readonly="true"
                    />
                    <inputView v-if="dadosRecad.dadosBasicosDto?.sexo === 'F'"
                        :label="'Sexo:'"
                        :value="'Feminino'"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-3 q-pl-md q-pr-md">
                    <inputView
                        :label="'Data de Nascimento:'"
                        :value="dadosRecad.dadosBasicosDto?.dataNascimento"
                        :readonly="true"
                        :type="'date'"
                    />
                </div>
            </div>

            <div class="row q-mb-md">
                <div class="col-12 col-md-6 q-pl-md q-pr-md">
                    <inputView :label="'E-mail:'" :readonly="true"
                        :value="dadosRecad.email"></inputView>
                </div>
                <div class="col-12 col-md-6 q-pl-md q-pr-md">
                    <inputView
                        :label="'Celular:'"
                        :value="dadosRecad.dadosBasicosDto?.celular"
                        :readonly="true"
                    />
                </div>

            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div class="row justify-center">
                <span class="cardTitle" :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'">Dados complementares:</span>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'Auto declaração racial:'"
                        :value="dadosRecad.dadosComplementaresDto?.etniaDto?.descricao"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'Nacionalidade:'"
                        :value="dadosRecad.dadosComplementaresDto?.nacionalidadeDto?.descricao"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                    <inputView v-if="dadosRecad.dadosComplementaresDto?.indDeficiencia === 'N'"
                        :label="'Possui Deficiência:'"
                        :value="'Não possui'"
                        :readonly="true"
                    />
                    <span  v-if="dadosRecad.dadosComplementaresDto?.indDeficiencia === 'S'"
                        :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">Possui deficiência(as)</span>
                    <q-select v-if="dadosRecad.dadosComplementaresDto?.indDeficiencia === 'S'"
                        multiple readonly :bg-color="$q.dark.isActive ? 'black' : 'accent'" class="selectDefic"
                        dense outlined label="Possios a(s) deficiência(s):" v-model="dadosRecad.dadosComplementaresDto.pedidoDeficRecad" emit-value map-options :options="options"
                        use-input use-chips stack-label
                    ></q-select>

                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-8 q-pl-md q-pr-md">
                    <inputView
                        :label="'Escola que cursou o ensino médio:'"
                        :value="dadosRecad.dadosComplementaresDto?.escolasRecadDto?.nomeEscola"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-4 q-pl-md q-pr-md">
                    <inputView
                        :label="'Ano que concluiu o Ens. Médio:'"
                        :value="dadosRecad.dadosComplementaresDto?.anoConcEnsMedio?.toString()"
                        :readonly="true"
                        :type="'text'"
                    />
                </div>
            </div>

            <div v-if="dadosRecad.dadosComplementaresDto?.indSemEscola === 'S'" class="row">
                <div class="col-12 col-md-12 q-pl-md q-pr-md">
                    <span>Não encontrei minha escola:</span>
                    <inputView
                        :label="'Justificativa:'"
                        :value="dadosRecad.dadosComplementaresDto.justEscola"
                        :readonly="true"
                    />
                </div>
            </div>
            <div class="row q-mb-md">
                <div class="col-12 col-md-12 q-pl-md q-pr-md">
                    <inputView
                        :label="'Dependência administrativa da escola:'"
                        :value="dadosRecad.dadosComplementaresDto?.depAdmEscola"
                        :readonly="true"
                    />
                </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div class="row justify-center">
                <span class="cardTitle" :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'">Endereço:</span>
            </div>
            <div class="row">
                <div class="col-12 col-md-3 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'CEP:'"
                        :value="dadosRecad.dadosEnderecoDto?.cep"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-6 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'Logradouro:'"
                        :value="dadosRecad.dadosEnderecoDto?.logradouro"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-3 q-pl-md q-pr-md q-pt-md">
                    <inputView
                        :label="'Número:'"
                        :value="dadosRecad.dadosEnderecoDto?.numero"
                        :readonly="true"
                    />
                </div>
            </div>

            <div class="row q-mb-md">
                <div class="col-12 col-md-3 q-pl-md q-pr-md">
                    <inputView
                        :label="'Bairro:'"
                        :value="dadosRecad.dadosEnderecoDto?.bairro"
                        :readonly="true"
                    />
                </div>
                <div class="col-12 col-md-6 q-pl-md q-pr-md">
                    <inputView
                        :label="'Cidade:'"
                        :value="dadosRecad.dadosEnderecoDto?.cidade?.nome"
                        :readonly="true"
                        :type="'text'"
                    />
                </div>
                <div class="col-12 col-md-3 q-pl-md q-pr-md">
                    <inputView
                        :label="'Estado:'"
                        :value="dadosRecad.dadosEnderecoDto?.estadoDto?.descricao"
                        :readonly="true"
                        :type="'text'"
                    />
                </div>
            </div>
          </q-card-section>
        </q-card>


        <q-card>
          <q-card-section>
            <div class="row justify-center">
                <span class="cardTitle" :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'">Documentos:</span>
            </div>
            <!-- se tiver um array object , fazer um for para diminuir os inputs -->
            <div class="row">
                <div v-if="docConfigRecad.exigeDocIdentidade !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.DocIdentidade.anexo' :tipo = 'documentos.DocIdentidade.tipoAnexo'  :nomeArquivo = 'documentos.DocIdentidade.nomeAnexo' label = 'Cópia de Identidade'></inputViewDoc>
                </div>
                <div v-if="docConfigRecad.exigeConclEnsMedio !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.ConclEnsMedio.anexo' :tipo = 'documentos.ConclEnsMedio.tipoAnexo'  :nomeArquivo = 'documentos.ConclEnsMedio.nomeAnexo' label = 'Cópia Conclusão Ens. Médio'></inputViewDoc>
                </div>

                <div v-if="docConfigRecad.exigeComprovEstagio !== 'N'"  class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.ComprovEstagio.anexo' :tipo = 'documentos.ComprovEstagio.tipoAnexo' :nomeArquivo = 'documentos.ComprovEstagio.nomeAnexo' label = 'Cópia certificado Estágio'></inputViewDoc>
                </div>
                <div v-if="docConfigRecad.exigeProvaColacao !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.ProvaColacao.anexo' :tipo = 'documentos.ProvaColacao.tipoAnexo' :nomeArquivo = 'documentos.ProvaColacao.nomeAnexo' label = 'Cópia Prova Colação'></inputViewDoc>
                </div>
                <div v-if="docConfigRecad.exigeCertNasc !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.CertNasc.anexo' :tipo = 'documentos.CertNasc.tipoAnexo' :nomeArquivo = 'documentos.CertNasc.nomeAnexo' label = 'Cópia Certidão de Nascimento'></inputViewDoc>
                </div>
                <div  v-if="docConfigRecad.exigeCertCasamento !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.CertCasamento.anexo' :tipo = 'documentos.CertCasamento.tipoAnexo' :nomeArquivo = 'documentos.CertCasamento.nomeAnexo' label = 'Cópia certidão de casamento'></inputViewDoc>
                </div>
                <div v-if="docConfigRecad.exigeTituloEleitor !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.TituloEleitor.anexo' :tipo = 'documentos.TituloEleitor.tipoAnexo' :nomeArquivo = 'documentos.TituloEleitor.nomeAnexo' label = 'Cópia título eleitoral'></inputViewDoc>
                </div>
                <div  v-if="docConfigRecad.exigeAtoNatural !== 'N'" class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
                  <inputViewDoc :value = 'documentos.AtoNatural.anexo' :tipo = 'documentos.AtoNatural.tipoAnexo' :nomeArquivo = 'documentos.AtoNatural.nomeAnexo' label = 'Cópia ato natural'></inputViewDoc>
                </div>
            </div>
          </q-card-section>
        </q-card>


        <div class="row justify-between">
              <div class="col-md-2">
                <q-btn @click="voltar" icon="fa-solid fa-right-from-bracket flip-horizontal" style="width: 100%;" color="primary" label="Voltar" class="q-ml-sm" />
              </div>
              <div class="col-md-2">
                <q-btn type="submit" style="width: 100%;" icon-right="mdi-chevron-right" color="primary" label="Continue" />
              </div>
        </div>
        <q-dialog v-model="modal" persistent>
          <q-card :style="$q.dark.isActive ? 'background: black' : 'background: #ffffff '">

            <q-card-section class="q-pt-none" align="center">
              <textoTermoCondicoes
                @update:value="textoTermo = $event"
              >
              </textoTermoCondicoes>
              {{ textoTermo }}
            </q-card-section>

            <q-card-section class="q-pt-none" align="center"
              :style="$q.dark.isActive ? 'color: #8EC0E4' : 'color: white '">
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat label="CONFIRMO" color="primary"  @click="confirmar" />

              <q-btn flat label="CANCELAR" color="dark" v-close-popup @click="cancelar" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="assinatura" persistent>
          <q-card :style="$q.dark.isActive ? 'background: black' : 'background: #ffffff '">

            <q-card-section class="q-pt-none" align="center">
              <div style="padding-top: 10%;">
               <p :class="$q.dark.isActive ? 'textoDark' : 'textoLight'">
                PARA CONCLUIR A SUA SOLICITAÇÃO DE PREECHIMENTO DO SEU RECADASTRAMENTO, SIGA OS SEGUINTES PASSOS:
              </p>
              <p :class="$q.dark.isActive ? 'textoDark' : 'textoLight'">
                ACESSE O LINK ENVIADO PARA O SEU E-MAIL, O QUAL O REDIRECIONARÁ AO SISTEMA "ASTEN ASSINATURA";
                LEIA OS TERMOS DE ACEITE DE ENVIO DE SUAS INFORMAÇÕES;
                ASSINE O DOCUMENTO NO LOCAL INDICADO.
              </p>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none" align="center"
              :style="$q.dark.isActive ? 'color: #8EC0E4' : 'color: white '">
            </q-card-section>

            <q-card-actions align="center">
              <Button label="OK" color="primary" v-close-popup  @click="aceitou = true" ></Button>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-form>
    </div>
  </template>

  <script setup lang="ts">
  import inputView from '../global/input-view.vue';
  import inputViewDoc from '../global/input-view-doc.vue';
  import textoTermoCondicoes from '../global/texto-termo-condicoes.vue';

  import { Recad } from 'src/model/aluno/Recad';
  import { ref, onMounted } from 'vue';
  import { axiosStore } from 'src/stores/AxiosStore';
  import { DadosRecad } from 'src/model/aluno/DadosRecad';
  import { TabEstruturada } from 'src/model/tabEstruturada/TabEstruturada';
  import { useRouter } from 'vue-router';
  import Button from 'src/components/global/button.vue'
import { Console } from 'console';

  var textoTermo = ref('');
  const $router = useRouter();
  const aceitou = ref(false)
  const assinatura = ref(false);
  const modal = ref(false);
  const axios = axiosStore();
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
  const base64 = {
      filteTeste : 'data:application/pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTI5Cj4+CnN0cmVhbQowLjU2NzAwMDAwMDAwMDAwMDEgdwowIEcKQlQKL0YxIDE2IFRmCjE4LjM5OTk5OTk5OTk5OTk5ODYgVEwKMCBnCjI4LjM0NjQ1NjY5MjkxMzM4ODggODEzLjU0MzU0MzMwNzA4NjU2NTYgVGQKKEhlbGxvIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoxIDAgb2JqCjw8L1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllcgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXItQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Sb21hbgovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNCAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1JdGFsaWMKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTYgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvU3ltYm9sCi9TdWJ0eXBlIC9UeXBlMQovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKL0YzIDcgMCBSCi9GNCA4IDAgUgovRjUgOSAwIFIKL0Y2IDEwIDAgUgovRjcgMTEgMCBSCi9GOCAxMiAwIFIKL0Y5IDEzIDAgUgovRjEwIDE0IDAgUgovRjExIDE1IDAgUgovRjEyIDE2IDAgUgovRjEzIDE3IDAgUgovRjE0IDE4IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKMTkgMCBvYmoKPDwKL1Byb2R1Y2VyIChqc1BERiAyLjUuMSkKL0NyZWF0aW9uRGF0ZSAoRDoyMDIzMDkxNTE2NTc1NC0wMycwMCcpCj4+CmVuZG9iagoyMCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzMzIgMDAwMDAgbiAKMDAwMDAwMjE0OSAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxNTIgMDAwMDAgbiAKMDAwMDAwMDM4OSAwMDAwMCBuIAowMDAwMDAwNTE0IDAwMDAwIG4gCjAwMDAwMDA2NDQgMDAwMDAgbiAKMDAwMDAwMDc3NyAwMDAwMCBuIAowMDAwMDAwOTE0IDAwMDAwIG4gCjAwMDAwMDEwMzcgMDAwMDAgbiAKMDAwMDAwMTE2NiAwMDAwMCBuIAowMDAwMDAxMjk4IDAwMDAwIG4gCjAwMDAwMDE0MzQgMDAwMDAgbiAKMDAwMDAwMTU2MiAwMDAwMCBuIAowMDAwMDAxNjg5IDAwMDAwIG4gCjAwMDAwMDE4MTggMDAwMDAgbiAKMDAwMDAwMTk1MSAwMDAwMCBuIAowMDAwMDAyMDUzIDAwMDAwIG4gCjAwMDAwMDIzOTcgMDAwMDAgbiAKMDAwMDAwMjQ4MyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIxCi9Sb290IDIwIDAgUgovSW5mbyAxOSAwIFIKL0lEIFsgPDU1QUM4M0I5NUIzNzRENTU5NTY2QjI1RDMzRUM1OEE5PiA8NTVBQzgzQjk1QjM3NEQ1NTk1NjZCMjVEMzNFQzU4QTk+IF0KPj4Kc3RhcnR4cmVmCjI1ODcKJSVFT0Y=',
      tipo: 'pdf'
    }
  const tabDeficiencia = ref([new TabEstruturada()]);
  const optionsDeficienciaFiltrado = ref();
  let options = ref([]);

  onMounted(async () => {
    if (props.idRecad != null) {
      await getDadosPedidoDoc(props.idRecad)
      await getDadosPedido(props.idRecad)
    }
  })

  const dadosRecad = ref(new DadosRecad());
  const documentos = ref ({
    DocIdentidade: {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    ConclEnsMedio:  {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    ComprovEstagio: {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    ProvaColacao:  {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    CertNasc:  {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    CertCasamento:  {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    TituloEleitor:  {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
    AtoNatural:  {
      anexo: '',
      tipoAnexo: '',
      nomeAnexo: '',
    },
  });
  const getDadosPedido = async (idRecad: string) => {
    try {

      dadosRecad.value = await axios.getDados('/aluno/recad/dados/pedido?idConfigRecad='+idRecad)
      dadosRecad.value.idConfigRecad = Number(idRecad);
      dadosRecad.value.email = dadosRecad.value.email


      if(dadosRecad.value.dadosDocumentos != null){

        const dados = dadosRecad.value.dadosDocumentos.map((m:any)=> m.tipoAttach);
        const docs = dadosRecad.value.dadosDocumentos;

        for (let index = 0; index < dados.length; index++) {
          if(dados[index].descricao === 'DocumentoIdentidadeDoAluno'){

            documentos.value.DocIdentidade.anexo = docs[index].anexo;
            documentos.value.DocIdentidade.tipoAnexo = docs[index].extensaoAnexo;
            documentos.value.DocIdentidade.nomeAnexo = docs[index].nomeAnexo;
          }
          if(dados[index].descricao === 'ProvaConclusaoEnsinoMedio'){

            documentos.value.ConclEnsMedio.anexo = docs[index].anexo;
            documentos.value.ConclEnsMedio.tipoAnexo = docs[index].extensaoAnexo;
            documentos.value.ConclEnsMedio.nomeAnexo = docs[index].nomeAnexo;
            }
            // ... fazer o resto dos casos
        }
        console.log(documentos.value.DocIdentidade, '#', documentos.value.ConclEnsMedio)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getDeficiencia = async () => {
    try {
      const defic = await axios.getDados('/tabestruturada/{codigo}?codigo=229');
      tabDeficiencia.value = defic
      const deficienciasFiltrado = tabDeficiencia.value
        .filter(obj => obj.ativo === 'S' && obj.item !== 0)
        .map(obj => {
          return {
            label: `${obj.descricao?.trim()}`,
            value: { deficienciaItem: obj.item, descricao: obj.descricao?.trim() }
          };
        });
      optionsDeficienciaFiltrado.value = deficienciasFiltrado;
      options.value = optionsDeficienciaFiltrado.value;
    } catch (error) {
      console.error(error)
    }
  }

  const emit = defineEmits(['eventDadosBasicos', 'eventStep']);

  const voltar = () => {
    emit('eventStep', -1)
  }

  const continuar = () => {
    if(aceitou.value === false){
      alert('Confirmado')
      modal.value = true;
    }else
    if(aceitou.value === true){
      console.log('ID RECAD',props.idRecad);
      $router.push({ name: 'acompanhar-recadastramento', query: { id: props.idRecad || 0 } });
    }
  }
  const cancelar = () => {
    assinatura.value = false
  }
  const confirmar = () => {
    modal.value = false;
    assinatura.value = true
    };

  getDeficiencia();

  const dadosRecadDoc = ref(new Recad());

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

  const getDadosPedidoDoc = async (idRecad: string) => {
    try {
      dadosRecadDoc.value = await axios.getDados('/aluno/recad?idConfigRecad='+idRecad)

        docConfigRecad.value.idPedidoRecad = props.idPedidoRecad ? Number(props.idPedidoRecad) : 0;
        docConfigRecad.value.exigeDocIdentidade = dadosRecadDoc.value.exigeDocIdentidade ? dadosRecadDoc.value.exigeDocIdentidade : '';
        docConfigRecad.value.exigeConclEnsMedio = dadosRecadDoc.value.exigeConclEnsMedio ? dadosRecadDoc.value.exigeConclEnsMedio : '';
        docConfigRecad.value.exigeComprovEstagio = dadosRecadDoc.value.exigeComprovEstagio ? dadosRecadDoc.value.exigeComprovEstagio : '';
        docConfigRecad.value.exigeProvaColacao = dadosRecadDoc.value.exigeProvaColacao ? dadosRecadDoc.value.exigeProvaColacao : '';
        docConfigRecad.value.exigeCertNasc = dadosRecadDoc.value.exigeCertNasc ? dadosRecadDoc.value.exigeCertNasc : '';
        docConfigRecad.value.exigeCertCasamento = dadosRecadDoc.value.exigeCertCasamento ? dadosRecadDoc.value.exigeCertCasamento : '';
        docConfigRecad.value.exigeTituloEleitor = dadosRecadDoc.value.exigeTituloEleitor ? dadosRecadDoc.value.exigeTituloEleitor : '';
        docConfigRecad.value.exigeAtoNatural = dadosRecadDoc.value.exigeAtoNatural ? dadosRecadDoc.value.exigeAtoNatural : '';
        docConfigRecad.value.tamAnexosKb =  dadosRecadDoc.value.tamAnexosKb ? dadosRecadDoc.value.tamAnexosKb : 0;
        console.log(docConfigRecad);
    } catch (error) {
      console.error(error)
    }
  }
  </script>

  <style lang="scss" scoped>
    .container {
        width: 100%;
    }
    .span {
        display: flex;
        margin-top: 14px;
        font-size: 14px;
        font-weight: 600;
        color: #4f4f4f;
    }
    .textoLight{
      display: flex;
      margin-top: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }
    .textoDark{
      display: flex;
      margin-top: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
    .cardTitle {
        font-size: 1.2rem;
        font-weight: bold;
    }
    .titleConfirmar {
        font-size: 1.4rem;
        color: $primary;
        font-weight: bold;
    }

  </style>
