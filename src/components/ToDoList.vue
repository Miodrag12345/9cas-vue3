<template>

  <CreateTask></CreateTask>

  <Form class="sort-form">
    <h2>Sortiranje</h2>
    <Field @change="changeSort" name="prioritySort" as="select" v-model="prioritySort" class="form-input">
      <option value="important">Po bitnosti</option>
      <option value="notimportant">Po nebitnosti</option>
    </Field>
  </Form>

  <div class="allTasks">
    <div class="task-column" v-for="(tasksInGroup, index) in groupedTasks" :key="index">
      <h3 class="column-title">{{ index }}</h3>
      <div class="task-card" v-for="(task, id) in tasksInGroup" :key="id">
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
 .allTasks{
   display:flex;
   overflow-x: auto;

 }
  .allTasks .div {
    width: 25%
  }

</style>

<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { TaskTypes } from "@/Types/TaskTypes";
import {generateRandomId, getAllTasks, saveTask, updateAllTasks} from "@/models/modeltasks";
import { PriorityOrder } from "@/Types/PriorityOrder";
import {isIdUsed} from "@/helpers/idHelpers";
import FormTaskType from "@/Types/FormTaskType";
import { BoardType } from "@/Types/Boards/BoardType";


export default defineComponent({
  name: "TodoList",
  components: {
    Form,
    Field

  },
  data():FormTaskType {
    return {
      id:'',
      title:'',
      description: '',
      dueDate: '',
      priority: null as TaskTypes["priority"] | null,
      tasks: [] as TaskTypes[],
      prioritySort:'',
      board:'todo'
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
        done: []
      };

     for(const task of this.tasks){
       groups[task.board].push(task);
     }

      return groups;
    }
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
    resetFields(): void {
      this.title = "";
      this.description = "";
      this.dueDate = "";
      this.priority = null;
    },

    changeSort() {

      const direction = this.prioritySort === "important" ? 1 : -1;

      this.tasks.sort((a, b) => {
        const aPriority = PriorityOrder[a.priority ?? "nebitan"] ?? 99;
        const bPriority = PriorityOrder[b.priority ?? "nebitan"] ?? 99;

        return (aPriority - bPriority) * direction;
      });
    },

    addTask(): void {
      const taskExists = this.tasks.some(
          (task) => task.title === this.title.trim()
      );

      if (taskExists) {
        alert("Mislim da ovaj zadatak postoji");
        return;
      }

      let tempId=generateRandomId();

      if(isIdUsed(tempId, this.tasks)){
        tempId=generateRandomId();
      }

      const task: TaskTypes = {
        id:generateRandomId(),
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        board:this.board
      };

      saveTask(task);
      this.tasks.push(task);

      this.resetFields();
    },

    deleteTask(index: number): void {
      this.tasks.splice(index, 1);
    },
  },
});
</script>