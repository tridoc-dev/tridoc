<script setup lang="ts">
import Menu from "@/Components/Dashboard/Menu.vue";
import Sidebar from "@/Components/Sidebar.vue";
import MainPanel from "@/Components/Dashboard/MainPanel.vue";
import { ref } from "vue";
import { Settings, CircleHelp } from "lucide-vue-next";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

// const mode = useColorMode();
const openFilePanel = ref(false);
</script>

<template>
    <div class="w-dvh h-dvh grid grid-rows-[40px_1fr] grid-cols-[64px_1fr] bg-basebackground">
        <div></div>
        <Menu class="flex" />
        <Sidebar>
            <Avatar class="w-10 h-10 my-2">
                <AvatarImage
                    src="https://github.com/radix-vue.png"
                    alt="@radix-vue"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <Settings />
            </Button>
            <Button variant="ghost" class="w-[54px] h-[54px]">
                <CircleHelp />
            </Button>
        </Sidebar>
        <div class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-grow overflow-y-scroll">
            <MainPanel class="shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)] bg-background" />
        </div>
    </div>
</template>
