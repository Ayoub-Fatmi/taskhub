import { Link } from 'react-router-dom';
import Project  from '../types/Project';

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
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tasks</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {projects.map((project) => {
          const completionPercentage = project.taskStats.total > 0
            ? Math.round((project.taskStats.completed / project.taskStats.total) * 100)
            : 0;

          return (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {project.name}
                </Link>
                <p className="text-sm text-gray-500">{project.description}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{project.taskStats.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{project.taskStats.completed}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${completionPercentage}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {project.taskStats.total > 0 ? `${completionPercentage}%` : 'N/A'}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);