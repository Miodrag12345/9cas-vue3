<script setup lang="ts">
import { ref } from 'vue';
import type { BoardType } from "@/Types/Boards/BoardType";
import type { TaskTypes } from "@/Types/TaskTypes";
import Singletask from "@/components/tasks/partials/Singletask.vue";
import PopUptask from "@/components/tasks/partials/popUptask.vue";

const showPopup = ref(false);
const selectedTask = ref<TaskTypes | null>(null);

function openPopup(task: TaskTypes) {
  showPopup.value = true;
  selectedTask.value = task;
}

defineProps<{
  groupedTasks: Record<BoardType, TaskTypes[]>;
}>();

const emit = defineEmits<{
  (e: 'delete-task', id: string): void
}>();

function closePopup() {
  showPopup.value = false;
  selectedTask.value = null;
}
</script>

<template>
  <div class="mainDiv">
    <div class="header">
      <button class="create-btn">Create task</button>
    </div>

    <div class="allTasks">
      <div class="task-column" v-for="(tasksInGroup, index) in groupedTasks" :key="index">
        <h3 class="column-title">{{ index }}</h3>
        <Singletask
            v-for="task in tasksInGroup"
            :key="task.id"
            :task="task"
            @delete-task="emit('delete-task', $event)"
            @show-popup="openPopup"
        ></Singletask>
      </div>
    </div>
  </div>

  <PopUptask
      v-if="showPopup"
      @close="closePopup"
      :task="selectedTask"
  ></PopUptask>
</template>

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