<template>
    <div class="q-pa-lg">        
        <div id="dadosComplementares" class="row justify-center">
        <p class="col-12 text-center titulo2">Endereço</p>
        <inputView
          class="col-4"
          :label="'CEP'"
          :value="$props.cep"
          :readonly="true"
        />
        <inputView
          class="col-8"
          :label="'Logradouro'"
          :value="$props.logradouro"
          :readonly="true"
        />
        <inputView
          class="col-4"
          :label="'Número'"
          :value="$props.numero"
          :readonly="true"
        />
        <inputView
          class="col-8"
          :label="'Bairro'"
          :value="$props.bairro"
          :readonly="true"
        />
     
        <inputView
          class="col-10"
          :label="'Cidade'"
          :value="$props.cidade"
          :readonly="true"
        />

        <inputView
          class="col-2"
          :label="'Estado'"
          :value="$props.estado"
          :readonly="true"
        />
       
    </div>       
</div>
      
  </template>
  
  <script setup lang="ts">  
    import inputView from 'src/components/global/input-view.vue';
  
    const props = defineProps({
      cep: String,
      logradouro: String,
      numero: String,
      bairro: String,
      estado: String,
      cidade: String,
     
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
  
  
  
  </style>