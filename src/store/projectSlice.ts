import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project';


interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
  initialized: false
};

export const initializeProjects = createAsyncThunk(
  'projects/initialize',
  async () => {
    const response = await fetch('http://localhost:3001/projects');
    if (!response.ok) throw new Error('Failed to fetch initial projects');
    return await response.json();
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(initializeProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to initialize projects';
      });
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsFailure,
  addProject,
  deleteProject
} = projectSlice.actions;

export default projectSlice.reducer;