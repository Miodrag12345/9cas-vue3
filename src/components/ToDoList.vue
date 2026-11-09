<template>
  <CreateTask
      @add-task="addTask"
      @close-create-task="closeCreateTaskPopup"
      v-if="showCreatePopUp"
  ></CreateTask>

  <SortTask
      :prioritySort="prioritySort"
      @update:priority-sort="prioritySort = $event"
      @change-sort="changeSort"
  ></SortTask>

  <AllTasks
      :groupedTasks="groupedTasks"
      @delete-task="deleteTask"
      @show-create-popup="openCreatePopup"
  ></AllTasks>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TaskTypes } from "@/Types/TaskTypes";
import { getAllTasks, updateAllTasks } from "@/models/modeltasks";
import CreateTask from "./tasks/partials/CreateTask.vue";
import SortTask from "./tasks/partials/SortTask.vue";
import AllTasks from "@/components/tasks/partials/AllTasks.vue";
import { BoardType } from "@/Types/Boards/BoardType";


import { prepareTask, sortTasks } from "@/services/taskservice";

export default defineComponent({
  name: "TodoList",
  components: {
    AllTasks,
    CreateTask,
    SortTask,
  },
  data() {
    return {
      id: "",
      tasks: [] as TaskTypes[],
      prioritySort: "important",
      showCreatePopUp: false
    };
  },

  mounted() {
    this.tasks = getAllTasks() ?? [];
  },

  computed: {
    groupedTasks(): Record<BoardType, TaskTypes[]> {
      const groups: Record<BoardType, TaskTypes[]> = {
        todo: [],
        doing: [],
        done: [],
      };

      for (const task of this.tasks) {
        if (groups[task.board]) {
          groups[task.board].push(task);
        }
      }

      return groups;
    },
  },

  watch: {
    tasks: {
      handler(newTasks: TaskTypes[]) {
        updateAllTasks(newTasks);
      },
      deep: true,
    },
  },

  methods: {
    openCreatePopup() {
      this.showCreatePopUp = true;
    },

    closeCreateTaskPopup() {
      this.showCreatePopUp = false;
    },

    changeSort() {
      this.tasks = sortTasks(this.tasks, this.prioritySort);
    },

    addTask(newTask: any) {
      const taskExists = this.tasks.some(
          (task) => task.title.trim() === newTask.title.trim()
      );

      if (taskExists) {
        alert("Zadatak sa ovim imenom vec postoji");
        return;
      }


      const preparedTask = prepareTask(newTask, this.tasks);

      this.tasks.push(preparedTask);
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
});
</script>