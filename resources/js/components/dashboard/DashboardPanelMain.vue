<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ProjectListAction from "./DashboardProjectListAction.vue";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { h, ref, withModifiers } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Badge from "../ui/badge/Badge.vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { valueUpdater } from "@/lib/utils";

export interface Project {
  id: string;
  title: string;
  owner: string;
  created: string;
  lastModified: string;
  tag: { name: string; color: string }[];
}

const tags: { name: string; color: string }[] = [
  {
    name: "Document",
    color:
      "bg-blue-200 text-blue-800 border-blue-800 hover:bg-blue-400 hover:text-secondary",
  },
  {
    name: "Report",
    color:
      "bg-purple-200 text-purple-800 border-purple-800 hover:bg-purple-400 hover:text-secondary",
  },
];

const data: Project[] = [
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [],
  },
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [],
  },
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [
      { name: "Document", color: "bg-blue-200 text-blue-800 border-blue-800" },
      {
        name: "Report",
        color: "bg-purple-200 text-purple-800 border-purple-800",
      },
    ],
  },
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [],
  },
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [],
  },
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [],
  },
  {
    id: "1",
    title: "Marketing Report",
    owner: "You",
    created: "2024/1/1",
    lastModified: "2024/3/5",
    tag: [],
  },
];

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => h("div", row.getValue("title")),
  },
  {
    accessorKey: "tag",
    header: "",
    cell: ({ row }) =>
      h(
        "div",
        (
          row.getValue("tag") as Array<{
            name: string;
            color: string;
          }>
        ).map((value) => {
          return h(
            Badge,
            {
              class: "mx-1 my-1 " + value.color,
              variant: "customize",
            },
            value.name
          );
        })
      ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => h("div", row.getValue("owner")),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => h("div", row.getValue("created")),
  },
  {
    accessorKey: "lastModified",
    header: "Last Modified",
    cell: ({ row }) => h("div", row.getValue("lastModified")),
  },
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      const project = row.original;

      return h(ProjectListAction, { project });
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});
</script>

<template>
  <div class="flex flex-grow flex-col rounded-md border overflow-y-auto">
    <div class="flex flex-col p-10">
      <div class="flex flex-col items-start mb-6">
        <div class="text-2xl font-bold">Dashboard</div>
        <div class="text-md">Welcome, {{ authStore.user?.name }}</div>
        <RouterLink to="/editor">
          <Button variant="outline">Go to Editor</Button>
        </RouterLink>
      </div>
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Create Project</div>
      </div>
      <div class="flex flex-row items-center pt-4 space-x-4">
        <Button
          variant="outline"
          :class="'h-16 flex bg-blue-200 text-blue-800 border-blue-800 hover:bg-blue-400 hover:text-secondary hover:border-blue-500'"
        >
          <Icon icon="radix-icons:plus" class="w-4 h-4 mr-3 flex-shrink-0" />
          <div class="flex flex-col items-start">
            <div>Empty Project</div>
            <div class="text-xs">Start from scratch</div>
          </div>
        </Button>
        <Button variant="outline" :class="'h-16 flex'">
          <Icon icon="bi:github" class="w-4 h-4 mr-3 flex-shrink-0" />
          <div class="flex flex-col items-start">
            <div>Import from GitHub</div>
            <div class="text-xs text-border">Clone from repository</div>
          </div>
        </Button>
      </div>
    </div>
    <div class="flex flex-col p-10 pt-0">
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Recently</div>
      </div>
      <div class="flex flex-col h-full">
        <div class="flex gap-2 items-center py-4 pt-4">
          <Input
            class="max-w-sm"
            placeholder="Search Projects"
            :model-value="table.getColumn('title')?.getFilterValue() as string"
            @update:model-value="
              table.getColumn('title')?.setFilterValue($event)
            "
          />
        </div>
        <div class="flex flex-row space-x-2 mb-2">
          <div v-for="tag in tags">
            <Badge :class="tag.color"> {{ tag.name }}</Badge>
          </div>
        </div>
        <div class="rounded-md">
          <Table>
            <TableHeader>
              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :class="'font-bold pl-3'"
                >
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="table.getRowModel().rows?.length">
                <TableRow
                  v-for="row in table.getRowModel().rows"
                  :key="row.id"
                  :data-state="row.getIsSelected() && 'selected'"
                >
                  <TableCell
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </TableCell>
                </TableRow>
              </template>

              <TableRow v-else>
                <TableCell col-span="{columns.length}" class="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
