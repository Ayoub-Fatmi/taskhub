import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ErrorDisplay } from '../components/Common/ErrorDisplay';
import { StatsCards } from '../components/DashboardPage/StatsCards';
import { ProjectsTable } from '../components/DashboardPage/ProjectsTable';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjectsStart } from '../store/projectSlice';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { projects, loading, error, initialized } = useAppSelector((state) => state.projects);
  const {tasks, loading: tasksLoading, error: tasksError, initialized: tasksInitialized} = useAppSelector((state) => state.tasks);
    
  if (!initialized || !tasksInitialized || loading || tasksLoading) return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <LoadingSpinner />
    </div>
  );
  
  if (error || tasksError) return <ErrorDisplay error={error || tasksError || "Failed to fetch data"} onRetry={() => dispatch(fetchProjectsStart())} />;

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const todoTasks = tasks.filter(task => task.status === 'to_do').length;

  
  const projectsWithStats = projects.map(project => {
    const projectTasks = tasks.filter(task => task.projectId === project.id);
    return {
      ...project,
      taskStats: {
        total: projectTasks.length,
        completed: projectTasks.filter(task => task.status === 'completed').length,
        inProgress: projectTasks.filter(task => task.status === 'in_progress').length,
        todo: projectTasks.filter(task => task.status === 'to_do').length
      }
    };
  }).sort((a, b) => b.taskStats.total - a.taskStats.total);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Overview of all projects and tasks
          </p>
        </div>
      </div>

      <StatsCards
        totalProjects={totalProjects}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        todoTasks={todoTasks}
      />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects Overview</h2>
        </div>
        <ProjectsTable projects={projectsWithStats} />
      </div>
    </div>
  );
};

export default DashboardPage;
