// administrador.ts
import Administrador from 'src/pages/administrador.vue';
import ControleRecadastramento from 'src/components/administrador/controle-recadastramento.vue';
import MainHome from 'src/components/administrador/home/main-home.vue';

const administradorRoutes = {
  path: '/administrador',
  name: 'administrador',
  component: Administrador,
  //ATENÇÃO : comentado o meta ele DEIXA passar caminho pela URL , fazer isso quando for desenvolver outrar telas.
  meta: {
    auth: true,
  },
  children: [
    {
      path: 'home',
      name: 'administrador-home',
      component: MainHome,
      meta: {
        breadcrumb: [
          { name: 'Início', icon: 'mdi-home' }
        ]
      }
    },
    {
      path: 'recadastramento/:id?/:mode?',
      name: 'administrador-recadastramento',
      component: ControleRecadastramento,
      props: true,
      beforeEnter: (to: any, from: any, next: any) => {
        const mode = to.params.mode;

        let breadcrumbName = 'Novo Recadastramento';
        if (mode === 'editar') {
          breadcrumbName = 'Editar Recadastramento';

        } else if (mode === 'visualizar') {
          breadcrumbName = 'Visualizar Recadastramento'
        }

        to.meta = {
          breadcrumb: [
            { name: 'Início', link: {name: 'administrador-home'}, icon: 'mdi-home'},
            { name: breadcrumbName, icon: 'mdi-clipboard-text-outline' }
          ]
        };

        next();
      },
    },
  ],
};

export default administradorRoutes;
