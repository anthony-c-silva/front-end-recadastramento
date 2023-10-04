import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));

  function setToken(tokenValue: string) {
    token.value = tokenValue;
    localStorage.setItem('token', tokenValue);
  }

  const isAuthenticated = computed(() => {
    if(token.value != null && token.value == localStorage.getItem('token')){
      return token.value;
    }else{
      return null;
    }
  });

  function clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    token.value = '';
  }

  return {
    token,
    setToken,
    isAuthenticated,
    clear,
  };
});
