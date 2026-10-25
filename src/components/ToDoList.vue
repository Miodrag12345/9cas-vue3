<template>
  <CreateTask @add-task="addTask"></CreateTask>

  <Form class="sort-form">
    <h2>Sortiranje</h2>
    <Field @change="changeSort" name="prioritySort" as="select" v-model="prioritySort" class="form-input">
      <option value="important">Po bitnosti</option>
      <option value="notimportant">Po nebitnosti</option>
    </Field>
  </Form>

  <div class="allTasks">
    <div class="task-column" v-for="(tasksInGroup, index) in groupedTypes" :key="index">
      <h3 class="column-title">{{ index }}</h3>
      <div class="task-card" v-for="(task, id) in tasksInGroup" :key="task.id || id">
        <p class="task-title">{{ task.title }}</p>
        <p>{{ task.description }}</p>
        <p><strong>Deadline:</strong> {{ task.dueDate }}</p>
        <p><strong>Priority:</strong> {{ task.priority }}</p>
        <button class="delete-btn" @click="deleteTask(id)">Delete task</button>
      </div>
    </div>
  </div>
</template>

<style>
.allTasks {
  display: flex;
  overflow-x: auto;
}
.allTasks .div {
  width: 25%;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { TaskTypes } from "@/Types/TaskTypes";
import { generateRandomId, getAllTasks, saveTask, updateAllTasks } from "@/models/modeltasks";
import { PriorityOrder } from "@/Types/PriorityOrder";
import { isIdUsed } from "@/helpers/idHelpers";
import FormTaskType from "@/Types/FormTaskType";
import { BoardType } from "@/Types/Boards/BoardType";
import CreateTask from "./tasks/partials/CreateTask.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    Form,
    Field,
    CreateTask,
  },
  data() {
    return {
      id: "",
      tasks: [] as TaskTypes[],
      prioritySort: "",
    };
  },

  beforeMount() {
    this.tasks = getAllTasks() ?? [];
  },

  computed: {
    groupedTypes(): Record<BoardType, TaskTypes[]> {
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
      handler(task: TaskTypes[]) {
        updateAllTasks(task);
      },
      deep: true,
    },
  },

  methods: {
    changeSort() {
      const direction = this.prioritySort === "important" ? 1 : -1;

      this.tasks.sort((a, b) => {
        const aPriority = PriorityOrder[a.priority ?? "nebitan"] ?? 99;
        const bPriority = PriorityOrder[b.priority ?? "nebitan"] ?? 99;

        return (aPriority - bPriority) * direction;
      });
    },

    addTask(formInput: any) {
      const taskExists = this.tasks.some(
          (task) => task.title === formInput.title.trim()
      );

      if (taskExists) {
        alert("Mislim da ovaj zadatak postoji");
        return;
      }

      let tempId = generateRandomId();
      if (isIdUsed(tempId, this.tasks)) {
        tempId = generateRandomId();
      }

      const newTaskToSave: TaskTypes = {
        id: tempId,
        title: formInput.title,
        description: formInput.description,
        dueDate: formInput.dueDate,
        priority: formInput.priority,
        board: formInput.board || "todo",
      };

      saveTask(newTaskToSave);
      this.tasks.push(newTaskToSave);
    },

    deleteTask(index: number): void {
      this.tasks.splice(index, 1);
    },
  },
});
</script>