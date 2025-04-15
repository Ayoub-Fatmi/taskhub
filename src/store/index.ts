import { configureStore } from '@reduxjs/toolkit';
import projectReducer, { initializeProjects } from './projectSlice';
import taskReducer, { initializeTasks } from './taskSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer
  }
});
store.dispatch(initializeProjects());
store.dispatch(initializeTasks());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;