<template>  
    <div>
      <q-table
        :grid="$q.screen.width < 768"
        title="Lista de pedidos"
        class="tabelaPedidos"
        table-class="tabelaPedidos"
        table-header-style="color: #1085BB;"
        separator="cell"
        :rows="pedidos.pedidosDto"
        :columns="colunas"
        :filter="filter"
        :pagination="paginacaoConfig"
        row-key="name"
        dense
        :visible-columns="visibleColumns"
        @row-click="pedidoSelecionado"
      >
      <template v-slot:top>
        <div style="width: 100%;" class="row tabPedido-title">
          Listagem dos Pedidos
        </div>
        <div style="width: 100%" class="row justify-end q-mt-sm">
          <div class="col-12 ">
            <q-input dense filled color="black" placeholder="Procurar" v-model="filter">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-button="props">
        <q-td :props="props">
          <q-icon 
            name="mdi-eye-outline"             
            size="30px"
            @click="visualizarLogsPedido(props.row.id)"            
            />
        
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td class="text-center">
          <q-icon 
            :name="getIconStatus(props.row.status)" 
            :style="'color:'+getColorStatus(props.row.status)" 
            size="20px"            
            >
            <q-tooltip>
              {{ props.row.status }}
            </q-tooltip>
          </q-icon>
        </q-td>
        
      </template>
    
    </q-table>
    <q-dialog v-model="modal">
          <q-card style="width: 500px; max-width: 80vw;">
            <q-card-section align="center">
              <div class="text-h6 bold">Log de alterações</div>
            </q-card-section>            
              <LogsPedidos 
                :idPedidoRecad="idPedidoSelecionado" 
                :key="keyIndex" 
                class="q-pt-none scroll" 
                style="height: 50vh"
                />            
          </q-card>
    </q-dialog>
     
    </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { secretariaStore } from '../../../stores/secretaria/SecStore'
  import { useRoute } from 'vue-router';
  import LogsPedidos from '../../global/logs-pedido.vue'
  import { getIconStatus, getColorStatus } from '../../../services/Utils'
 

  const emit = defineEmits(['pedidoSelecionado'])
  const pedidos = secretariaStore()
  const routeParam = useRoute()  
  const keyIndex = ref(0);
  let idPedidoSelecionado = 0
  let modal = ref(false)



  pedidos.setDadosPeditosDto(routeParam.params.id)
  
  onMounted( async () => {      
    pedidos.dadosPedidosDto   
  });

  const pedidoSelecionado = (evnt: any, row:any) =>{
    emit('pedidoSelecionado', row.id)
  }
  const visualizarLogsPedido = (id:number) =>{
    idPedidoSelecionado = id
    keyIndex.value = id
    modal.value = true   
    console.log("asdasd "+modal.value)
  }



  //==================q-table configs==================
  const colunas = [
      { name: 'id', field: 'id', label: '', sortable: true, align: 'center' },
      { name: 'matricula', field: 'matricula', label: 'Matrícula', sortable: true, align: 'center' },
      { name: 'nome', field: 'nome', label: 'Nome', sortable: true, align: 'center' },
      { name: 'status', field: 'status', label: 'Status', sortable: true, align: 'center' },
      { name: 'button', field: 'button', label: 'Logs', align: 'center' },
  ]
  const visibleColumns =  [ 'nome','matricula', 'status','button' ] 
  const paginacaoConfig = {
    rowsPerPage: 15, // Quantidade de linhas por página padrão
    paginate: true, // Ativar a paginação
  }
  const filter = ref('');

</script>

<style scoped lang="scss">
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
.tabelaPedidos {
  font-size: 12px;
  height: 70vh !important;

  @media screen and (max-width: 768px) {
    margin-right: 2rem;
    height: auto !important;
    font-size: 10px;
  }
}
.tabelaPedidos:deep(.tabPedido-title) {
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