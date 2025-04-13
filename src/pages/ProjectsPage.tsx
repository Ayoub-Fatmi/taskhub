// pages/ProjectsPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/usefetch";

type Project = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

function ProjectsPage() {
  const { data: projects, isLoading, error, refetch } = useFetch<Project[]>("http://localhost:3001/projects");

  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  // Create a new project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProjectName.trim() || !newProjectDesc.trim()) return;

    await fetch("http://localhost:3001/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProjectName,
        description: newProjectDesc,
        createdAt: new Date().toISOString(),
      }),
    });

    setNewProjectName("");
    setNewProjectDesc("");
    refetch(); // Refresh the projects list after adding
  };

  // Delete a project
  const handleDeleteProject = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE",
    });

    refetch(); // Refresh the projects list after deleting
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects: {error}</p>;

  return (
    <div className="p-4">
      {/* Create Project Form */}
      <form onSubmit={handleCreateProject} className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Project Description"
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Project
        </button>
      </form>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
