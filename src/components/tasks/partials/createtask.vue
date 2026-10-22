<template>
  <div class="forms-container">
    <Form @submit="addTask" class="task-form">
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

      <button type="submit">Snimi zadatak</button>
    </Form>



  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
</script>