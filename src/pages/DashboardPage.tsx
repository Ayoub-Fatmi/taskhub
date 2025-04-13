import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import Project from '../types/Project';
import { ProgressBar } from '../components/ProgressBar';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

const DashboardPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch projects and tasks in parallel
                const [projectsRes, tasksRes] = await Promise.all([
                    fetch('http://localhost:3001/projects'),
                    fetch('http://localhost:3001/tasks')
                ]);

                if (!projectsRes.ok) throw new Error('Failed to fetch projects');
                if (!tasksRes.ok) throw new Error('Failed to fetch tasks');

                const projectsData = await projectsRes.json();
                const tasksData = await tasksRes.json();

                setProjects(projectsData);
                setTasks(tasksData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="text-red-500 text-center">
                    <p>Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
    const todoTasks = tasks.filter(task => task.status === 'to_do').length;
    console.log(tasks);
    // Calculate tasks per project
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

    // console.log(projectsWithStats);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <p className="text-sm font-medium text-blue-600">Total Projects</p>
                            <h3 className="text-2xl font-bold text-blue-900">{totalProjects}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                        <ListTodo className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-blue-600">Total Tasks</p>
                            <h3 className="text-2xl font-bold text-blue-900">{totalTasks}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-green-600">Completed Tasks</p>
                            <h3 className="text-2xl font-bold text-green-900">{completedTasks}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                        <Clock className="h-8 w-8 text-yellow-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-yellow-600">Tasks In Progress</p>
                            <h3 className="text-2xl font-bold text-yellow-900">{inProgressTasks}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <div className="flex items-center">
                        <ListTodo className="h-8 w-8 text-red-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-red-600">Tasks To Do</p>
                            <h3 className="text-2xl font-bold text-red-900">{todoTasks}</h3>
                        </div>
                    </div>
                </div>
            </div>


            {/* Task Distribution */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
                <div className="mb-4">
                    <ProgressBar
                        segments={[
                            { value: completedTasks, color: '#10B981', label: 'Completed' },
                            { value: inProgressTasks, color: '#F59E0B', label: 'In Progress' },
                            { value: todoTasks, color: '#9CA3AF', label: 'To Do' }
                        ]}
                        total={totalTasks}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Completed: {completedTasks}</span>
                        <span>In Progress: {inProgressTasks}</span>
                        <span>To Do: {todoTasks}</span>
                    </div>
                </div>
            </div>

            {/* Projects List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>
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
                            {projectsWithStats.map((project) => {
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
            </div>
        </div>
    );
};

export default DashboardPage;