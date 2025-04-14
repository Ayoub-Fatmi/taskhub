import { useDashboardData } from '../hooks/useDashboardData';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ErrorDisplay } from '../components/Common/ErrorDisplay';
import { StatsCards } from '../components/DashboardPage/StatsCards';
import { ProjectsTable } from '../components/DashboardPage/ProjectsTable';

const DashboardPage = () => {
  const { projects, tasks, loading, error, refetch: fetchData } = useDashboardData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} onRetry={fetchData} />;

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>

      <StatsCards
        totalProjects={totalProjects}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        todoTasks={todoTasks}
      />

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>
        <ProjectsTable projects={projectsWithStats} />
      </div>
    </div>
  );
};

export default DashboardPage;