<template>
    <div>
        <q-stepper
            v-model="step"
            vertical
            header-nav
            color="primary"
            animated
        >
        <template  v-for="(d,index) in dados " :key="d.situcaoPedido" >
            <q-step
                :name="index"
                :title="d.situcaoPedido + ' - ' + d.descricaoSimp"
                :caption="d.tipoUsuario + ' - ' + moment(String(d.dtAlteracao)).format('DD/MM/YYYY') + ' - ' + d.hrAlteracao"
                :icon="getIconStatus(d.situcaoPedido)"
                :active-icon="getIconStatus(d.situcaoPedido)"
                done-color="green"
                :color="getColorStatusQuasar(d.situcaoPedido)"
                :model-value="dados"
                class="flex"
            >
            <p v-if="d.descricao">
                Despacho:   {{ d.descricao }}
            </p>


            </q-step>

        </template>

        </q-stepper>

    </div>
</template>

<script setup lang="ts">
import { axiosStore } from 'src/stores/AxiosStore';
import { onMounted, ref } from 'vue'
import moment from 'moment'
import { getIconStatus, getColorStatusQuasar } from '../../services/Utils'

    const axios = axiosStore();
    const dados = ref()
    const step = ref(1)

    const props = defineProps({
        idPedidoRecad: {
            type: Number
        }
    })

    onMounted( async () => {
        await getLogs()
    });


    const getLogs = async () => {
       axios.getDados("/sec/pedido/logs?idPedidoRecad="+ props.idPedidoRecad).then( d => {
        dados.value = d
       })
    }

</script>


<style scoped>

</style>
