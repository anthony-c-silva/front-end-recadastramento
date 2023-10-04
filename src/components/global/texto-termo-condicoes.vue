<template>
  <div style=" padding-bottom: 5%; padding-top: 5% ; user-select: none;" class="text-h6 bold">Termos e Condições</div>
  <div style="text-align: justify; padding: 5px; user-select: none;">
      <p>Bem-vindo ao processo de recadastramento de alunos da Faculdade Fictícia! Antes de prosseguir com o recadastramento, solicitamos que leia atentamente nossos Termos e Condições. Ao realizar o recadastramento, você concorda com os seguintes termos:</p>
      1.Veracidade das Informações: 1.1. Ao realizar o recadastramento, você declara que todas as informações fornecidas são verdadeiras, atualizadas e precisas. 1.2. É responsabilidade do aluno manter seus dados cadastrais corretos e atualizados junto à faculdade.
      Uso dos Dados: 2.1. Os dados fornecidos no recadastramento serão utilizados exclusivamente para fins administrativos e acadêmicos pela Faculdade Fictícia. 2.2. Garantimos que suas informações serão tratadas com confidencialidade e não serão compartilhadas com terceiros sem seu consentimento expresso.
      Responsabilidade do Aluno: 3.1. O aluno é responsável por garantir que o processo de recadastramento seja concluído dentro do prazo estabelecido pela faculdade. 3.2. É de responsabilidade do aluno fornecer informações precisas e completas durante o recadastramento.
      Cancelamento do Recadastramento: 4.1. A Faculdade Fictícia reserva-se o direito de cancelar o recadastramento caso sejam identificadas informações falsas ou inconsistentes. 4.2. Caso o recadastramento seja cancelado, o aluno será notificado e deverá seguir os procedimentos estabelecidos pela faculdade para regularização.
      Política de Privacidade: 5.1. Nossa política de privacidade descreve como tratamos seus dados pessoais durante o processo de recadastramento e pode ser encontrada em nossa página oficial. 5.2. Ao aceitar estes termos, você também concorda com nossa política de privacidade.
      Comunicação: 6.1. A faculdade poderá utilizar os dados fornecidos no recadastramento para enviar informações relevantes sobre a vida acadêmica, eventos, comunicados e outras informações importantes. 6.2. O aluno poderá optar por receber ou não essas comunicações e poderá gerenciar suas preferências de comunicação a qualquer momento.
      Ao prosseguir com o recadastramento, você concorda com todos os termos e condições mencionados acima. Se tiver dúvidas ou precisar de esclarecimentos adicionais, entre em contato com o setor de atendimento ao aluno da Faculdade Fictícia.
      Agradecemos por sua cooperação e desejamos um excelente ano acadêmico!
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

  export default defineComponent({
    name: 'TextoTermoCondicoes',
    emits: ['update:value'],

    setup(props, { emit }) {

    const file = ref('');

    watch(file, async (valor) => {

      if (valor) {
        try {
          emit('update:value', valor);
        } catch (error) {
          
        }
      }
    });

    return {
      file,
    }
    }
  })

</script>
