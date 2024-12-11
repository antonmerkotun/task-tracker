<template>
  <div class="description">
    <div class="description-label">Description</div>
    <textarea
      v-model="task.description"
      @input="updateDescription"
      class="description-textarea"
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
  (event: 'update:task', description: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmits>();

const task = ref(props.task);

function updateDescription() {
  emit('update:task', task.value);
}
</script>

<style scoped lang="scss">
.description {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &-label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  &-textarea {
    width: 100%;
    height: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    resize: vertical;
    min-height: 120px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    transition:
      border-color 0.3s ease,
      background-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
      background-color: #fff;
    }

    &::placeholder {
      color: transparent;
    }
  }
}
</style>
