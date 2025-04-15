import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  initialized: false
};

export const initializeTasks = createAsyncThunk(
  'tasks/initialize',
  async () => {
    const response = await fetch('http://localhost:3001/tasks');
    if (!response.ok) throw new Error('Failed to fetch initial projects');
    return await response.json();
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      console.log("addTask", state.tasks);
      state.tasks.push(action.payload);
      console.log("addTask", state.tasks);
    },
    updateTaskStatus(state, action: PayloadAction<{id: string; status: Task['status']}>) {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
      builder
        .addCase(initializeTasks.pending, (state) => {
          console.log("initializeTasks.pending");
          state.loading = true;
          state.error = null;
        })
        .addCase(initializeTasks.fulfilled, (state, action) => {
          console.log("initializeTasks.fulfilled");
          state.tasks = action.payload;
          state.loading = false;
          state.initialized = true;
        })
        .addCase(initializeTasks.rejected, (state, action) => {
          console.log("initializeTasks.rejected");
          state.loading = false;
          state.error = action.error.message || 'Failed to initialize Tasks';
        });
    }
});

export const {
  fetchTasksFailure,
  addTask,
  updateTaskStatus,
  deleteTask
} = taskSlice.actions;

export default taskSlice.reducer;