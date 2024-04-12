<script setup lang="ts">
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/Components/ui/menubar";
import { ChevronRight } from "lucide-vue-next";
</script>

<template>
    <div class="w-full h-fit grid grid-cols-3">
        <Menubar class="pl-0 border-none select-none bg-basebackground">
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
        </Menubar>
        <div class="place-self-center">
            <div class="h-10 flex items-center text-sm">
                <!-- see \App\Http\Middleware\HandleInertiaRequests::share() -->
                <div class="pr-1">{{ $page.props.auth.user.name }}</div>
                <ChevronRight class="w-4" />
                <div class="pl-1 font-bold">Dashboard</div>
            </div>
        </div>
        <div class="h-10 w-10"></div>
    </div>
</template>
