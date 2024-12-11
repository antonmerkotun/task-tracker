import { reactive } from 'vue';
import { type Task } from '@/store/task';

const state = reactive<{ isShowForm: boolean; task: Task | null }>({
  isShowForm: false,
  task: null,
});

export const useForm = () => {
  function openForm(task: Task) {
    state.task = task;
    state.isShowForm = true;
  }

  function closeForm() {
    state.isShowForm = false;
    state.task = null;
  }

  return {
    state,

    openForm,
    closeForm,
  };
};
