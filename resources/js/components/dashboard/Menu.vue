<script setup lang="ts">
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronRight } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
    <div class="w-full h-fit grid grid-cols-3">
        <Menubar class="pl-0 border-none select-none bg-basebackground">

        </Menubar>
        <div class="place-self-center">
            <div class="h-10 flex items-center text-sm">
                <!-- see \App\Http\Middleware\HandleInertiaRequests::share() -->
                <div class="pr-1">{{ authStore.user?.name }}</div>
                <ChevronRight class="w-4" />
                <div class="pl-1 font-bold">Dashboard</div>
            </div>
        </div>
        <div class="h-10 w-10"></div>
    </div>
</template>
