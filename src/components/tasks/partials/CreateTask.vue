<template>
  <div class="forms-container">
    <div class="createTaskPopUp">
      <div class="innerTaskPopUp">
        <Form @submit="handleSubmit" class="task-form">
          <h2>Create a new task</h2>

          <div class="form-group">
            <Field
                name="title"
                v-model="title"
                type="text"
                placeholder="Unesite naslov zadatka"
                rules="required|min:3"
                class="form-input"
            />
            <ErrorMessage name="title" class="error-message" />
          </div>

          <div class="form-group">
            <Field
                name="description"
                v-model="description"
                type="text"
                placeholder="Unesite text zadatka"
                rules="required|min:10|max:250"
                class="form-input"
            />
            <ErrorMessage name="description" class="error-message" />
          </div>

          <div class="form-group">
            <Field
                name="dueDate"
                v-model="dueDate"
                type="date"
                class="form-input"
            />
            <ErrorMessage name="dueDate" class="error-message" />
          </div>

          <button class="submit-btn">Save</button>
          <button type="button" class="submit-btn">Close</button>
        </Form>
      </div>
    </div>
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
  (e:'close-create-task'):void;
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

function closePopUp (){
  emit('close-create-task');
}

</script>

<style >

.createTaskPopUp{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.innerTaskPopUp {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.task-form
 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-input:focus {
  border-color: #409eff;
}

.submit-btn {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
}

.submit-btn:hover {
  background-color: #4cae4c;
}

.error-message {
  font-size: 0.875rem;
  color: #e74c3c;
  margin-top: 0.2rem;
}


</style>