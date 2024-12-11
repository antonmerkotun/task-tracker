<template>
  <div v-if="state.isShowForm" class="card" @click.self="closeForm">
    <div class="content">
      <div class="panels">
        <div class="details">
          <card-details-header :task="localTask" @update:task="updateCard" />
          <card-details-description
            :task="localTask"
            @update:task="updateCard"
          />
        </div>
        <card-details-panel :task="localTask" @update:task="updateCard" />
      </div>
      <card-details-actions
        :task="localTask"
        :is-data-changed="isDataChanged"
        @update:card="submitCard"
        @click:remove-card="deleteCard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { useForm } from '@/composables/useForm';
import { Task, useTaskStore } from '@/store/task';
import CardDetailsHeader from './CardDetailsHeader.vue';
import CardDetailsDescription from './CardDetailsDescription.vue';
import CardDetailsPanel from './CardDetailsPanel.vue';
import CardDetailsActions from './CardDetailsActions.vue';

const { updateTask, removeTask } = useTaskStore();
const { state, closeForm } = useForm();

let localTask = reactive({ ...state.task });

const isDataChanged = computed(() => {
  return Object.keys(localTask).some(
    (key) => localTask[key] !== state.task[key],
  );
});

function updateCard(data: Task) {
  Object.assign(localTask, data);
}

function submitCard() {
  updateTask(localTask);
  closeForm();
}

function deleteCard() {
  removeTask(state.task.id);
  closeForm();
}

watch(
  () => state.task,
  (newTask) => {
    Object.assign(localTask, newTask);
  },
);
</script>

<style scoped lang="scss">
.card {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.content {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  width: 70%;
}

.panels {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.details {
  width: 100%;
}
</style>
