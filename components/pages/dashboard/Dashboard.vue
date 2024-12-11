<template>
  <div class="dashboard">
    <column v-for="status in statusValues" :key="status" :status="status" />
  </div>
</template>

<script setup lang="ts">
import { Status } from '@/store/task';
import Column from '@/components/pages/dashboard/Column.vue';

const statusValues = Object.values(Status);
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  gap: 16px;
  padding: 16px;
}
</style>
