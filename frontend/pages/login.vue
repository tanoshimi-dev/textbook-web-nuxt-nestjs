<template>
    <div
        style="
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f3f4f6;
        "
    >
        <div
            style="
                max-width: 400px;
                width: 100%;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                padding: 32px;
            "
        >
            <h2
                style="
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 24px;
                "
            >
                Shop Management Login
            </h2>

            <form @submit.prevent="handleLogin">
                <div style="margin-bottom: 16px">
                    <label
                        style="
                            display: block;
                            color: #374151;
                            font-size: 14px;
                            font-weight: bold;
                            margin-bottom: 8px;
                        "
                        for="email"
                    >
                        Email
                    </label>
                    <input
                        v-model="email"
                        type="email"
                        id="email"
                        style="
                            width: 100%;
                            padding: 8px 12px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                            font-size: 14px;
                        "
                        required
                    />
                </div>

                <div style="margin-bottom: 24px">
                    <label
                        style="
                            display: block;
                            color: #374151;
                            font-size: 14px;
                            font-weight: bold;
                            margin-bottom: 8px;
                        "
                        for="password"
                    >
                        Password
                    </label>
                    <input
                        v-model="password"
                        type="password"
                        id="password"
                        style="
                            width: 100%;
                            padding: 8px 12px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                            font-size: 14px;
                        "
                        required
                    />
                </div>

                <div
                    v-if="error"
                    style="margin-bottom: 16px; color: #dc2626; font-size: 14px"
                >
                    {{ error }}
                </div>

                <button
                    type="submit"
                    :disabled="loading"
                    style="
                        width: 100%;
                        background-color: #3b82f6;
                        color: white;
                        font-weight: bold;
                        padding: 10px 16px;
                        border-radius: 6px;
                        border: none;
                        cursor: pointer;
                    "
                    :style="
                        loading
                            ? 'background-color: #9ca3af; cursor: not-allowed;'
                            : ''
                    "
                >
                    {{ loading ? "Logging in..." : "Login" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
    layout: false,
});

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
    loading.value = true;
    error.value = "";

    try {
        const success = await authStore.login(email.value, password.value);
        if (success) {
            navigateTo("/");
        } else {
            error.value = "Invalid email or password";
        }
    } catch (err) {
        error.value = "Login failed. Please try again.";
    } finally {
        loading.value = false;
    }
};
</script>
