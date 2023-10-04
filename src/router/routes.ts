import { useAuth } from 'src/stores/login/Auth';
import { useUsuario } from 'src/stores/login/Usuario';

export default async function routes(to: any, from: any, next: any) {
  const auth = useAuth();
  const user = useUsuario();
  if (to.meta.auth && !auth.isAuthenticated) {
    next('/login');
  } else if (!to.meta.auth && auth.isAuthenticated && user.logado) {
    next();
  } else {
    next();
  }
}
