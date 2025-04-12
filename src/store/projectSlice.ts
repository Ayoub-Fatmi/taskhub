import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

interface ProjectsState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  error: null,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetch('http://localhost:3001/projects');
  return (await response.json()) as Project[];
});

export const addProject = createAsyncThunk('projects/addProject', async (newProject: Omit<Project, 'id' | 'createdAt'>) => {
  const response = await fetch('http://localhost:3001/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newProject,
      createdAt: new Date().toISOString(),
    }),
  });
  return (await response.json()) as Project;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: number) => {
  await fetch(`http://localhost:3001/projects/${projectId}`, {
    method: 'DELETE',
  });
  return projectId;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch projects';
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<number>) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      });
  },
});

export const selectAllProjects = (state: RootState) => state.projects.projects;
export const getProjectsStatus = (state: RootState) => state.projects.status;
export const getProjectsError = (state: RootState) => state.projects.error;

export default projectsSlice.reducer;