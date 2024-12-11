import { defineStore } from 'pinia';
import { ref } from 'vue';

export type User = {
  name: string;
  lastName: string;
  email: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  assignee: User[] | null;
  reporter: User | null;
  status: Status;
  priority: Priority;
};

export enum Status {
  TODO = 'TODO',
  INPROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export const useTaskStore = defineStore(
  'task',
  () => {
    const tasks = ref<Task[]>([]);
    const users = ref<User[]>([
      { name: 'Unassigned', lastName: '', email: '' },
      { name: 'User 1', lastName: 'One', email: 'user1@example.com' },
      { name: 'User 2', lastName: 'Two', email: 'user2@example.com' },
      { name: 'User 3', lastName: 'Three', email: 'user3@example.com' },
    ]);

    function addTask(task: Task) {
      tasks.value.push(task);
    }

    function updateTask(updatedTask: Task) {
      const task = tasks.value.find((task) => task.id === updatedTask.id);
      if (task) Object.assign(task, updatedTask);
    }

    function removeTask(id: number) {
      tasks.value = tasks.value.filter((task: Task) => task.id !== id);
    }

    function moveTask(taskId: number, status: Status) {
      const task = tasks.value.find((task) => task.id == taskId);
      if (task) task.status = status;
    }

    return {
      tasks,
      users,
      addTask,
      updateTask,
      removeTask,
      moveTask,
    };
  },
  { persist: true },
);
