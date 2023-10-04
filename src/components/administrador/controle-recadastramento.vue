<template>
  <div class="container q-pl-lg q-pr-lg q-pb-lg">
    <div class="row">
      <div class="col-12 q-mb-md">
        <h5 :style="$q.dark.isActive ? 'color: #fff;' : 'color:#333333;'">{{ titulo }}</h5>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">

    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md q-mr-md q-mt-sm">
            <div class="row">
              <div class="col q-mb-sm">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Descrição</span>
                <q-input :readonly="mode === 'visualizar'"
                  label="Insira uma descrição"
                  v-model="recad.descricao"
                  labelIn="Descrição"
                  placeholder="Descrição do recadastramento"
                  tooltip="Descrição do recadastramento"
                  type="text"
                  dense
                  :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                  outlined
                  lazy-rules
                  :rules="inputRules"
                ></q-input>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Descrição do recadastramento</q-tooltip>
              </div>
            </div>

            <div class="row">
              <div class="col-10">
                <CheckBoxComponent :disable="mode === 'visualizar'" v-model="recad.indExigeMail" true-value="S" false-value="N" label="Exigir código de confirmação de e-mail" ref="RECAD.indExigeMail"></CheckBoxComponent>
                <CheckBoxComponent :disable="mode === 'visualizar'" v-model="recad.indExigeAnexos" true-value="S" false-value="N" label="Incluir validação de documentos anexados pelo aluno" ref="RECAD.indExigeAnexos"></CheckBoxComponent>
                <CheckBoxComponent :disable="mode === 'visualizar'" v-model="recad.indSomenteProvForm" true-value="S" false-value="N" label="Recadastramento somente para prováveis formandos" ref="RECAD.indSomenteProvForm"></CheckBoxComponent>
                <CheckBoxComponent :disable="mode === 'visualizar'" v-model="recad.indAcessoNivelCurso" true-value="S" false-value="N" label="Recadastramento por nível de curso" ref="RECAD.indAcessoNivelCurso"></CheckBoxComponent>
              </div>
            </div>

            <div class="row">
              <div class="col q-mr-md q-mt-lg">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Nível</span>
                <q-select :readonly="mode === 'visualizar'" :bg-color="$q.dark.isActive ? 'black' : 'accent'" dense outlined label="Nível" v-model="recad.nivelCursoItem" :disable="!(recad.indAcessoNivelCurso == 'S')" emit-value map-options :options="optionsNiveis"></q-select>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Nível de curso a ser solicitado o recadastramento</q-tooltip>
              </div>
              <div class="col q-mt-lg">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Curso</span>
                <q-select readonly :bg-color="$q.dark.isActive ? 'black' : 'accent'" dense outlined label="Selecione uma opção" v-model="modelCurso" :disable="!(recad.indAcessoNivelCurso == 'S')" emit-value map-options :options="optionsAcesso"></q-select>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Curso a ser solicitado o recadastramento</q-tooltip>
              </div>
            </div>

            <div class="row">
              <div class="col q-mr-none q-mt-md">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Liberar acesso para:</span>
                <q-select lazy-rules :rules="inputRules" :readonly="mode === 'visualizar'" :bg-color="$q.dark.isActive ? 'black' : 'accent'" dense outlined label="Selecione uma opção" v-model="recad.faseAcessoPortal" emit-value map-options :options="optionsAcesso"></q-select>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Liberar acesso para:</q-tooltip>
              </div>
            </div>

          </div>

          <div class="col-12 col-md q-mr-md">
            <div class="row">
              <div class="col q-mt-md">

                <q-table v-if="mode == 'visualizar'" class="tabelaDocumentos"
                  flat bordered
                  dense
                  title="Documentação Exigida"
                  title-class="tabDocs-title"
                  :rows="docsObrigatorio"
                  separator="cell"
                  :columns="colunasVisualizar"
                  style="margin-bottom: 5px;"
                  :pagination="paginationConfig"
                  no-data-label="Este recadastramento não possui documentação obrigatória."
                />
                <q-table v-if="mode != 'visualizar'" class="tabelaDocumentos"
                  flat bordered
                  dense
                  title="Documentação Comprobatória"
                  title-class="tabDocs-title"
                  :rows="data"
                  separator="cell"
                  :columns="columns"
                  style="margin-bottom: 5px;"
                  :pagination="paginationConfig"
                  row-key="id"
                  :selected-rows-label="getSelectedString"
                  selection="multiple"
                  v-model:selected="docsObrigatorio"
                />
              </div>
            </div>

            <div class="row q-mt-lg">
              <div class="col">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Tamanho Máximo permitido para anexos (Kb)</span>
                <q-input :readonly="mode === 'visualizar'"
                  v-model="recad.tamAnexosKb"
                  labelIn="Tamanho máximo de anexosInício"
                  placeholder="Tamanho máximo em Kb"
                  type="number"
                  dense
                  :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                  outlined
                  lazy-rules
                  :rules="inputRules"
                ></q-input>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Tamanho máximo permitido para anexos</q-tooltip>
              </div>
            </div>

            <div class="row q-mr-md">
              <div class="col-12 col-md q-mr-md">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Data de Início</span>
                <q-input :readonly="mode === 'visualizar'"
                  label="Data de Início"
                  v-model="recad.dtIniRecad"
                  @update:value="inputDataIni"
                  labelIn="Data de Início"
                  placeholder="dd/mm/aaaa"
                  type="date"
                  dense
                  :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                  outlined
                  lazy-rules
                  :rules="inputRules"
                ></q-input>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Data de início do recadastramento</q-tooltip>
              </div>

              <div class="col-12 col-md q-mb-md q-mr-md">
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Data de Finalização</span>
                <q-input :readonly="mode === 'visualizar'"
                  label="Data de Finalização"
                  v-model="recad.dtFimRecad"
                  @update:value="inputDataFim"
                  labelIn="Data de Finalização"
                  placeholder="dd/mm/aaaa"
                  type="date"
                  dense
                  :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                  outlined
                  lazy-rules
                  :rules="inputRules"
                ></q-input>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Data de finalização do recadastramento</q-tooltip>
              </div>

              <div class="col-12 col-md-5">
                <!--selectButton label="Recadastramento Ativo?" v-model="recad.indAtivo" :options="optionsAtivo"></selectButton -->
                <span :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4f4f4f;'" class="span">Recadastramento Ativo?</span>
                <q-select lazy-rules :rules="inputRules" :readonly="mode === 'visualizar'" :bg-color="$q.dark.isActive ? 'black' : 'accent'" dense outlined label="Selecione uma opção" v-model="recad.indAtivo" emit-value map-options :options="optionsAtivo"></q-select>
                <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Ativar recadastramento?</q-tooltip>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <div class="row q-mt-none justify-between">
      <div class="col-md-2">
        <q-btn
          label="Voltar"
          @click="voltar"
          icon="mdi-chevron-left"
          color="#FFF"
          style="background-color: #1085BB; width: 100%; height: 50%;"
          data-cy="controleRecad-voltar"
        />
      </div>
      <div class="col-md-2 text-md-right">
        <q-btn v-if="!(mode === 'visualizar')"
          label="Salvar"
          type="submit"
          icon="save"
          color="#FFF"
          style="background-color: #4CAF50; width: 100%; height: 50%;"
        />
      </div>
    </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import CheckBoxComponent from 'src/components/global/check-box.vue';
import { administradorStore } from 'src/stores/administrador/home/AdminStore';
import { axiosStore } from 'src/stores/AxiosStore';
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar';
import { TabEstruturada } from 'src/model/tabEstruturada/TabEstruturada'


export default defineComponent({
    name: 'ControleRecadastramento',
    components: { CheckBoxComponent },
    props: {
      mode: String
    },
    data() {

      return {
        optionsAtivo: [
          {
            label: 'Sim',
            value: 'S'
          },
          {
            label: 'Não',
            value: 'N'
          },
        ],
        optionsCurso: [
          'Curso 1', 'Curso 2', 'Curso 3'
        ],
        optionsAcesso: [
          {
            label: 'Apenas Deferidos',
            value: 'D'
          },
          {
            label: 'Em análise ou status posterior',
            value: 'A'
          }
        ],

        data: [
          { id: 1, name: 'DocumentoIdentidadeDoAluno'},
          { id: 2, name: 'ProvaConclusaoEnsinoMedio'},
          { id: 3, name: 'ProvaColacao'},
          { id: 4, name: 'ComprovacaoEstagioCurricular'},
          { id: 5, name: 'CertidaoNascimento'},
          { id: 6, name: 'CertidaoCasamento'},
          { id: 7, name: 'TituloEleitor'},
          { id: 8, name: 'AtoNaturalizacao'}
        ],
        columns: [
          { name: 'id', label: 'Código', align: 'left', field: 'id', sortable: true },
          { name: 'name', label: 'Descrição', align: 'left', field: 'name', sortable: true },
        ],
        paginationConfig: {
          rowsPerPage: 10, // Quantidade de linhas por página padrão
          paginate: true, // Ativar a paginação
        }
      }
    },

    setup () {
      const axios = axiosStore();
      const $route = useRoute();
      const $q = useQuasar();
      const $router = useRouter();
      const recadStore = administradorStore();
      const recad = ref({
        id: 0,
        descricao: '',
        indAtivo: '',
        dtIniRecad: '',
        dtFimRecad: '',
        indExigeSms: 'N',
        indExigeMail: 'N',
        indExigeAnexos: 'N',
        indAcessoMatr: 'N',
        indAcessoDtIngr: 'N',
        exigeDocIdentidade: '',
        exigeConclEnsMedio: '',
        exigeComprovEstagio: '',
        exigeProvaColacao: '',
        exigeCertNasc: '',
        exigeCertCasamento: '',
        exigeTituloEleitor: '',
        exigeAtoNatural: '',
        indSomenteProvForm: 'N',
        faseAcessoPortal: '',
        indAcessoNivelCurso: 'N',
        tamAnexosKb: 0,
        nivelCursoTab: 0,
        nivelCursoItem: 0,
      });
      const modelNivel = ref();

      const tabNiveisCursos = ref([new TabEstruturada()]);
      const optionsNiveis = ref();

      const docsObrigatorio = ref([]);
      const docsObrigatorioRecad: [] = [];

      const mapping = {
          'DocumentoIdentidadeDoAluno': 'exigeDocIdentidade',
          'ProvaConclusaoEnsinoMedio': 'exigeConclEnsMedio',
          'ProvaColacao': 'exigeProvaColacao',
          'ComprovacaoEstagioCurricular': 'exigeComprovEstagio',
          'CertidaoNascimento': 'exigeCertNasc',
          'CertidaoCasamento': 'exigeCertCasamento',
          'TituloEleitor': 'exigeTituloEleitor',
          'AtoNaturalizacao': 'exigeAtoNatural'
      };

      const colunasVisualizar = [
        { name: 'id', label: '', align: 'left', field: 'id', sortable: true },
        { name: 'name', label: 'Descrição', align: 'left', field: 'name', sortable: true },
      ]

      const inputRules = [
        val => (val && val.length > 0) || 'Este campo é obrigatório'
      ];

      const titulo = computed(() => {
        if ($route.params.mode === 'editar') {
          return 'Editar Recadastramento';
        } else if ($route.params.mode === 'visualizar') {
          return 'Visualizar Recadastramento';
        } else {
          return 'Novo Recadastramento';
        }
      });

      const inputDescricao = (valor: string) => {
        recad.value.descricao = valor;
      };
      const inputTamanhoMax = (valor: number) => {
        recad.value.tamAnexosKb = valor;
      };
      const inputDataIni = (valor: string) => {
        recad.value.dtIniRecad = valor;
      };
      const inputDataFim = (valor: string) => {
        recad.value.dtFimRecad = valor;
      };

      onMounted(async () => {
        getNiveisCurso()

        if ($route.params.id) {
          getRecadastramento($route.params.id)
        }
      })

      const getNiveisCurso = async () => {
        try {
          const niveis = await axios.getDados("/tabestruturada/{codigo}?codigo=601");
          tabNiveisCursos.value = niveis

          const optionsNiveisValue = tabNiveisCursos.value
            .filter(obj => obj.ativo === 'S' && obj.item !== 0)
            .map(obj => {
              return {
                label: `${obj.descricao?.trim()} (${obj.sigla?.trim()})`,
                value: obj.item
              };
            });

          optionsNiveis.value = optionsNiveisValue;

        } catch (error) {
          console.error(error)
        }
      }

      const getRecadastramento = async (id: string | unknown) => {

        try {
          await recadStore.setDadosRecadastramentoById(id)
          recad.value = recadStore.dadosRecadastramentoById;
          let idDoc = 0

          for (const key in recad.value) {

            const fieldValue = recad.value[key];
            const fieldName = Object.keys(mapping).find(name => mapping[name] === key);

            if (fieldName && fieldValue === 'S') {
              idDoc = idDoc + 1;
              let obj = {
                id: idDoc,
                name: fieldName
              };

              docsObrigatorioRecad.push(obj)
              docsObrigatorio.value = docsObrigatorioRecad
            }
          }
        } catch (error) {
          console.error(error)
        }
      }

      const voltar = () => {
        $router.back()
      }

      const onSubmit = async () => {

        for (const valor of Object.values(mapping)) {
          recad.value[valor] = 'N';
        }

        try {

          if (docsObrigatorio.value.length < 1 && recad.value.indExigeAnexos === 'S') {
            $q.notify({
              type: 'negative',
              message: 'É obrigatório selecionar um tipo de documento quando a validação está ativa.',
            });
          }else{
            docsObrigatorio.value.forEach((element: any) => {
              const fieldName = mapping[element.name];
              if (fieldName) {
                recad.value[fieldName] = 'S';
              }
            });

            if ($route.params.mode != 'editar'){
              const response = await recadStore.postNovoRecadastramento(recad.value)
              $q.notify({
                color: 'positive',
                icon: 'check',
                message: 'Recadastramento salvo com sucesso!',
              });

              $router.push({ name: 'administrador-home' })

            }else if ($route.params.mode == 'editar'){
              const response = await recadStore.putEditarRecadastramento(recad.value)
              $q.notify({
                color: 'positive',
                icon: 'check',
                message: 'Recadastramento salvo com sucesso!',
              });

              $router.push({ name: 'administrador-home' })
            }
          }
        } catch (error) {
          console.error(error)
        }

      }

      return {
        axios,
        recad,
        modelNivel,
        modelCurso: ref(),
        modelAcesso: ref(),
        optionsNiveis,
        docsObrigatorio,
        docsObrigatorioRecad,
        inputRules,
        titulo,
        mapping,
        onSubmit,
        inputDataFim,
        inputDataIni,
        inputDescricao,
        inputTamanhoMax,
        voltar,
        colunasVisualizar,
      }

    },

    methods: {
      getSelectedString () {
        return this.docsObrigatorio.length === 0 ? '' : `${this.docsObrigatorio.length} documento${this.docsObrigatorio.length > 1 ? 's' : ''} selecionado de ${this.data.length}`
      },

    },
})
</script>

<style lang="scss" scoped>

body {
  background-color: #f3f3f3;
}

.container h5{
  text-align: center;
  font-weight: bold;
}
.container {
  display: flex;
  flex-direction: column;
}

.full-width {
  flex: 1;
}

.input-container {
  display: flex;
  justify-content: space-between;
}

.tabelaDocumentos {
  font-size: 14px;
  height: 36.7vh !important;

  @media screen and (max-width: 768px) {
    height: auto !important;
  }
}

.tabelaDocumentos th.text-left.sortable {
    color: #1085BB;
    font-weight: bold;
}

</style>

<style scoped>
.tabelaDocumentos:deep(.tabDocs-title) {
  background-color: #1085BB;
  color: #fff;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}
.tabelaDocumentos.readOnly {
  pointer-events: none;
}
.tabelaDocumentos:deep(.q-table__top) {
  background-color: #1085BB;
  justify-content: center;
}
.tabelaDocumentos tbody tr:first-child td {
  font-weight: bold;
  color: red;
}

.span {
  font-size: 14px;
  font-weight: 600;
}

</style>
