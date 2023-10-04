<template>
  <div class="q-pl-md q-pr-md q-b-md">
    
    <div class="row tituloHeader">
      <div class="col-12 col-md q-mr-md">
        <h5 :style="$q.dark.isActive ? 'color: #fff;' : 'color:#333333;'">Gestão e Parametrização de Recadastramentos</h5>
      </div>
    </div>

    <Suspense>
        <template #default>
            <MyComponent />
        </template>
        <template #fallback>
            Loading...
        </template>
    </Suspense>

    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md q-mt-lg q-ml-lg q-mr-lg">
            <div class="row">
              <div class="col q-mt-md">
                <q-table
                  :grid="$q.screen.width < 768"
                  class="tabelaRecadastramentos"
                  table-class="tabelaRecadastramentos"
                  table-header-style="color: #1085BB;"
                  separator="cell"
                  :rows="recadastramentos.dados"
                  :columns="colunas"
                  :filter="filter"
                  :pagination="paginacaoConfig"
                  row-key="name"
                  dense
                >
                <template v-slot:top>
                  <div style="width: 100%;" class="row tabRecad-title">
                    Parametrização dos Recadastramentos
                  </div>
                  
                  <div style="width: 100%" class="row justify-end q-mt-sm">
                    <div class="col-12 col-md-3">
                      <q-toggle v-model="filterAtivos" @update:model-value="buscarAtivos" false-value="N" true-value="S" label="Mostrar apenas processos ativos" />
                    </div>
                    <div class="col-12 col-md-3">
                      <q-input dense filled color="black" placeholder="Procurar" v-model="filter">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </div>  
                  </div>  
                </template>  

                  <template v-slot:body-cell-iconStatus="props">
                    <q-td :props="props">
                      <span v-if="props.value === 'S'" class="ativo" style="padding-right: 5px; color: green;">
                        Ativo
                      </span>
                      <span v-if="props.value === 'N'" style="padding-right: 5px; color: red; font-weight: 600;">
                        Inativo
                      </span>
                      <q-icon v-if="props.value === 'S'" class="ativo" color="green" name="mdi-circle-slice-8"></q-icon>
                      <q-icon v-if="props.value === 'N'" color="red" name="mdi-circle-slice-8"></q-icon>
                    </q-td>
                  </template>
                  <template v-slot:body-cell-opcoes="props">
                    <q-td :props="props">
                      <div class="row">
                        <div class="col-12 col-md q-mr-sm">
                          <q-btn 
                            label="Editar"
                            @click="editarRecad(props.row.id)"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                            data-cy="listaRecad-editar"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm">
                          <q-btn 
                            label="Ver"
                            @click="verRecad(props.row.id)"
                            icon="mdi-eye"
                            color="#FFF"
                            style="background-color: #0C4E82; width: 100%; height: 50%;"
                            data-cy="listaRecad-ver"
                          />
                        </div>
                      </div>
                    </q-td>
                  </template>
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
                      <q-card bordered flat>
                        <q-list dense>
                          <q-item v-for="col in props.cols.filter(col => col.name)" :key="col.name">
                            <q-item-section>
                              <q-item-label>{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-item-label v-if="col.label !== 'Status'" caption>{{ col.value }}</q-item-label>
                              
                              <q-item-label v-if="col.label === 'Status'">
                                <q-item-label caption>
                                  <span v-if="col.value === 'S'" style="padding-right: 5px; color: green;">
                                    Ativo
                                  </span>
                                  <span v-if="col.value === 'N'" style="padding-right: 5px; color: red; font-weight: 600;">
                                    Inativo
                                  </span>
                                  <q-icon v-if="col.value === 'S'" color="green" name="mdi-circle-slice-8"></q-icon>
                                  <q-icon v-if="col.value === 'N'" color="red" name="mdi-circle-slice-8"></q-icon>
                                </q-item-label>
                              </q-item-label>

                              <q-item-label v-if="col.label === 'Opções'">
                                <q-item-label caption>
                                  <div class="col-12 col-md q-mb-sm">
                                    <q-btn 
                                      label="Editar"
                                      @click="editarRecad(props.row.id)"
                                      icon="mdi-file-edit-outline"
                                      color="#FFF"
                                      style="background-color: #1085BB; width: 100%; height: 50%;"
                                    />
                                  </div>
                                  <div class="col-12 col-md q-mb-sm">
                                    <q-btn 
                                      label="Ver"
                                      @click="verRecad(props.row.id)"
                                      icon="mdi-eye"
                                      color="#FFF"
                                      style="background-color: #0C4E82; width: 100%; height: 50%;"
                                    />
                                  </div>
                                </q-item-label>
                              </q-item-label>

                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card>
                    </div>
                  </template>
                  <template v-slot:item-opcoes="props">
                    <q-card :props="props">
                      <div class="row">
                        <div class="col-12 col-md q-mr-sm">
                          <q-btn 
                            label="Editar"
                            type="submit"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm">
                          <q-btn 
                            label="Ver"
                            type="submit"
                            icon="mdi-eye"
                            color="#FFF"
                            style="background-color: #0C4E82; width: 100%; height: 50%;"
                          />
                        </div>
                      </div>
                    </q-card>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
        </div>

        <div class="row q-mt-lg q-ml-lg q-mr-lg justify-between">
          <div class="col-12 col-md-2 q-mb-sm">
            <q-btn 
              label="Sair"
              @click="sair"
              icon="fa-solid fa-right-from-bracket flip-horizontal"
              color="#FFF"
              style="background-color: #1085BB; width: 100%; height: 50%;"
            />
          </div>
          <div class="col-12 col-md-2 ">
            <q-btn 
              label="Novo"
              @click="novoRecad"
              icon="mdi-file-outline"
              color="#FFF"
              style="background-color: #0C4E82; width: 100%; height: 50%;"
              data-cy="listaRecad-novo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { administradorStore } from 'src/stores/administrador/home/AdminStore';
import { useUsuario } from 'src/stores/login/Usuario';
import moment from 'moment'

  const recadastramentos = administradorStore();
  const $router = useRouter()
  const usuario = useUsuario();

  const filter = ref('');
  const filterAtivos = ref('N');

  const colunas = [
    { name: 'id', field: 'id', label: 'Código', sortable: true, align: 'center' },
    { name: 'descricao', field: 'descricao', label: 'Descrição', sortable: true, align: 'center' },
    { name: 'periodo', field: row => moment(String(row.dtIniRecad)).format('DD/MM/YYYY') + ' à ' + 
        moment(String(row.dtFimRecad)).format('DD/MM/YYYY'), label: 'Período', sortable: true, align: 'center'},
    { name: 'iconStatus', field: 'indAtivo', label: 'Status', sortable: true, align: 'center'},
    { name: 'opcoes', label: 'Opções', sortable: true, align: 'center'},
  ]

  onMounted( async () => {
    await getRecadastramentos()
  });

  const getRecadastramentos = async () => {
    try {
      recadastramentos.setDadosRecadastramento;
    } catch (error) {
      console.error(error);
    }
  };

  const buscarAtivos = async () => {
    
    try {
      if(filterAtivos.value === 'S'){
        recadastramentos.setDadosRecadastramentosAtivos();
      } else {
        recadastramentos.setDadosRecadastramento();
      }
      
    } catch (error) {
      console.error(error)
    }
  };

  const novoRecad = () => {
    $router.push({ name: 'administrador-recadastramento'})
  };
  const editarRecad = (idRecad: number) => {
    $router.push({ name: 'administrador-recadastramento', params: { id: idRecad || 0, mode: 'editar' } })
  };
  const verRecad = (idRecad: number) => {
    $router.push({ name: 'administrador-recadastramento', params: { id: idRecad || 0, mode: 'visualizar' } })
  };
  const sair = () => {
    usuario.loggout();
  };

  const paginacaoConfig = {
    rowsPerPage: 15, // Quantidade de linhas por página padrão
    paginate: true, // Ativar a paginação
  }

  

</script>

<style lang="scss" scoped>

body {
  background-color: #f3f3f3;
}

.tabRecadHeader th{
  color: #1085BB;
  font-weight: bold;
  font-size: 14px;
  padding-top: 0px;
}

.tabelaRecadastramentos {
  font-size: 12px;
  height: 55vh !important;

  @media screen and (max-width: 768px) {
    margin-right: 2rem;
    height: auto !important;
    font-size: 10px;
  }
}

.tituloHeader h5{
  text-align: center;
  color: #333333;
  justify-content: center;
  font-weight: bold;
}

.ativo {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {  
  50% { opacity: 0.5; }
}

.q-table {
  margin: 15px;
  width: 100%;
  max-width: 98%;
}

</style>
<style scoped>
.tabelaRecadastramentos:deep(.tabRecad-title) {
  color: #fff;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #1085BB;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

.tabelaRecadastramentos tbody tr td {
  font-weight: bold;
}

.span {
  font-size: 14px;
  font-weight: 600;
  color: #4f4f4f;
}

</style>