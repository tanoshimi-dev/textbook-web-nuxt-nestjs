<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Shop Management System</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">{{ authStore.currentUser?.firstName }} {{ authStore.currentUser?.lastName }}</span>
            <span class="text-sm text-gray-500">({{ authStore.currentUser?.role }})</span>
            <button
              @click="authStore.logout"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-2">Total Users</h2>
          <p class="text-4xl font-bold text-blue-600">{{ usersStore.users.length }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-2">Total Shops</h2>
          <p class="text-4xl font-bold text-green-600">{{ shopsStore.shops.length }}</p>
        </div>
      </div>

      <div class="flex space-x-4 mb-6">
        <button
          @click="activeTab = 'users'"
          :class="[
            'px-6 py-2 rounded-md font-semibold',
            activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          ]"
        >
          Users
        </button>
        <button
          @click="activeTab = 'shops'"
          :class="[
            'px-6 py-2 rounded-md font-semibold',
            activeTab === 'shops' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          ]"
        >
          Shops
        </button>
      </div>

      <div v-if="activeTab === 'users'" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Users Management</h2>
          <button
            @click="showUserForm = true; editingUser = null"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Email</th>
                <th class="px-4 py-2 text-left">Role</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2 text-left">Shop</th>
                <th class="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersStore.users" :key="user.id" class="border-b">
                <td class="px-4 py-2">{{ user.firstName }} {{ user.lastName }}</td>
                <td class="px-4 py-2">{{ user.email }}</td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 rounded text-sm" :class="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 rounded text-sm" :class="getStatusBadgeClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-4 py-2">{{ user.shop?.name || '-' }}</td>
                <td class="px-4 py-2">
                  <button
                    @click="editUser(user)"
                    class="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'shops'" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Shops Management</h2>
          <button
            @click="showShopForm = true; editingShop = null"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Shop
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Email</th>
                <th class="px-4 py-2 text-left">Phone</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2 text-left">Users</th>
                <th class="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shop in shopsStore.shops" :key="shop.id" class="border-b">
                <td class="px-4 py-2">{{ shop.name }}</td>
                <td class="px-4 py-2">{{ shop.email || '-' }}</td>
                <td class="px-4 py-2">{{ shop.phoneNumber || '-' }}</td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 rounded text-sm" :class="getStatusBadgeClass(shop.status)">
                    {{ shop.status }}
                  </span>
                </td>
                <td class="px-4 py-2">{{ shop.users?.length || 0 }}</td>
                <td class="px-4 py-2">
                  <button
                    @click="editShop(shop)"
                    class="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteShop(shop.id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- User Form Modal -->
    <div v-if="showUserForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">{{ editingUser ? 'Edit User' : 'Add User' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Email</label>
            <input v-model="userForm.email" type="email" class="w-full px-3 py-2 border rounded" required />
          </div>
          <div v-if="!editingUser" class="mb-4">
            <label class="block text-sm font-bold mb-2">Password</label>
            <input v-model="userForm.password" type="password" class="w-full px-3 py-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">First Name</label>
            <input v-model="userForm.firstName" type="text" class="w-full px-3 py-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Last Name</label>
            <input v-model="userForm.lastName" type="text" class="w-full px-3 py-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Phone</label>
            <input v-model="userForm.phoneNumber" type="text" class="w-full px-3 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Role</label>
            <select v-model="userForm.role" class="w-full px-3 py-2 border rounded" required>
              <option value="super_admin">Super Admin</option>
              <option value="shop_owner">Shop Owner</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Status</label>
            <select v-model="userForm.status" class="w-full px-3 py-2 border rounded">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showUserForm = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Shop Form Modal -->
    <div v-if="showShopForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">{{ editingShop ? 'Edit Shop' : 'Add Shop' }}</h3>
        <form @submit.prevent="saveShop">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Name</label>
            <input v-model="shopForm.name" type="text" class="w-full px-3 py-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Description</label>
            <textarea v-model="shopForm.description" class="w-full px-3 py-2 border rounded"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Address</label>
            <input v-model="shopForm.address" type="text" class="w-full px-3 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Phone</label>
            <input v-model="shopForm.phoneNumber" type="text" class="w-full px-3 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Email</label>
            <input v-model="shopForm.email" type="email" class="w-full px-3 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Status</label>
            <select v-model="shopForm.status" class="w-full px-3 py-2 border rounded">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showShopForm = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useUsersStore } from '~/stores/users';
import { useShopsStore } from '~/stores/shops';

definePageMeta({
  middleware: 'auth',
});

const authStore = useAuthStore();
const usersStore = useUsersStore();
const shopsStore = useShopsStore();

const activeTab = ref('users');
const showUserForm = ref(false);
const showShopForm = ref(false);
const editingUser = ref(null);
const editingShop = ref(null);

const userForm = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  role: 'staff',
  status: 'active',
});

const shopForm = ref({
  name: '',
  description: '',
  address: '',
  phoneNumber: '',
  email: '',
  status: 'active',
});

onMounted(async () => {
  await usersStore.fetchUsers();
  await shopsStore.fetchShops();
});

const getRoleBadgeClass = (role: string) => {
  const classes = {
    super_admin: 'bg-purple-200 text-purple-800',
    shop_owner: 'bg-blue-200 text-blue-800',
    manager: 'bg-green-200 text-green-800',
    staff: 'bg-gray-200 text-gray-800',
  };
  return classes[role] || 'bg-gray-200 text-gray-800';
};

const getStatusBadgeClass = (status: string) => {
  const classes = {
    active: 'bg-green-200 text-green-800',
    inactive: 'bg-gray-200 text-gray-800',
    suspended: 'bg-red-200 text-red-800',
  };
  return classes[status] || 'bg-gray-200 text-gray-800';
};

const editUser = (user: any) => {
  editingUser.value = user;
  userForm.value = {
    email: user.email,
    password: '',
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber || '',
    role: user.role,
    status: user.status,
  };
  showUserForm.value = true;
};

const saveUser = async () => {
  try {
    if (editingUser.value) {
      await usersStore.updateUser(editingUser.value.id, userForm.value);
    } else {
      await usersStore.createUser(userForm.value);
    }
    showUserForm.value = false;
    userForm.value = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      role: 'staff',
      status: 'active',
    };
  } catch (error) {
    alert('Failed to save user');
  }
};

const deleteUser = async (id: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await usersStore.deleteUser(id);
    } catch (error) {
      alert('Failed to delete user');
    }
  }
};

const editShop = (shop: any) => {
  editingShop.value = shop;
  shopForm.value = {
    name: shop.name,
    description: shop.description || '',
    address: shop.address || '',
    phoneNumber: shop.phoneNumber || '',
    email: shop.email || '',
    status: shop.status,
  };
  showShopForm.value = true;
};

const saveShop = async () => {
  try {
    if (editingShop.value) {
      await shopsStore.updateShop(editingShop.value.id, shopForm.value);
    } else {
      await shopsStore.createShop(shopForm.value);
    }
    showShopForm.value = false;
    shopForm.value = {
      name: '',
      description: '',
      address: '',
      phoneNumber: '',
      email: '',
      status: 'active',
    };
  } catch (error) {
    alert('Failed to save shop');
  }
};

const deleteShop = async (id: string) => {
  if (confirm('Are you sure you want to delete this shop?')) {
    try {
      await shopsStore.deleteShop(id);
    } catch (error) {
      alert('Failed to delete shop');
    }
  }
};
</script>
