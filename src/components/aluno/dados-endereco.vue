<template>
    <div class="container">
      <q-form @submit="avancar" class="q-gutter-md">
      <div v-if="$q.screen.width < 768" class="row justify-center">
        <h5 class="subTitulo" :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4F4F4F;'">Endereço:</h5>
      </div>
      <div class="row">
          <div class="col-12 col-md-3 q-pl-md q-pr-md q-pt-md">
              <inputTextfield :label="'CEP'" :type="'text'" lazy-rules :rules="'Este campo é obrigatório'" :label-in="'Digite apenas números'"
              :tooltip-txt="'Digite o CEP do seu endereço.'" :mask="'#####-###'" v-model:text="dadosEndereco.cep" 
              ></inputTextfield>
          </div>
          <div class="col-12 col-md-7 q-pl-md q-pr-md q-pt-md">
               <inputTextfield :label="'Logradouro'" lazy-rules :rules="'Este campo é obrigatório'" :type="'text'" :label-in="'Digite o logradouro'"
                :tooltip-txt="'Digite o nome de sua rua/logradouro'" v-model:text="dadosEndereco.logradouro"
               ></inputTextfield>
          </div>
          <div class="col-12 col-md-2 q-pl-md q-pr-md q-pt-md">
               <inputTextfield :label="'Número'" lazy-rules :rules="'Este campo é obrigatório'" :type="'text'"
                :tooltip-txt="'Digite o número de sua casa'" v-model:text="dadosEndereco.numero"
               ></inputTextfield>
          </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-4 q-pl-md q-pr-md">
            <inputTextfield :label="'Bairro'" :type="'text'" lazy-rules :rules="'Este campo é obrigatório'" :label-in="'Digite o bairro'"
                :tooltip-txt="'Digite o bairo onde você reside'" v-model:text="dadosEndereco.bairro"
            ></inputTextfield>
        </div>
        <div class="col-12 col-md-5 q-pl-md q-pr-md">
          <span :style="$q.dark.isActive ? 'color: #D9D9D9;font-size: 14px; font-weight: 600;' : 'color:#333333;font-size: 14px; font-weight: 600;'" class="span">Cidade</span>
          <q-select
            v-model="dadosEndereco.cidade"
            use-input
            :options="optionsCidade"
            option-label="nome"
            emit-value
            @filter="filterCidade"
            input-debounce="500"
            dense
            :popup-content-style="{ backgroundColor: $q.dark.isActive ? 'black' : 'accent' }"
            :bg-color="$q.dark.isActive ? 'black' : 'accent'"
            outlined
            label="Digite a sua cidade"
          >
          </q-select>
          <TooltipeMsg :texto="'Nome da escola onde cursou o ensino médio'" ></TooltipeMsg>
        </div>
        <div class="col-12 col-md-3 q-pl-md q-pr-md">
            <selectButton lazy-rules :rules="'Este campo é obrigatório'" :label="'Estado'" :options="optionsEstados" :emit-value="true" :map-options="true" v-model:selected="dadosEndereco.estadoDto">
            </selectButton>
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
import { TabEstruturada } from 'src/model/tabEstruturada/TabEstruturada';
import { axiosStore } from 'src/stores/AxiosStore';
import { ref, watch, onMounted } from 'vue';
import selectButton from '../global/select-button.vue';
import inputTextfield from '../global/input-textfield-vmodel.vue';
import { DadosRecad } from 'src/model/aluno/DadosRecad';
import { DadosEnderecoDto } from 'src/model/aluno/DadosEnderecoDto';
import { verificarMudancas } from 'src/services/Utils';
import TooltipeMsg from 'src/components/global/tooltip-msg.vue'
import { useQuasar } from 'quasar';

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

  const $q = useQuasar();
  const axios = axiosStore();
  const emit = defineEmits(['eventDadosComplementares', 'eventStep']);

  const tabEstados = ref([new TabEstruturada()]);
  const optionsEstados = ref();

  let optionsCidade = ref([]);

  const dadosRecadSie = ref(new DadosRecad());
  const dadosRecadPedido = ref(new DadosRecad());

  const dadosEndereco = ref(new DadosEnderecoDto())

  dadosEndereco.value.bairro = ''
  dadosEndereco.value.cep = ''
  dadosEndereco.value.logradouro = ''
  dadosEndereco.value.numero = ''

  onMounted(async () => {
    if (props.idRecad != null) {
      await getDadosPedido(props.idRecad)
    }
  })

  const getDadosPedido = async (idRecad: string) => {
    try {
      dadosRecadSie.value = await axios.getDados('/aluno/recad/dados/sie?idConfigRecad='+idRecad)
      dadosRecadPedido.value = await axios.getDados('/aluno/recad/dados/pedido?idConfigRecad='+idRecad)

      dadosRecadPedido.value.dadosEnderecoDto.idConfigRecad = Number(idRecad);
      dadosRecadSie.value.dadosEnderecoDto.idConfigRecad = Number(idRecad);

      dadosEndereco.value.idConfigRecad = Number(idRecad)

      let dadosMudou = verificarMudancas(dadosRecadSie.value.dadosEnderecoDto, dadosRecadPedido.value.dadosEnderecoDto)

      if (dadosMudou === true) {
        dadosEndereco.value = dadosRecadPedido.value.dadosEnderecoDto!      
      } else { 
        dadosEndereco.value = dadosRecadSie.value.dadosEnderecoDto!
      }

      if (dadosEndereco.value.cidade !== null){
        dadosEndereco.value.cidade.nome = `${dadosEndereco.value.cidade?.nome}`
      }

    } catch (error) {
      console.error
    }      
  }

  const avancar = async () => {
    try {
      await salvarDadosEndereco()
    } catch (error){
      console.error(error)
    }
  }

  const voltar = () => {
    emit('eventStep', -1)
  }

  const salvarDadosEndereco = async () => {
    try {
      let response = '';

      response = await axios.putDados('/aluno/pedido/endereco', dadosEndereco.value)

      if (response === '') {
        $q.notify({
          color: 'positive',
          icon: 'check',
          message: 'Endereço salvo com sucesso!',
        })

        emit('eventStep', 1)
      } 
    }catch (error){
      console.error(error)
    }
  }

  const getEstados = async () => {
    try {
        const estados = await axios.getDados("/tabestruturada/{codigo}?codigo=206");
        tabEstados.value = estados

        const optionsEstadoFiltrado = tabEstados.value
            .filter(obj => obj.ativo === 'S' && obj.item! > 0 && obj.item! < 28 )
            .map(obj => {
              return {
                label: `${obj.sigla?.trim()}`,
                value: { codigo: obj.codigo, item: obj.item, descricao: obj.descricao?.trim() }
              };
            });

        optionsEstados.value = optionsEstadoFiltrado;

    } catch (error) {
        console.error(error)
    }
  }
  const getCidade = async (nomeCidade: string) => {
    return await axios.getDados('/cidade?nomeCidade='+nomeCidade)
  };


  const filterCidade = (val: string, update: (arg0: { (): void; (): never[]; }) => void) => {
    if (val === '') {
        update(() => optionsCidade.value = [])
        return optionsCidade.value
    }

    update(() => {
        const textoSearch = val.toLowerCase()
        getCidade(textoSearch).then(d => {
          const optionsCidadeFiltrado = d.map((obj) => {
            return {
              nome: `${obj.nome.trim()} - ${obj.uf.trim()}`,
              value: obj
            };
          })

          optionsCidade.value = optionsCidadeFiltrado
        })

        if(optionsCidade.value !== null){
          return optionsCidade.value
        }

        return optionsCidade.value
    })
  }

  watch( () => [dadosEndereco.value.cidade], () => {
    optionsEstados.value.forEach((element: any) => {
      if (dadosEndereco.value.cidade?.uf.trim() ===  element.label.trim()){
        dadosEndereco.value.estadoDto = element.value
      }
    });
  });

  getEstados();

</script>
<style lang="scss" scoped>
.subTitulo {
    font-size: 1.3rem;
    font-weight: 600;
}
</style>
