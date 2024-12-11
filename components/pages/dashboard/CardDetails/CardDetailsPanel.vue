<template>
  <div class="details">
    <TaskField
      label="Priority"
      :options="Object.values(Priority)"
      v-model="localTask.priority"
      @update:modelValue="emitUpdate"
    />
    <TaskField
      label="Assignee"
      :options="users"
      v-model="localTask.assignee"
      @update:modelValue="emitUpdate"
    />
    <TaskField
      label="Reporter"
      :options="users"
      v-model="localTask.reporter"
      @update:modelValue="emitUpdate"
    />
    <task-field
      label="Status"
      :options="Object.values(Status)"
      v-model="localTask.status"
      @update:modelValue="emitUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore, Status, Priority } from '@/store/task';
import TaskField from './TaskField.vue';

interface Props {
  task: Record<string, any>;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:task']);

const { users } = useTaskStore();
const localTask = ref({ ...props.task });

function emitUpdate() {
  emit('update:task', localTask.value);
}
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}
</style>
