// DataTableDropDown.vue
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Project } from "./MainPanel.vue";
defineProps<{
    project: Project;
}>();
</script>

<template>
    <div class="flex space-x-4">
        <Button variant="ghost">
            <Icon icon="lucide:play" class="w-4 h-4" />
        </Button>
        <Button variant="ghost">
            <Icon icon="lucide:tag" class="w-4 h-4" />
        </Button>
        <Button variant="ghost">
            <Icon icon="lucide:download" class="w-4 h-4" />
        </Button>
        <Button variant="ghost">
            <Icon icon="lucide:copy" class="w-4 h-4" />
        </Button>
        <Button variant="ghost">
            <Icon icon="lucide:trash-2" class="w-4 h-4" />
        </Button>
    </div>
</template>
