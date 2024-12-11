<template>
  <div class="actions">
    <i-button @click="submitForm" :disabled="!isDataChanged">
      Update Card
    </i-button>
    <i-button @click="closeForm" type="secondary">Cancel</i-button>
    <i-button
      @click="openCheckRemoveCard"
      type="danger"
      :disabled="isRemoveTask"
    >
      Delete Card
    </i-button>
  </div>

  <div v-if="isRemoveTask" class="remove-warning">
    <span>Are you sure you want to delete this card?</span>
    <div class="remove-actions">
      <i-button type="danger" @click="deleteTask">Yes</i-button>
      <i-button type="secondary" @click="closeCheckRemoveCard">No</i-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IButton from '@/components/ui/IButton.vue';
import { useForm } from '@/composables/useForm';

interface Props {
  task: Record<string, any>;
  isDataChanged: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:card', 'click:removeCard']);

const { closeForm } = useForm();

const isRemoveTask = ref(false);

function submitForm() {
  emit('update:card');
}

function deleteTask() {
  emit('click:removeCard', props.task.id);
  closeCheckRemoveCard();
}

function openCheckRemoveCard() {
  isRemoveTask.value = true;
}

function closeCheckRemoveCard() {
  isRemoveTask.value = false;
}
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
}

.remove-warning {
  background-color: #f8d7da;
  padding: 15px;
  border-radius: 6px;
  color: #721c24;
  margin-top: 20px;
}

.remove-actions {
  display: flex;
  gap: 10px;
}
</style>
