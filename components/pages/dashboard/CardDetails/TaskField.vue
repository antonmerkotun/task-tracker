<template>
  <div class="task-field">
    <label :for="label">{{ label }}</label>
    <select :id="label" v-model="internalValue">
      <option v-for="option in computedOptions" :key="option" :value="option">
        {{ option.name || option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { User } from '@/store/task';

interface Props {
  label: string;
  options: (string | number)[] | User[];
  modelValue: string | number | User;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const internalValue = ref(props.modelValue);

const computedOptions = computed(() => props.options);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.task-field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 4px;
}

select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  background-color: #fff;
  outline: none;
}

select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

option {
  padding: 10px;
}
</style>
