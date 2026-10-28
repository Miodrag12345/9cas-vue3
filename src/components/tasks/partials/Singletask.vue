<template>
  <div class="task-card">
    <p class="task-title">{{ task.title }}</p>
    <p>{{ task.description }}</p>
    <p><strong>Deadline:</strong> {{ task.dueDate }}</p>
    <p><strong>Priority:</strong> {{ task.priority }}</p>
    <button class="delete-btn" @click="$emit('delete', task.id)">Delete task</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { TaskTypes } from "@/Types/TaskTypes";


defineProps<{
  task: TaskTypes;
}>();

defineEmits(['delete']);
</script>