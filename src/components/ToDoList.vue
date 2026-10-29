<template>
  <CreateTask @add-task="addTask"></CreateTask>

  <SortTask
      :prioritySort="prioritySort"
      @update:priority-sort="prioritySort = $event"
      @change-sort="changeSort"
  ></SortTask>


  <AllTasks :groupedTasks="groupedTasks" @deleteTask="deleteTask"></AllTasks>
</template>

<style>
.allTasks {
  display: flex;
  overflow-x: auto;
}
.allTasks > div {
  width: 25%;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { TaskTypes } from "@/Types/TaskTypes";
import { generateRandomId, getAllTasks, saveTask, updateAllTasks } from "@/models/modeltasks";
import { PriorityOrder as priorityOrder } from "@/Types/PriorityOrder";
import { isIdUsed } from "@/helpers/idHelpers";
import { BoardType } from "@/Types/Boards/BoardType";
import CreateTask from "./tasks/partials/CreateTask.vue";
import SortTask from "./tasks/partials/SortTask.vue";
import AllTasks from "@/components/tasks/partials/AllTasks.vue";

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
    changeSort() {
      const direction = this.prioritySort === "important" ? 1 : -1;

      this.tasks.sort((a, b) => {
        const aPriority = priorityOrder[(a.priority ?? "nebitan") as keyof typeof priorityOrder] ?? 99;
        const bPriority = priorityOrder[(b.priority ?? "nebitan") as keyof typeof priorityOrder] ?? 99;


        return (aPriority - bPriority) * direction;
      });
    },

    addTask(newTask: any) {
      const taskExists = this.tasks.some(
          (task) => task.title.trim() === newTask.title.trim()
      );

      if (taskExists) {
        alert("Zadatak sa ovim imenom vec postoji");
        return;
      }

      let tempId = generateRandomId();
      if (isIdUsed(tempId, this.tasks)) {
        tempId = generateRandomId();
      }

      const newTaskToSave: TaskTypes = {
        id: tempId,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        board: newTask.board || "todo",
      };

      saveTask(newTaskToSave);
      this.tasks.push(newTaskToSave);
    },

    deleteTask(taskId: string): void {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
});
</script>