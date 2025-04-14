import { Link } from "react-router-dom";
import { Project } from "../../types/Project";

type ProjectCardProps = {
  project: Project;
  onDelete: (project: Project) => void;
};

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {project.name}
          </h3>
          <button
            onClick={() => onDelete(project)}
            className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        {project.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
            {project.description}
          </p>
        )}
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;