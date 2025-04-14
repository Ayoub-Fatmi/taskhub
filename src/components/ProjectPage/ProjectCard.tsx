import { Link } from "react-router-dom";
import { Project } from "../../types/Project";

type ProjectCardProps = {
  project: Project;
  onDelete: (project: Project) => void;
};

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
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
          onClick={() => onDelete(project)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
