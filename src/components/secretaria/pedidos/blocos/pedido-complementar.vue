
<template>
    <div class="q-pa-lg">        
      <div id="dadosComplementares" class="row justify-center">
        <p class="col-12 text-center titulo2">Complementar</p>       

          <inputView
            class="col-6"
            :label="'Raça'"
            :value="$props.raca?.descricao"
            :readonly="true"
          />

          <inputView
            class="col-6"
            :label="'Nacionalidade'"
            :value="$props.nacionalidade?.descricao"
            :readonly="true"
          />
          <div class="col-12 q-pt-md q-pl-md">   
            <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">
                <checkBox class="checkbox" :label="'Possui Deficiência (as)'" :falseValue="'N'" :trueValue="'S'" 
                v-model="$props.indDeficiencia"></checkBox>
            </span>
            <q-select multiple :readonly="true" :bg-color="$q.dark.isActive ? 'black' : 'accent'"
                dense outlined label="Selecione uma opção" v-model=" deficienciasComputadas" emit-value map-options
                use-input use-chips stack-label
                ></q-select>
            <q-tooltip v-if="$q.screen.width > 680" class="bg-indigo" anchor="center right"
                self="center left">Qual/quais tipo de deficiência possui
            </q-tooltip>      
          </div>        
            

          <inputView
            class="col-8"
            :label="'Escola que cursou o ensino médio'"
            :value="$props.nomeEscolaEnsMedio"
            :readonly="true"
          />
          <inputView
            class="col-4"
            :label="'Ano que conc. o Ens.Médio'"
            :value="$props.anoConcEnsMedio?.toString()"
            :readonly="true"
          />

          <div class="col-12 q-pt-lg" v-if="$props.indSemEscola == 'S'">   
            <span :style="$q.dark.isActive ? 'color: #D9D9D9;' : 'color:#333333;'" class="span">
                <checkBox class="checkbox" :label="'Não encontrei minha escola'" :falseValue="'N' || null" :trueValue="'S'" 
                v-model="$props.indSemEscola"></checkBox>
            </span>
            <inputView
              class="col-12"
              :label="'Justificativa'"
              :value="$props.justSemEscola"
              :readonly="true"
            />     
        </div>
      
      </div>       
    </div>
      
  </template>
  
  <script setup lang="ts">  
  import inputView from 'src/components/global/input-view.vue';
  import { TabEstruturada } from 'src/model/tabEstruturada/TabEstruturada';
  import {PropType} from 'vue'
  import checkBox from '../../../global/check-box.vue';

  import { computed } from 'vue'

  const deficienciasComputadas = computed(() => {
    return props.deficiencias?.map(
      (d) => d.descricao 
    )
  })
  
    const props = defineProps({  
      raca: Object,
      nacionalidade: Object,
      indDeficiencia:String,
      deficiencias:Array as PropType<Array<TabEstruturada>>,
      anoConcEnsMedio: Number,
      nomeEscolaEnsMedio:String,
      indSemEscola:String,
      justSemEscola:String

    }  
  ) 
  </script>
  
  <style scoped> 
  
  .titulo{
    color: #333;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.00469rem;
  }
  
  .titulo2{
    color: #8EC0E4;
    font-family: Manrope;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.00469rem;
  }

  .span {
    font-weight: 600;
}

.span .checkbox{
    margin-bottom: -3px;
}
  
  
  
  </style>