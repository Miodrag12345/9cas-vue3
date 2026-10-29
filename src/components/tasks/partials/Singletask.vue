<template>
  <div class="task-card">
    <p class="task-title">{{ task.title }}</p>
    <p>{{ task.description }}</p>
    <p><strong>Deadline:</strong> {{ task.dueDate }}</p>
    <p><strong>Priority:</strong> {{ task.priority }}</p>
    <button class="delete-btn" @click="handleDelete">Delete task</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { TaskTypes } from "@/Types/TaskTypes";

const props = defineProps<{
  task: TaskTypes;
}>();

const emit = defineEmits<{
  (e: 'delete-task', id: string): void
}>();

function handleDelete() {
  emit('delete-task', props.task.id!);
}
</script>