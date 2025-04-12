const API_BASE_URL = "http://localhost:3001";

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
};

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

export const deleteProject = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
  return id;
};