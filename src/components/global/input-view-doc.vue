<template>
    <q-card class="my-card"  bordered>
      <div class="maxTam">
        <q-img  v-if="tipo === 'png'" :src="'data:application/'+tipo+';base64,'+value"></q-img>
      </div>
      <div >
        <q-img  class="maxTam" v-if="tipo === 'jpg'" :src="'data:application/'+tipo+';base64,'+value"></q-img>
      </div>

      <div  v-if="tipo === 'pdf'" style="padding: 16px;">
        <object :data="'data:application/'+tipo+';base64,'+value" type="application/pdf">
          <p>Seu navegador não tem um plugin pra PDF</p>
        </object>
      </div>

      <div class="text-subtitle2 text-center">
          {{ label }}
      </div>

      <q-card-actions align="center">
        <q-btn @click="downloadArquivo()" flat color="primary" icon="download" />
      </q-card-actions>

    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'InputViewDoc',

    props: {
        readonly:Boolean,
        nomeArquivo: String,
        value:String,
        labelIn: String,
        label: String,
        type: String as () => 'number' | 'text' | 'password' | 'email' | 'date',
        placeholder: String,
        tooltipTxt: String,
        mask: String,
        tipo: String,
    },
    methods:{
      downloadArquivo(){
        if(this.value && this.tipo && this.nomeArquivo)
        {
          const base = 'data:application/'+this.tipo+';base64,'+this.value;

          this.converteBase64emArquivo(base, this.tipo, this.nomeArquivo)
        }
      },
      converteBase64emArquivo(base64: string, tipo : string, nome : string) {

        var a = document.createElement("a");
        a.href = base64;
        a.download = nome;
        a.click();
      },
    }
  })
</script>
<style lang="scss">
.my-card{
  width: 100%;
  max-width: 335px;
}
.maxTam{
  max-height: 187px;
}
</style>
