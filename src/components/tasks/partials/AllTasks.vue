<template>
  <div class="allTasks">
    <div class="task-column" v-for="(tasksInGroup, boardType) in groupedTasks" :key="boardType">
      <h3 class="column-title">{{ boardType }}</h3>

      <Singletask
          v-for="task in tasksInGroup"
          :key="task.id"
          :task="task"
          @deleteTask="$emit('delete-task', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import type { BoardType } from "@/Types/Boards/BoardType";
import type { TaskTypes } from "@/Types/TaskTypes";
import Singletask from "@/components/tasks/partials/Singletask.vue";

defineProps<{
  groupedTasks: Record<BoardType, TaskTypes[]>;
}>();

const emit = defineEmits<{
  (e: 'delete-task', id: string): void
}>();
</script>