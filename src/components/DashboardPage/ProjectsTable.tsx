import { Link } from 'react-router-dom';
import Project  from '../../types/Project';

type ProjectsTableProps = {
  projects: (Project & {
    taskStats: {
      total: number;
      completed: number;
      inProgress: number;
      todo: number;
    };
  })[];
};


export const ProjectsTable = ({ projects }: ProjectsTableProps) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Project
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Tasks
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Progress
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {projects.map((project) => {
          const completionPercentage = project.taskStats.total > 0
            ? Math.round((project.taskStats.completed / project.taskStats.total) * 100)
            : 0;

          return (
            <tr 
              key={project.id} 
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="px-6 py-4">
                <Link
                  to={`/projects/${project.id}`}
                  className="group flex flex-col"
                >
                  <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </span>
                  {project.description && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {project.description}
                    </span>
                  )}
                </Link>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.taskStats.total}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Total
                    </span>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-600" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {project.taskStats.completed}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Done
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-full max-w-[160px]">
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {project.taskStats.total > 0 ? `${completionPercentage}%` : 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  completionPercentage === 100 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : completionPercentage > 50
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {completionPercentage === 100 ? 'Completed' : completionPercentage > 0 ? 'In Progress' : 'Not Started'}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);