// administrador.ts
import Login from 'src/pages/login.vue';
const loginRoutes = {
  path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false,
      },
};
export default loginRoutes;
