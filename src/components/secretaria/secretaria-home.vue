<template>
  <div class="q-pl-md q-pr-md q-b-md row">      
    <q-table
      :grid="$q.screen.width < 768"
      class="tabelaRecads col-12"
      table-class="tabelaRecads"
      table-header-style="color: #1085BB;"
      separator="cell"
      :rows="recadastramentos.dados"
      :columns="colunas"
      :filter="filter"
      :pagination="paginacaoConfig"
      row-key="name"
      dense
      @row-click="verRecad"
    >
        <template v-slot:top>
          <div class="row tabRecad-title col-12">
            Listagem dos Recadastramentos
          </div>

          <div  class="row justify-end q-mt-sm col-12">
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
            <span v-if="props.value === 'S'" class="fonte" style="padding-right: 5px; color: #4CAF50;">
              ATIVO
            </span>
            <span v-if="props.value == 'N'" class="fonte" style="padding-right: 5px; color: red; font-weight: 600;">
              INATIVO
            </span>
          </q-td>
        </template>
    </q-table>
    <q-btn 
      label="Sair"
      @click="sair"
      icon="fa-solid fa-right-from-bracket flip-horizontal"
      color="#FFF"
      style="background-color: #1085BB; height: 50%;"
      class="col-2 q-mt-lg"
    />
  </div>           
</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { secretariaStore } from 'src/stores/secretaria/SecStore';
import moment from 'moment'
import { useRouter } from 'vue-router';
import { useUsuario } from 'src/stores/login/Usuario';

const usuario = useUsuario();
const $router = useRouter()
const recadastramentos = secretariaStore();
const filter = ref('');
const colunas = [
    { name: 'id', field: 'id', label: 'Código', sortable: true, align: 'center' },
    { name: 'descricao', field: 'descricao', label: 'Descrição', sortable: true, align: 'center' },
    {
        name: 'periodo', field: row => moment(String(row.dtIniRecad)).format('DD/MM/YYYY') + ' à ' +
            moment(String(row.dtFimRecad)).format('DD/MM/YYYY'), label: 'Período', sortable: true, align: 'center'
    },
    { name: 'iconStatus', field: 'indAtivo', label: 'Status', sortable: true, align: 'center' }
]

const paginacaoConfig = {
    rowsPerPage: 15, // Quantidade de linhas por página padrão
    paginate: true, // Ativar a paginação
}


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

  const verRecad = (evt:any, row: any) => {
    $router.push({ name: 'secretaria-pedidos', params: { id: row.id || 0 } })
  };

  const sair = () => {
    usuario.loggout();
  };


</script>
<style lang="scss" scoped>
.fonte{
  font-weight: bold;
}
.tabelaRecads {
  font-size: 12px;
  height: 70vh !important;

  @media screen and (max-width: 768px) {
    margin-right: 2rem;
    height: auto !important;
    font-size: 10px;
  }
}
.tabelaRecads:deep(.tabRecad-title) {
  color: #fff;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #1085BB;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
</style>
