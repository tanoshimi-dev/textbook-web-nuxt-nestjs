import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie('auth_token');

  const api = axios.create({
    baseURL: `${config.public.apiBaseUrl}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add token
  api.interceptors.request.use(
    (config) => {
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        token.value = null;
        navigateTo('/login');
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
