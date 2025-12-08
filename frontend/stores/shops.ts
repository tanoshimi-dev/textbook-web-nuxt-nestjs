import { defineStore } from 'pinia';

interface Shop {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  status: string;
  users?: any[];
  createdAt: string;
  updatedAt: string;
}

export const useShopsStore = defineStore('shops', {
  state: () => ({
    shops: [] as Shop[],
    selectedShop: null as Shop | null,
    loading: false,
  }),

  actions: {
    async fetchShops() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.get('/shops');
        this.shops = response.data;
      } catch (error) {
        console.error('Failed to fetch shops:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchShop(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.get(`/shops/${id}`);
        this.selectedShop = response.data;
        return response.data;
      } catch (error) {
        console.error('Failed to fetch shop:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createShop(shopData: any) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.post('/shops', shopData);
        this.shops.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to create shop:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateShop(id: string, shopData: any) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const response = await $api.patch(`/shops/${id}`, shopData);
        const index = this.shops.findIndex(s => s.id === id);
        if (index !== -1) {
          this.shops[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Failed to update shop:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteShop(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api.delete(`/shops/${id}`);
        this.shops = this.shops.filter(s => s.id !== id);
      } catch (error) {
        console.error('Failed to delete shop:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
