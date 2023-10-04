// administrador.ts
import Aluno from 'src/pages/aluno.vue';
import VerificaEmail from 'src/components/aluno/verificar-email.vue'
import VerificaCodigo from 'src/components/aluno/verifica-codigo.vue'
import MainHome from 'src/components/aluno/home/aluno-home.vue'
import EscolhaRecads from 'src/components/aluno/escolha-recads.vue'
import AcompanharRecadastramento from 'src/components/aluno/acompanhar-recadastramento.vue'
const alunoRoutes = {
  path: '/aluno',
  name: 'aluno',
  component: Aluno,
  //ATENÇÃO : comentado o meta ele DEIXA passar caminho pela URL , fazer isso quando for desenvolver outrar telas.
  meta: {
    auth: true,
  },
  children: [
    {
      path: 'recads',
      name: 'escolha-recads',
      component: EscolhaRecads,
    },
    {
      path: 'email',
      name: 'verifica-email',
      component: VerificaEmail,
    },
    {
      path: 'codigoEmail',
      name: 'verifica-codigo',
      component: VerificaCodigo,
    },
    {
      path: 'recadastramento',
      name: 'aluno-recadastramento',
      component: MainHome,
    },
    {
      path: 'andamento-recadastramento',
      name: 'acompanhar-recadastramento',
      component: AcompanharRecadastramento,
    }
  ],
};

export default alunoRoutes;
