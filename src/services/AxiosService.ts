import axios from 'axios';
import { Environment } from 'src/environment/Environment';
import { useUsuario } from 'src/stores/login/Usuario';
import routes from 'src/router/index';
import { Notify } from 'quasar';


const axiosService = axios.create({
  baseURL: Environment.backEnd,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 10000,
});

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const usuario = useUsuario();

    if (error.response.status === 401) {
      Notify.create({
        color: 'negative',
        message: error.response.data.error || "Você foi desconectado!",
      })
      usuario.loggout();
      return;
    } else if (error.response.status === 404) {
      Notify.create({
        color: 'negative',
        message: error.response.data.error || routes.push({ name: 'error-404' }),
      });
      routes.push({ name: 'error-404' });
      return;
    }else if (error.response.status === 400){

        Notify.create({
          color: 'negative',
          message: error.response.data.error || "erro - 400",
        });
        return;
    }
  }

);

axiosService.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);

export default axiosService;
