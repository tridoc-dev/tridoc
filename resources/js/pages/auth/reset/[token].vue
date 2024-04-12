<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import { ref } from "vue";
import InputError from "@/components/InputError.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import InputLabel from "@/components/InputLabel.vue";
import TextInput from "@/components/TextInput.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import api from "@/api";
import {useAuthStore} from "@/stores/auth";

const route = useRoute();

const form = ref({
    token: route.params.token,
    email: route.query.email,
    password: '',
    password_confirmation: '',
});

const router = useRouter();
const authStore = useAuthStore();

const processing = ref(false);
const errorMsg = ref(undefined);

const submit = () => {
    processing.value = true;

    api.post('/auth/reset', form.value)
        .then(response => {
            router.push('/auth/login');
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
            <div class="mb-4 text-sm text-gray-600">
                Reset your password.
            </div>

            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                    disabled="true"
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
                <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
