<template>
    <div class="container">
      <q-form @submit="avancar" class="q-gutter-md">
      <div v-if="$q.screen.width < 768" class="row justify-center">
        <h5 class="subTitulo" :style="$q.dark.isActive ? 'color: #fff;' : 'color:#4F4F4F;'">Dados Complementares:</h5>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
            <selectButton lazy-rules :rules="'Este campo é obrigatório'" :label="'Auto declaração racial'" :options="optionsRaca" :emit-value="true" :map-options="true" v-model:selected="dadosComplementares.etniaDto">
            </selectButton>
        </div>
        <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
            <selectButton lazy-rules :rules="'Este campo é obrigatório'" :label="'Nacionalidade'" :options="optionsNacionalidade" :emit-value="true" :map-options="true" v-model:selected="dadosComplementares.nacionalidadeDto">
            </selectButton>
        </div>
        <div class="col-12 col-md-4 q-pl-md q-pr-md">
            <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">
                <checkBox class="checkbox" :label="'Possui Deficiência (as)'" :falseValue="'N'" :trueValue="'S'" 
                v-model="dadosComplementares.indDeficiencia"></checkBox>
            </span>
            <q-select multiple :readonly="dadosComplementares.indDeficiencia === 'N'" :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                dense outlined label="Selecione uma opção" v-model="dadosComplementares.pedidoDeficRecad" emit-value map-options :options="options"
                use-input @filter="filterDef" use-chips stack-label
                ></q-select>
            <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Qual/quais tipo de deficiência possui</q-tooltip>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-8 q-pl-md q-pr-md q-pt-md">
            <span :style="$q.dark.isActive ? 'color: #D9D9D9;font-size: 14px; font-weight: 600;' : 'color:#333333;font-size: 14px; font-weight: 600;'" class="span">Escola que cursou o ensino médio</span>
            <q-select
                :readonly="dadosComplementares.indSemEscola == 'S'"
                v-model="dadosComplementares.escolasRecadDto"
                use-input
                lazy-rules :rules="[rulesSelect]"
                :options="optionsEscola"
                option-label="nomeEscola"
                @filter="filterEscola"
                input-debounce="500"
                dense
                :popup-content-style="{ backgroundColor: $q.dark.isActive ? 'black' : 'accent' }"
                :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                outlined
                label="Digite o nome da escola"
            >
            </q-select> 
            <TooltipeMsg :texto="'Nome da escola onde cursou o ensino médio'" ></TooltipeMsg>
        </div>
        <div class="col-12 col-md-4 q-pl-md q-pr-md q-pt-md">
            <inputTextfield lazy-rules :rules="'Este campo é obrigatório'" label="Ano que concluiu o Ens. Médio" label-in="Apenas números" 
                tooltip-txt="Ano em que concluiu o ensino médio" type="text" :mask="'####'" v-model:text="dadosComplementares.anoConcEnsMedio"></inputTextfield>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12 q-pl-sm">
            <checkBox label="Não encontrei minha escola" :falseValue="'N'" :trueValue="'S'" v-model="dadosComplementares.indSemEscola" >
            </checkBox>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12 col-md-8 q-pl-md q-pr-md">
            <inputTextfield :desabilitar="dadosComplementares.indSemEscola === 'N'" :lazy-rules="dadosComplementares.indSemEscola === 'S'" 
                :rules="'Este campo é obrigatório'" label="Justificativa" label-in="Digite sua justificativa" 
                tooltip-txt="Justificativa de que não encontrou sua escola" type="text" v-model:text="dadosComplementares.justEscola"></inputTextfield>
        </div>
        <div class="col-12 col-md-4 q-pl-md q-pr-md">
            <selectButton :label="'Dependência Adm. da Escola'" :options="optionsDepAdmEscola" :emit-value="true" 
                :map-options="true" v-model:selected="dadosComplementares.depAdmEscola">
            </selectButton>
        </div>
      </div>

      <div class="row justify-between">
            <div class="col-md-2">
              <q-btn @click="voltar" style="width: 100%;" color="primary" label="Voltar" class="q-ml-sm" />
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
import { onMounted, ref, watch } from 'vue';
import selectButton from '../global/select-button.vue';
import checkBox from '../global/check-box.vue';
import inputTextfield from '../global/input-textfield-vmodel.vue';
import { DadosRecad } from 'src/model/aluno/DadosRecad';
import TooltipeMsg from '../global/tooltip-msg.vue';
import { Escola } from 'src/model/Escola';
import { useQuasar } from 'quasar';
import { DadosComplementaresDto } from 'src/model/aluno/DadosComplementaresDto';
import { verificarMudancas } from 'src/services/Utils';

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

const emit = defineEmits(['eventDadosComplementares', 'eventStep']);

const axios = axiosStore();

const tabRacaCenso = ref([new TabEstruturada()]);
const optionsRaca = ref();

const tabDeficiencia = ref([new TabEstruturada()]);
const optionsDeficienciaFiltrado = ref();
let options = ref([]);

let optionsEscola = ref([]);

let achouEscolaPedido = false;

const tabNacionalidadeCenso = ref([new TabEstruturada()]);
const optionsNacionalidade = ref();

const optionsDepAdmEscola = ref([
    {   
        value: 'Privada',
        label: 'Privada'
    },
    {   
        value: 'Municipal',
        label: 'Municipal'
    },
    {   
        value: 'Estadual',
        label: 'Estadual'
    },
    {   
        value: 'Federal',
        label: 'Federal'
    },
]);

const rulesSelect = (val: any) => {
  if (val === null) {
    return 'Este campo é obrigatório'        
  }
}

onMounted(async () => {
  if (props.idRecad != null) {
    await getDadosPedido(props.idRecad)
  }
})

const dadosRecadSie = ref(new DadosRecad());
const dadosRecadPedido = ref(new DadosRecad());
const dadosComplementares = ref(new DadosComplementaresDto())

const getDadosPedido = async (idRecad: string) => {
  try {

    dadosRecadSie.value = await axios.getDados('/aluno/recad/dados/sie?idConfigRecad='+idRecad)
    dadosRecadPedido.value = await axios.getDados('/aluno/recad/dados/pedido?idConfigRecad='+idRecad)

    dadosRecadPedido.value.dadosComplementaresDto.idConfigRecad = Number(idRecad);
    dadosRecadSie.value.dadosComplementaresDto.idConfigRecad = Number(idRecad);
    
    dadosComplementares.value.idConfigRecad = Number(idRecad)

      let dadosMudou = verificarMudancas(dadosRecadSie.value.dadosComplementaresDto, dadosRecadPedido.value.dadosComplementaresDto)

      if (dadosMudou === true) {
        dadosComplementares.value = dadosRecadPedido.value.dadosComplementaresDto! 
        dadosComplementares.value.depAdmEscola = dadosComplementares.value.depAdmEscola  
      } else { 
        dadosComplementares.value = dadosRecadSie.value.dadosComplementaresDto!
        dadosComplementares.value.indDeficiencia = 'N'
        if (dadosComplementares.value.pedidoDeficRecad){
          dadosComplementares.value.indDeficiencia = 'S'

          dadosComplementares.value.pedidoDeficRecad.forEach(element => {
            if (element.deficienciaItem === 5 || element.deficienciaItem === 99){
              dadosComplementares.value.indDeficiencia = 'N'
              dadosComplementares.value.pedidoDeficRecad = undefined
            }
          });
        }
      }

      if(dadosComplementares.value.escolasRecadDto !== null){
        achouEscolaPedido = true;
      }

      dadosComplementares.value.indSemEscola = 'N'

  } catch (error) {
    console.error
  }      
} 

const getRacaCenso = async () => {
  try {
    const racas = await axios.getDados('/tabestruturada/{codigo}?codigo=509');
    tabRacaCenso.value = racas!
    const optionsRacaFiltrado = tabRacaCenso.value
      .filter(obj => obj.ativo === 'S' && obj.item !== 0)
      .map(obj => {
        return {
          label: `${obj.descricao?.trim()}`,
          value: { codigo: obj.codigo, item: obj.item, descricao: obj.descricao?.trim() }
        };
      });

    optionsRaca.value = optionsRacaFiltrado;
  } catch (error) {
    console.error(error)
  }
}

const getDeficiencia = async () => {
  try {
    const defic = await axios.getDados('/tabestruturada/{codigo}?codigo=229');
    tabDeficiencia.value = defic
    const deficienciasFiltrado = tabDeficiencia.value
      .filter(obj => obj.ativo === 'S' && obj.item !== 0 && obj.item !== 5 && obj.item !== 99)
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

const getNacionalidadeCenso = async () => {
  try {
    const nacionalidade = await axios.getDados('/tabestruturada/{codigo}?codigo=163');
    tabNacionalidadeCenso.value = nacionalidade
    const optionsNacionalidadeFiltrado = tabNacionalidadeCenso.value
      .filter(obj => obj.ativo === 'S' && obj.item !== 0)
      .map(obj => {
        return {
          label: `${obj.descricao?.trim()}`,
          value: { codigo: obj.codigo, item: obj.item, descricao: obj.descricao?.trim() }
        };
      });
      optionsNacionalidade.value = optionsNacionalidadeFiltrado;
  } catch (error) {
    console.error(error)
  }
}

const getEscola = async (nomeEscola: string) => {
  return await axios.getDados('/escola/nome?nomeEscola='+nomeEscola)
};

const avancar = async () => {
  try {
    await salvarDadosComplementar()
  } catch (error){
    console.error(error)
  }
}

const voltar = () => {
    emit('eventStep', -1)
}

const salvarDadosComplementar = async () => {
  try {
    let response = '';

    dadosComplementares.value.anoConcEnsMedio = Number(dadosComplementares.value.anoConcEnsMedio)

    response = await axios.putDados('/aluno/pedido/complementares', dadosComplementares.value)

    if (response === '') {
      $q.notify({
        color: 'positive',
        icon: 'check',
        message: 'Dados complementares salvos!',
      })

      emit('eventStep', 1)
    } 
  }catch (error){
    console.error(error)
  }
}

const filterDef = (val: string, update: (arg0: { (): void; (): never[]; }) => void) => {
  if (val === '') {
    update(() => options.value = optionsDeficienciaFiltrado.value)
    return options.value
  }

  update(() => {
    const textoSearch = val.toLowerCase()
    options.value = options.value.filter((v: string) => v.label.toLowerCase().indexOf(textoSearch) > -1)
    return options.value
  })
}
const filterEscola = (val: string, update: (arg0: { (): void; (): never[]; }) => void) => {
    if (val === '') {
        achouEscolaPedido = false;
        update(() => optionsEscola.value = [])
        return optionsEscola.value
    }    

    update(() => {
        const textoSearch = val.toLowerCase()
        getEscola(textoSearch).then(d => {
          const optionsEscolaFiltrado = d.map((obj) => {
            return {
              nomeEscola: `${obj.nomeEscola.trim()}`,
              id: obj.id,
              dependAdm: obj.dependAdm
            };
          })
          optionsEscola.value = optionsEscolaFiltrado
        })
        
        if(optionsEscola.value !== null){
          return optionsEscola.value
        }

        return optionsEscola.value
    })
}
watch( () => [dadosComplementares.value.escolasRecadDto], () => {
  if (dadosComplementares.value.escolasRecadDto !== null && achouEscolaPedido === false){
    dadosComplementares.value.depAdmEscola = dadosComplementares.value.escolasRecadDto.dependAdm!
    dadosComplementares.value.indSemEscola = 'N'
  }
});

// chama as funções ao criar o component
getDeficiencia()
getNacionalidadeCenso()
getRacaCenso()

</script>
<style lang="scss" scoped>
    
.span {
    font-weight: 600;
}

.span .checkbox{
    margin-bottom: -3px;
}
.subTitulo {
    font-size: 1.3rem;
    font-weight: 600;
}

</style>