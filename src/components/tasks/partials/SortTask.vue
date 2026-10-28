<template>
  <Form class="sort-form">
    <h2>Sortiranje</h2>
    <Field name="prioritySort" as="select" v-model="prioritySort" class="form-input">
      <option value="important">Po bitnosti</option>
      <option value="notimportant">Po nebitnosti</option>
    </Field>
  </Form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Field, Form } from 'vee-validate';

const emit = defineEmits<{
  (e: 'update:prioritySort', value: string): void;
  (e: 'change-sort'): void;
}>();

const prioritySort = ref<'important' | 'notimportant'>('important');


watch(prioritySort, (value) => {
  emit('update:prioritySort', value);
  emit('change-sort');
});
</script>