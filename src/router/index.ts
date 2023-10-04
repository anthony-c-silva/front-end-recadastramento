import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';

import administradorRoutes from './Administrador';
import loginRoutes from './Login';
import alunoRoutes from './Aluno';
import secretariaRoutes from './Secretaria';
import errorRoutes from './ErrorFound';
import Error404 from 'src/components/erros/error-404.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', redirect: '/login' },
    loginRoutes,
    administradorRoutes,
    alunoRoutes,
    secretariaRoutes,
    errorRoutes,
    { path: '/:catchAll(.*)', component: Error404 },
  ],
});

router.beforeEach(routes);

export default router;
