<script setup lang="ts">
import Menu from "@/Pages/Dashboard/Partials/Menu.vue";
import MainPanel from "@/Pages/Dashboard/Partials/MainPanel.vue";
import {ref} from "vue";
import {Settings, CircleHelp} from "lucide-vue-next";
import {Button} from "@/Components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {Head} from "@inertiajs/vue3";

// const mode = useColorMode();
const openFilePanel = ref(false);
</script>

<template>
    <Head title="Dashboard" />
    
    <AuthenticatedLayout>
        <template #menu>
            <Menu class="flex" />
        </template>

        <template #sidebar>
            <Avatar class="w-10 h-10 my-2">
                <AvatarImage
                    src="https://github.com/radix-vue.png"
                    alt="@radix-vue"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <Settings/>
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <CircleHelp/>
            </Button>
        </template>

        <template #main>
            <div class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-grow overflow-y-scroll">
                <MainPanel class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] bg-background"/>
            </div>
        </template>

    </AuthenticatedLayout>
</template>
