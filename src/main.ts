import axios from 'axios';
import {createApp} from 'vue';
import App from './App.vue'

axios.interceptors.request.use(config =>{

  config.data = {hai: 'hai'}
  return config;
})
createApp(App).mount('#app');
