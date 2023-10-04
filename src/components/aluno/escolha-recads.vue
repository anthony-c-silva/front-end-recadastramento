<template>
  <div class="q-pl-md q-pr-md q-b-md">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md q-mt-lg q-ml-lg q-mr-lg">
            <div class="row" >
              <div class="col q-mt-md" >

                <q-table
                  :grid="$q.screen.width < 768"
                  class="tabelaRecads"
                  table-class="tabelaRecads"
                  table-header-style="color: #1085BB;"
                  separator="cell"
                  row-key="name"
                  dense
                  :rows="pedidoConfig"
                  :columns="colunas"
                  :filter="filter"
                  :pagination="paginacaoConfig"
                  :loading="loading"
                  no-data-label="Nenhum recadastramento disponível"
                  :visible-columns="visibleColumns"
                >
                <template v-slot:top>
                  <div style="width: 100%;" class="row tabRecad-title">
                    Listagem dos Recadastramentos
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

                      <span v-if="props.value === 'VERIFICAR_CODIGO'" class="fonte" style="padding-right: 5px; color: #FFC107;">
                        Verificar Código
                      </span>
                      <span v-if="props.value === 'ABERTO'" class="fonte" style="padding-right: 5px; color: #4CAF50;">
                        Aberto
                      </span>
                      <span v-if="props.value == null" class="fonte" style="padding-right: 5px; color: #D32F2F; font-weight: 600;">
                        Pendente
                      </span>
                      <span v-if="props.value === 'PENDENTE_ASSINATURA'" class="fonte" style="padding-right: 5px; color: #FF5722;">
                        Assinatura do termo pendente
                      </span>
                      <span v-if="props.value === 'REAJUSTE'" class="fonte" style="padding-right: 5px; color: #D32F2F;">
                        Necessidade de reajuste
                      </span>
                    </q-td>
                </template>
                <template v-slot:body-cell-opcoes="props">
                    <q-td :props="props">
                      <div class="row">
                        <div class="col-12 col-md q-mr-sm" v-if="props.row.situacaoPedido == null">
                          <q-btn
                            label="Iniciar"
                            @click="iniciarRecad(props.row.idConfigRecad)"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm" v-else-if="props.row.situacaoPedido === 'VERIFICAR_CODIGO'">
                          <q-btn
                            label="Validar código"
                            @click="validarCodigo(props.row.idConfigRecad, props.row.emailPedido)"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm" v-else-if="props.row.situacaoPedido === 'ABERTO'">
                          <q-btn
                            label="Continuar"
                            @click="continuarRecad(props.row.idConfigRecad, props.row.idPedidoRecad)"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm" v-else-if="props.row.situacaoPedido === 'CONCLUIDO'">
                          <q-btn
                            label="Acompanhar tramitação"
                            @click="verRecad(props.row.idConfigRecad, props.row.idPedidoRecad)"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm" v-else-if="props.row.situacaoPedido === 'REAJUSTE'">
                          <q-btn
                            label="Corrigir"
                            @click="reajusteRecad(props.row.idConfigRecad, props.row.idPedidoRecad)"
                            icon="mdi-file-edit-outline"
                            color="#FFF"
                            style="background-color: #1085BB; width: 100%; height: 50%;"
                          />
                        </div>
                        <div class="col-12 col-md q-mr-sm" v-else>
                         -
                        </div>
                      </div>
                    </q-td>
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
              @click="usuario.loggout()"
              icon="fa-solid fa-right-from-bracket flip-horizontal"
              color="#FFF"
              style="background-color: #1085BB; width: 100%; height: 50%;"
              data-cy="escolha-recads-sair"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { useUsuario } from 'src/stores/login/Usuario';
import moment from 'moment';
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import { axiosStore } from 'src/stores/AxiosStore';

    const filterAtivos = ref('N');
    const $router = useRouter()
    let pedidoConfig: []
    const usuario = useUsuario();
    usuario.setUser();

    const loading = ref(true)

    const axios = axiosStore();

    const getPedidosDisponiveis = async () => {
      try {
        await axios.getDados('/aluno/aluno/recad/recads').then( d => {
        pedidoConfig = d

        loading.value=false
      })
      } catch (error) {
        loading.value=false
      }

    }

    onMounted( async () => {
      await getPedidosDisponiveis()
    });



    const paginacaoConfig = {
      rowsPerPage: 15,
      paginate: true,
    }
    const filter = ref('');
    const colunas = [
      { name: 'idConfigRecad', field: 'idConfigRecad', label: 'id', align: 'center' },
      { name: 'idPedidoRecad', field: 'idPedidoRecad', label: 'id', align: 'center' },
      { name: 'descricao', field: 'descricao', label: 'Descrição', sortable: true, align: 'center' },
      { name: 'periodo', field: row => moment(String(row.dtIniRecad)).format('DD/MM/YYYY') + ' à ' +
          moment(String(row.dtFimRecad)).format('DD/MM/YYYY'), label: 'Período', sortable: true, align: 'center'},
      { name: 'iconStatus', field: 'situacaoPedido', label: 'Status', sortable: true, align: 'center'},
      { name: 'opcoes', label: 'Ação', sortable: true, align: 'center'},
      { name: 'emailPedido', field: 'emailPedido'},


    ]
    const visibleColumns =  [ 'descricao','periodo', 'iconStatus', 'opcoes' ]

    const iniciarRecad = (idConfig: number) => {
      $router.push({ name: 'verifica-email',  query: { idConfig: idConfig || 0}})
    };

    const validarCodigo = (id: number, emailPedido: any) => {
      $router.push({
          name: 'verifica-codigo',
          query: {
            idConfig: id,
            email: emailPedido,
          }
        })
    };

    const continuarRecad = (id: number, idPedidoRecad: number) => {
      $router.push({ name: 'aluno-recadastramento',  query: { id: id || 0, idPedidoRecad: idPedidoRecad || 0 } })
    };
    const reajusteRecad = (id: number, idPedidoRecad: number) => {
      $router.push({ name: 'aluno-recadastramento',  query: { id: id || 0, idPedidoRecad: idPedidoRecad || 0 , reajuste: 'S'} })
    };
    const verRecad = (id: number, idPedidoRecad: number) => {
      $router.push({ name: 'acompanhar-recadastramento',  query: { id: id || 0, idPedidoRecad: idPedidoRecad || 0 } })
    };

    const buscarAtivos = async () => {

    try {
      if(filterAtivos.value === 'S'){

      } else {

      }

    } catch (error) {
      console.error(error)
    }
  };
</script>


<style lang="scss" scoped>

.tituloHeader h5{
  text-align: center;
  color: #333333;
  justify-content: center;
  font-weight: bold;
  padding-top: 50px;
}
.fonte{
  font-weight: bold;
}
.tabelaRecads {
  font-size: 12px;
  height: 55vh !important;

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
