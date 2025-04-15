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
      console.log("fetchProjectsStart");
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess(state, action: PayloadAction<Project[]>) {
      console.log("fetchProjectsSuccess");
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure(state, action: PayloadAction<string>) {
      console.log("fetchProjectsFailure");
      state.loading = false;
      state.error = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      console.log("addProject");
      state.projects.push(action.payload);
      console.log("Current projects in Redux:", state.projects);
    },
    deleteProject(state, action: PayloadAction<string>) {
      console.log("deleteProject");
      state.projects = state.projects.filter(project => project.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeProjects.pending, (state) => {
        console.log("initializeProjects.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeProjects.fulfilled, (state, action) => {
        console.log("initializeProjects.fulfilled");
        state.projects = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(initializeProjects.rejected, (state, action) => {
        console.log("initializeProjects.rejected");
        state.loading = false;
        state.error = action.error.message || 'Failed to initialize projects';
      });
  }
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProject,
  deleteProject
} = projectSlice.actions;

export default projectSlice.reducer;