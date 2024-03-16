<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";
import { Icon } from "@iconify/vue";

const toggleGroupItemClasses =
    "hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[35px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";

const zoomRatioClasses =
    "hover:bg-secondary text-primary data-[state=on]:bg-secondary data-[state=on]:text-primary flex h-[35px] w-[60px] items-center justify-center bg-card text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:outline-none border";
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <div class="flex flex-row">
            <div class="w-2"></div>
            <div class="w-fit">
                <ToggleGroupRoot class="flex">
                    <ToggleGroupItem
                        value="left"
                        :class="toggleGroupItemClasses"
                    >
                        <Icon icon="lucide:minus" class="w-[15px] h-[15px]" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="left"
                        :class="zoomRatioClasses"
                    >
                        <div class="text-sm">100%</div>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="center"
                        :class="toggleGroupItemClasses"
                    >
                        <Icon icon="lucide:plus" class="w-[15px] h-[15px]" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
            <div class="flex flex-grow"></div>
            <div class="w-fit">
                <ToggleGroupRoot class="flex">
                    <ToggleGroupItem
                        value="left"
                        :class="toggleGroupItemClasses"
                    >
                        <Icon icon="lucide:download" class="w-[15px] h-[15px]" />
                    </ToggleGroupItem>
                </ToggleGroupRoot>
            </div>
        </div>
        <div class="h-3"></div>
        <div class="flex flex-grow w-full">
            <div class="w-full h-full bg-gray-700 rounded-md border flex items-center justify-center">
                THIS IS FOR PREVIEW
            </div>
        </div>
    </div>
</template>
