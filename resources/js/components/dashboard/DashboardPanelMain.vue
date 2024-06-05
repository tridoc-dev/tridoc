<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ProjectListAction from "./DashboardProjectListAction.vue";

import { useAuthStore } from "@/stores/auth";
import api from "@/api";
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Badge from "../ui/badge/Badge.vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Project } from "@/types";

const authStore = useAuthStore();

const tags: { name: string; color: string }[] = [
  //   {
  //     name: "Document",
  //     color:
  //       "bg-blue-200 text-blue-800 border-blue-800 hover:bg-blue-400 hover:text-secondary",
  //   },
  //   {
  //     name: "Report",
  //     color:
  //       "bg-purple-200 text-purple-800 border-purple-800 hover:bg-purple-400 hover:text-secondary",
  //   },
];

const projects = ref<Project[]>([]);

const parseDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const fetchProjects = () => {
  api.get("/projects").then((response) => {
    projects.value = response.data.data;
  });
};

const createProjectName = ref("New Project");

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div class="flex flex-grow flex-col rounded-md border overflow-y-auto">
    <div class="flex flex-col p-10">
      <div class="flex flex-col items-start mb-6">
        <div class="text-2xl font-bold">Dashboard</div>
        <div class="text-md">Welcome, {{ authStore.user?.name }}</div>
      </div>
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Create Project</div>
      </div>
      <div class="flex flex-row items-center pt-4 space-x-4">
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button
              variant="outline"
              :class="'h-16 flex bg-blue-200 text-blue-800 border-blue-800 hover:bg-blue-400 hover:text-secondary hover:border-blue-500'"
            >
              <Icon
                icon="radix-icons:plus"
                class="w-4 h-4 mr-3 flex-shrink-0"
              />
              <div class="flex flex-col items-start">
                <div>Empty Project</div>
                <div class="text-xs">Start from scratch</div>
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Empty Project</AlertDialogTitle>
              <AlertDialogDescription>
                This action will create a new project.
              </AlertDialogDescription>
              <div class="mt-2">
                <Label for="name">Project Name</Label>
                <Input id="name" v-model="createProjectName"></Input>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                v-on:click="
                  (e) => {
                    api
                      .post('/projects', { name: createProjectName })
                      .then((response) => {
                        console.log(response.data);
                        fetchProjects();
                      });
                  }
                "
                >Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <!-- <Button variant="outline" :class="'h-16 flex'">
          <Icon icon="bi:github" class="w-4 h-4 mr-3 flex-shrink-0" />
          <div class="flex flex-col items-start">
            <div>Import from GitHub</div>
            <div class="text-xs text-border">Clone from repository</div>
          </div>
        </Button> -->
      </div>
    </div>
    <div class="flex flex-col p-10 pt-0">
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Recently</div>
      </div>
      <div class="flex flex-col h-full">
        <!-- <div class="flex gap-2 items-center py-4 pt-4">
          <Input class="max-w-sm" placeholder="Search Projects" />
        </div> -->
        <div class="flex flex-row space-x-2 mb-2">
          <div v-for="tag in tags">
            <Badge :class="tag.color"> {{ tag.name }}</Badge>
          </div>
        </div>
        <div class="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="font-bold pl-3">
                  <span class="text-sm">Title</span>
                </TableHead>
                <TableHead class="font-bold pl-3">
                  <span class="text-sm">Owner</span>
                </TableHead>
                <TableHead class="font-bold pl-3">
                  <span class="text-sm">Last Modified</span>
                </TableHead>
                <TableHead class="font-bold pl-3">
                  <span class="text-sm">Created At</span>
                </TableHead>
                <TableHead class="font-bold pl-3">
                  <span class="text-sm">Action</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="true">
                <TableRow v-for="row in projects" :key="row.id">
                  <TableCell>
                    {{ row.name }}
                  </TableCell>
                  <TableCell>
                    {{ row.user.name }}
                  </TableCell>
                  <TableCell>
                    {{ parseDate(row.updated_at) }}
                  </TableCell>
                  <TableCell>
                    {{ parseDate(row.created_at) }}
                  </TableCell>
                  <TableCell>
                    <ProjectListAction :project="row" />
                  </TableCell>
                </TableRow>
              </template>

              <TableRow v-else>
                <TableCell class="h-24 text-center"> No results. </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
