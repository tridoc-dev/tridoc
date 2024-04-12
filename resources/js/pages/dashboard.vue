<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import MainPanel from "@/components/dashboard/MainPanel.vue";
import {onUnmounted, ref} from "vue";
import { Settings, CircleHelp } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";

import LaravelEcho from "@/lib/echo";
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";

LaravelEcho.instance.channel("heartbeat").listen(".heartbeat", (e: any) => {
    console.log(e);
});

const interval = setInterval(() => {
    LaravelEcho.pusher.send_event("ClientPing", {
        message: "I'm alive",
    });
}, 5000);

onUnmounted(() => {
    LaravelEcho.instance.leave("heartbeat");
    clearInterval(interval);
});
</script>

<template>
    <AuthenticatedLayout>
        <template #menu>
            <Menu class="flex">
                <template #menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Placeholder</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </template>

                <template #location>
                    Dashboard
                </template>
            </Menu>
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
