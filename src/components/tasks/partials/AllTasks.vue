<template>
  <div class="allTasks">
    <div class="task-column" v-for="(tasksInGroup, boardType, index) in groupedTasks" :key="boardType">
      <h3 class="column-title">{{ boardType }}</h3>

      <Singletask
          v-for="task in tasksInGroup"
          :key="task.id"
          :task="task"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { BoardType } from "@/Types/Boards/BoardType";
import { TaskTypes } from "@/Types/TaskTypes";
import Singletask from "@/components/tasks/partials/Singletask.vue";

defineProps<{
  groupedTasks: Record<BoardType, TaskTypes[]>;
}>();
</script>