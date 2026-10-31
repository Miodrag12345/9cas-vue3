<template>
  <div class="allTasks">
    <div class="task-column" v-for="(tasksInGroup, boardType) in groupedTasks" :key="boardType">
      <h3 class="column-title">{{ boardType }}</h3>

      <Singletask
          v-for="task in tasksInGroup"
          :key="task.id"
          :task="task"
          @deleteTask="$emit('delete-task', $event)"
          @show-popup="openPopup"
      />
    </div>
  </div>

  <PopUptask v-if="showPopup"></PopUptask>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'; // Dodan 'ref' ovde
import type { BoardType } from "@/Types/Boards/BoardType";
import type { TaskTypes } from "@/Types/TaskTypes";
import Singletask from "@/components/tasks/partials/Singletask.vue";
import PopUptask from "@/components/tasks/partials/popUptask.vue";

const showPopup = ref(false);

function openPopup() {
  showPopup.value = true;
}

defineProps<{
  groupedTasks: Record<BoardType, TaskTypes[]>;
}>();

const emit = defineEmits<{
  (e: 'delete-task', id: string): void
}>();
</script>

<style scoped>
.column-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.allTasks {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
  background: #f4f5f7;
}

.task-column {
  flex-shrink: 0;
  width: 300px;
  background-color: #ebecf0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>