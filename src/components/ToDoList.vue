<template>
  <div>
    <h1>Hello world</h1>

    <Form @submit="addTask">
      <Field
          name="title"
          v-model="title"
          type="text"
          placeholder="Unesite naslov zadatka"
          rules="required|min:3|StartedWithCapital|minWords:5"
      ></Field>
      <ErrorMessage name="title"></ErrorMessage>

      <Field
          name="description"
          v-model="description"
          type="text"
          placeholder="Unesite text zadatka"
          rules="required|min:10|max:20"
      ></Field>
      <ErrorMessage name="description"></ErrorMessage>

      <Field
          name="dueDate"
          v-model="dueDate"
          type="date"
          rules="required"
      ></Field>
      <ErrorMessage name="dueDate"></ErrorMessage>

      <Field
          name="priority"
          as="select"
          v-model="priority"
          rules="required"
      >
        <option value="Hitan">Hitan</option>
        <option value="Vazan">Vazan</option>
        <option value="Nije toliko vazan">Nije toliko vazan</option>
        <option value="Nebitan">Nebitan</option>
      </Field>
      <ErrorMessage name="priority"></ErrorMessage>

      <button type="submit">Snimi zadatak</button>
    </Form>

    <div>
      <div v-for="(task, index) in tasks" :key="index">
        <p>{{ task.title }}</p>
        <p>{{ task.description }}</p>
        <p>Rok: {{ task.dueDate }}</p>
        <p>Priority: {{ task.priority }}</p>
        <button @click="deleteTask(index)">Delete task</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { TaskTypes } from "@/Types/TaskTypes";

export default defineComponent({
  name: "TodoList",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      title: "",
      description: "",
      dueDate: "",
      priority: null as TaskTypes["priority"] | null,
      tasks: [] as TaskTypes[],
    };
  },
  methods: {
    resetFields(): void {
      this.title = "";
      this.description = "";
      this.dueDate = "";
      this.priority = null;
    },

    addTask(): void {
      const taskExists = this.tasks.some(
          (task) => task.title === this.title.trim()
      );

      if (taskExists) {
        alert("Mislim da ovaj zadatak postoji ");
        return;
      }

      if (this.priority) {
        this.tasks.push({
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          priority: this.priority,
        });
      }

      this.resetFields();
    },

    deleteTask(index: number): void {
      this.tasks.splice(index, 1);
    },
  },
});
</script>