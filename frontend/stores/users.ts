import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  status: string;
  shop?: any;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    selectedUser: null as User | null,
    loading: false,
  }),

  actions: {
    async fetchUsers() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.get(`/users/${id}`);
        this.selectedUser = response.data;
        return response.data;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createUser(userData: any) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.post('/users', userData);
        this.users.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id: string, userData: any) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.patch(`/users/${id}`, userData);
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Failed to update user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api.delete(`/users/${id}`);
        this.users = this.users.filter(u => u.id !== id);
      } catch (error) {
        console.error('Failed to delete user:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
