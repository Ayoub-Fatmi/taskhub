const API_BASE_URL = "http://localhost:3001";

export const fetchTasksByProject = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/tasks?projectId=${projectId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return await response.json();
};

export const addTask = async (task: {
  projectId: string;
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
}) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...task,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return await response.json();
};

export const updateTaskStatus = async (
  id: string,
  status: "to_do" | "in_progress" | "completed"
) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update task status");
  }
  return await response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return id;
};