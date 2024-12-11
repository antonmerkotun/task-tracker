<template>
  <div id="app">
    <div class="task-tracker">
      <h1>Task Tracker</h1>
      <div class="task-board">
        <dashboard />
      </div>
      <card-details />
    </div>
  </div>
</template>

<script setup lang="ts">
import Dashboard from '@/components/pages/dashboard/Dashboard.vue';
import CardDetails from '@/components/pages/dashboard/CardDetails/CardDetails.vue';
</script>

<style scoped lang="scss">
.task-tracker {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.task-board {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
