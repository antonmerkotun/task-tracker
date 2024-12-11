<template>
  <button
    @click="handleClick"
    :disabled="disabled || isLoading"
    :class="buttonClass"
  >
    <template v-if="isLoading">
      <div class="loader" />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: MouseEvent) => void;
}

const props = defineProps<ButtonProps>();

const buttonClass = computed(() => {
  return [
    'btn',
    `btn-${props.type || 'primary'}`,
    { 'btn-disabled': props.disabled || props.isLoading },
  ];
});

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.isLoading && props.onClick) {
    props.onClick(event);
  }
}
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &-primary {
    background-color: #007bff;
    color: white;
  }

  &-secondary {
    background-color: #6c757d;
    color: white;
  }

  &-danger {
    background-color: #dc3545;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }

  &-disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
