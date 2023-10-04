// secretaria.ts
import Secretaria from 'src/pages/secretaria.vue';
import MainHome from 'src/components/secretaria/main-home.vue';
import PedidosHome from 'src/components/secretaria/pedidos/pedidos-home.vue'

const secretariaRoutes = {
  path: '/secretaria',
  name: 'secretaria',
  component: Secretaria,
  //ATENÇÃO : comentado o meta ele DEIXA passar caminho pela URL , fazer isso quando for desenvolver outrar telas.
  meta: {
    auth: true,
  },
  children: [
    {
      path: 'home',
      name: 'secretaria-home',
      component: MainHome,
    },
    {
      path: 'secretaria-pedidos/:id?',
      name: 'secretaria-pedidos',
      component: PedidosHome,

    },
    // {
    //   path: 'recadastramento/:id?/:mode?',
    //   name: 'secretaria-recadastramento',
    //   component: ControleRecadastramento,
    //   props: true,
    //   beforeEnter: (to: any, from: any, next: any) => {
    //     const mode = to.params.mode;

    //     let breadcrumbName = 'Novo Recadastramento';
    //     if (mode === 'editar') {
    //       breadcrumbName = 'Editar Recadastramento';

    //     } else if (mode === 'visualizar') {
    //       breadcrumbName = 'Visualizar Recadastramento'
    //     }

    //     to.meta = {
    //       breadcrumb: [
    //         { name: 'Início', link: {name: 'secretaria-home'}, icon: 'mdi-home'},
    //         { name: breadcrumbName, icon: 'mdi-clipboard-text-outline' }
    //       ]
    //     };

    //     next();
    //   },
    // },
  ],
};

export default secretariaRoutes;
