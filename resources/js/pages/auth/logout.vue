<script setup lang="ts">
import api from '@/api';
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

api.post('/auth/logout')
    .then(() => {
        authStore.loggedIn = false;
        router.push('/auth/login');
    });
</script>

<template>

</template>
