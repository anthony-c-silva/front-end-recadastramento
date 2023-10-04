<template>
   <div class="q-pa-lg">        
        <div id="dadosBasicos" class="row justify-center">
          <p class="col-12 text-center titulo2">Básico</p>
  <inputView
    class="col-12"
    :label="'Nome Completo'"
    :value="$props.nomeCompleto"
    :readonly="true"
  />
  <inputView
    class="col-12"
    :label="'Nome Social'"
    :value="$props.nomeSocial"
    :readonly="true"
  />
  <inputView
    class="col-8"
    :label="'CPF'"
    :value="$props.cpf"
    :readonly="true"
  />
  <inputView
    class="col-4"
    :label="'Sexo'"
    :value="$props.sexo"
    :readonly="true"
  />
  <inputView
    class="col-12"
    :label="'Nome da Mãe'"
    :value="$props.nomeMae"
    :readonly="true"
  />
  <inputView
    class="col-12"
    :label="'Data de Nascimento'"
    :value="$props.dataNascimento"
    :readonly="true"
  />
  <inputView
    class="col-12"
    :label="'Email'"
    :value="$props.email"
    :readonly="true"
  />
  <inputView
    class="col-12"
    :label="'Celular'"
    :value="$props.celular"
    :readonly="true"
  />  
    
</div>       
      </div>
</template>

<script setup lang="ts">  
  import inputView from 'src/components/global/input-view.vue';

  const props = defineProps({
    nomeCompleto: String,
    nomeSocial: String,
    cpf: String,
    sexo: String,
    nomeMae: String,
    dataNascimento: String,
    email: String,
    celular: String
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