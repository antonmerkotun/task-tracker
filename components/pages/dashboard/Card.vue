<template>
  <div @click="openForm(task)" class="card" :class="priorityClass">
    <div class="card_header">
      <h3>{{ task.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Task } from '@/store/task';
import { useForm } from '@/composables/useForm';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const { openForm } = useForm();

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'Low':
      return 'card--low';
    case 'Medium':
      return 'card--medium';
    case 'High':
      return 'card--high';
    default:
      return '';
  }
});
</script>

<style scoped lang="scss">
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
  }

  &_header {
    h3 {
      max-width: 100%;
      margin: 0;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
  }

  &--low {
    border: 2px solid #28a745;
  }

  &--medium {
    border: 2px solid #ffc107;
  }

  &--high {
    border: 2px solid #dc3545;
  }
}
</style>
