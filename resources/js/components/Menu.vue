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
            <slot name="menubar" />
        </Menubar>
        <div class="place-self-center">
            <div class="h-10 flex items-center text-sm">
                <div class="pr-1">{{ authStore.user?.name }}</div>
                <ChevronRight class="w-4" />
                <div class="pl-1 font-bold">
                    <slot name="location" />
                </div>
            </div>
        </div>
        <div class="place-self-end mr-2">
            <div class="h-10 flex items-center text-sm">
                <RouterLink to="/auth/logout">Logout</RouterLink>
            </div>
        </div>
    </div>
</template>
