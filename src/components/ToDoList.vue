<template>
  <CreateTask
      @add-task="taskStore.addTask"
      @close-create-task="closeCreateTaskPopup"
      v-if="showCreatePopUp"
  ></CreateTask>

  <SortTask
      :prioritySort="taskStore.prioritySort"
      @update:priority-sort="taskStore.prioritySort = $event"
      @change-sort="taskStore.changeSort"
  ></SortTask>

  <!-- Uklonili smo @delete-task jer se brisanje sada radi direktno iz komponente zadatka preko store-a -->
  <AllTasks
      :groupedTasks="taskStore.groupedTasks"
      @show-create-popup="openCreatePopup"
  ></AllTasks>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateTask from "./tasks/partials/CreateTask.vue";
import SortTask from "./tasks/partials/SortTask.vue";
import AllTasks from "@/components/tasks/partials/AllTasks.vue";
import { useTaskStore } from "@/store/useTaskStore";

export default defineComponent({
  name: "TodoList",
  components: {
    AllTasks,
    CreateTask,
    SortTask,
  },

  setup() {
    const taskStore = useTaskStore(); // OBAVEZNO malo 't'
    return {
      taskStore,
    };
  },

  data() {
    return {
      showCreatePopUp: false, // Ostaje samo lokalno stanje za prikaz modala
    };
  },

  methods: {
    openCreatePopup() {
      this.showCreatePopUp = true;
    },

    closeCreateTaskPopup() {
      this.showCreatePopUp = false;
    },
  },
});
</script>