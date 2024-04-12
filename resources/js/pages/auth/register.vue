<script setup>
import GuestLayout from '@/layouts/GuestLayout.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from "vue";
import api from "@/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const router = useRouter();
const authStore = useAuthStore();

const processing = ref(false);
const errorMsg = ref(null);

const submit = () => {
    processing.value = true;

    api.post('/auth/register', form.value)
        .then(response => {
            authStore.login(response.data.data);
            router.push('/dashboard');
        })
        .catch(error => {
            errorMsg.value = error.response.data.message;
        })
        .finally(() => {
            processing.value = false;
        })
};
</script>

<template>
    <GuestLayout>
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />
            </div>

            <div class="mt-4">
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="errorMsg" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <RouterLink
                    to="/auth/login"
                    class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </RouterLink>

                <PrimaryButton class="ms-4" :class="{ 'opacity-25': processing }" :disabled="processing">
                    Register
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
