<template>
  <div class="forms-container">
    <Form @submit="handleSubmit" class="task-form">
      <Field
          name="title"
          v-model="title"
          type="text"
          placeholder="Unesite naslov zadatka"
          rules="required|min:3|StartedWithCapital|minWords:5"
      />
      <ErrorMessage name="title" />

      <Field
          name="description"
          v-model="description"
          type="text"
          placeholder="Unesite text zadatka"
          rules="required|min:10|max:20"
      />
      <ErrorMessage name="description" />

      <Field
          name="dueDate"
          v-model="dueDate"
          type="date"
          rules="required"
      />
      <ErrorMessage name="dueDate" />

      <Field
          name="priority"
          as="select"
          v-model="priority"
          rules="required"
      >
        <option value="hitan">Hitan</option>
        <option value="vazan">Vazan</option>
        <option value="normalan">Normalan</option>
        <option value="nebitan">Nebitan</option>
      </Field>
      <ErrorMessage name="priority" />

      <Field
          name="board"
          as="select"
          v-model="board"
      >
        <option value="todo">ToDo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </Field>

      <button class="submit-btn" type="submit">Snimi zadatak</button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

const emit = defineEmits<{
  (e: 'add-task', task: {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    board: string;
  }): void;
}>();

const title = ref('');
const description = ref('');
const dueDate = ref('');
const priority = ref('');
const board = ref('');

function handleSubmit() {
  emit('add-task', {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    priority: priority.value,
    board: board.value
  });

  title.value = '';
  description.value = '';
  dueDate.value = '';
  priority.value = '';
  board.value = '';
}
</script>