import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(email: string, password: string) {
      const { $api } = useNuxtApp();
      const token = useCookie('auth_token');

      try {
        const response = await $api.post('/auth/login', { email, password });
        this.token = response.data.access_token;
        this.user = response.data.user;
        token.value = response.data.access_token;
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },

    async fetchProfile() {
      const { $api } = useNuxtApp();

      try {
        const response = await $api.get('/auth/profile');
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        this.logout();
      }
    },

    logout() {
      const token = useCookie('auth_token');
      this.user = null;
      this.token = null;
      token.value = null;
      navigateTo('/login');
    },

    async initializeAuth() {
      const token = useCookie('auth_token');
      if (token.value) {
        this.token = token.value;
        await this.fetchProfile();
      }
    },
  },
});
