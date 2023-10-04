import ErrorFound from 'src/pages/error-found.vue'
import Error404 from 'src/components/erros/error-404.vue'

const ErrorRoutes = {
  path: '/error-foud',
  name: 'error',
  component: ErrorFound,
  //ATENÇÃO : comentado o meta ele DEIXA passar caminho pela URL , fazer isso quando for desenvolver outrar telas.
  meta: {
    auth: true,
  },
  children: [
    {
      path: '404',
      name: 'error-404',
      component: Error404,
    },
  ]
};
export default ErrorRoutes;
