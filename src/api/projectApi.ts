const API_BASE_URL = "http://localhost:3001";
import { Task } from '../types/Task';

export const addProject = async (project: {
  name: string;
  description: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...project,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to add project");
  }
  return await response.json();
};


export const deleteProject = async (id: string) => {
  const tasksResponse = await fetch(`${API_BASE_URL}/tasks?projectId=${id}`);
  if (!tasksResponse.ok) {
    throw new Error("Failed to fetch project tasks");
  }
  
  const tasks = await tasksResponse.json();
  


  const deleteTasksPromises = tasks.map((task: Task) => 
    fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: "DELETE"
    })
  );
  
  const deleteTasksResults = await Promise.all(deleteTasksPromises);
  const failedTaskDeletions = deleteTasksResults.filter(res => !res.ok);
  
  if (failedTaskDeletions.length > 0) {
    throw new Error(`Failed to delete ${failedTaskDeletions.length} tasks`);
  }

  const projectResponse = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });
  
  if (!projectResponse.ok) {
    throw new Error("Failed to delete project");
  }
  
  return id;
};