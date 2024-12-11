<template>
  <div class="task-column">
    <h2 class="task-column__header">{{ status }}</h2>
    <draggable
      :list="filteredTasks"
      @end="onDrop"
      group="tasks"
      item-key="id"
      :id="status"
      class="draggable-list"
    >
      <template #item="{ element }">
        <card
          :task="element"
          :key="element.id"
          :id="element.id"
          class="task-item"
        />
      </template>
    </draggable>
    <div class="task-creation">
      <input
        v-model="newTaskTitle"
        type="text"
        class="task-input"
        placeholder="Add a card"
        required
        @keyup.enter="addCard"
      />
      <i-button :disabled="!newTaskTitle.trim()" @click="addCard">
        Create
      </i-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';

import { Priority, Status, Task, useTaskStore } from '@/store/task';
import Card from '@/components/pages/dashboard/Card.vue';
import IButton from '@/components/ui/IButton.vue';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  status: Status;
}

const props = defineProps<Props>();

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const newTaskTitle = ref('');

const filteredTasks = computed(() =>
  tasks.value.filter((task: Task) => task.status === props.status),
);

function onDrop(event: { item: { id: string }; to: { id: string } }) {
  const taskId = event.item.id;
  const newStatus = event.to.id;
  taskStore.moveTask(taskId, newStatus);
}

function addCard() {
  if (!newTaskTitle.value) return;

  taskStore.addTask({
    id: uuidv4(),
    title: newTaskTitle.value,
    description: '',
    assignee: { name: 'Unassigned', lastName: '', email: '' },
    reporter: { name: 'Unassigned', lastName: '', email: '' },
    status: props.status,
    priority: Priority.LOW,
  });

  newTaskTitle.value = '';
}
</script>

<style scoped lang="scss">
.task-column {
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 16px;
  height: fit-content;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 400px;

  &__header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    text-transform: uppercase;
    color: #333;
  }

  .draggable-list {
    height: 100%;
    width: 100%;
  }

  .task-item {
    margin-bottom: 16px;
  }

  .task-creation {
    display: flex;
    gap: 10px;

    .task-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
      }

      &::placeholder {
        color: #a0aec0;
      }
    }
  }
}
</style>
