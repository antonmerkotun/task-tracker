<template>
  <div class="header">
    <input
      v-model="task.title"
      placeholder="Title"
      class="title"
      @input="updateTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Task } from '@/store/task';

interface Props {
  task: Task;
}
interface IEmits {
  (event: 'update:task', title: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();
const task = ref(props.task);

function updateTitle() {
  emit('update:task', task.value);
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title {
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 32px;
  color: #333;
  padding: 8px 12px;
  outline: none;
  width: 100%;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #7a9aab;
    background-color: #f5f5f5;
  }
}
</style>
