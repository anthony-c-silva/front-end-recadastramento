<template>
  <div>
    <q-file
      counter
      filled
      dense
      :max-file-size = maxFileSize
      v-model="file"
      :label="label"
      :multiple="multiple"
      :bg-color="$q.dark.isActive ? 'black' : 'accent'"
      :rules="[(val) => !!val || rules ]"
      accept=".jpg,.pdf,image/*"
      @rejected="onRejeitado(maxFileSize)"
    >
    </q-file>
    <TooltipeMsg :texto="tooltipTxt"></TooltipeMsg>
  </div>
  {{ base64Data }}
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import TooltipeMsg from 'components/global/tooltip-msg.vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FilePicker',
  emits: ['update:value'],
  props: {
    readonly: Boolean,
    label: String,
    multiple: Boolean,
    tooltipTxt: String,
    maxFileSize: [Number, String],
    rules: String,
  },
  components: {
    TooltipeMsg,
  },
  setup(props, { emit }) {

    const $q = useQuasar()
    const file = ref('');
    const base64Data = ref('');

    const converteFileInBase64 = async (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.result) {
            resolve(reader.result.toString());
          } else {
            reject('Não foi possível ler o arquivo como base64!');
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };

    watch(file, async (valor) => {
      if (valor) {
        try {
          const novoBase64Data = await converteFileInBase64(valor);
          console.log(novoBase64Data)
          emit('update:value', novoBase64Data);
        } catch (error) {
          console.error('Erro ao converter arquivo para base64:', error);
        }
      }
    });

    return {
      file,
      base64Data,
      onRejeitado(value: any) {
        $q.notify({
          type: 'negative',
          message: `Arquivo muito grande! Tamanho máximo de ${value/1000} kB `
        })
      }
    }
  },
});
</script>

<style lang="scss">
.span {
  font-size: 18px;
  font-weight: 600;
  color: #4f4f4f;
}
</style>
