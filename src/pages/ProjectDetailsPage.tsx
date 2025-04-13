// pages/ProjectDetails.tsx
import { useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch";

type Project = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

type Task = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    data: project,
    isLoading: loadingProject,
    error: projectError,
  } = useFetch<Project>(`http://localhost:3001/projects/${projectId}`);

  const {
    data: tasks,
    isLoading: loadingTasks,
    error: tasksError,
  } = useFetch<Task[]>(`http://localhost:3001/tasks?projectId=${projectId}`);

  if (loadingProject || loadingTasks) return <p>Loading...</p>;
  if (projectError) return <p>Error loading project: {projectError}</p>;
  if (tasksError) return <p>Error loading tasks: {tasksError}</p>;

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>

      <h2>Tasks</h2>
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} ({task.status}) - Priority: {task.priority}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found for this project.</p>
      )}
    </div>
  );
}

export default ProjectDetails;
