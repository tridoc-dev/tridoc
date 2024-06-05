<script setup>
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import TridocLogo from "@/components/TridocLogo.vue";

const { loggedIn } = useAuthStore();

const router = useRouter();

if (loggedIn) {
  router.push("/dashboard");
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
  >
    <div class="rotate-90">
      <RouterLink to="/">
        <TridocLogo class="w-20 h-[200px] fill-current text-black" />
      </RouterLink>
    </div>

    <div
      class="w-full sm:max-w-md mt-0 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>
</template>
