// pages/ProjectDetails.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch";
import {
    addTask,
    updateTaskStatus,
    deleteTask,
} from "../api/taskApi";
import { StatusFilter } from "../components/StatusFilter";
import { TaskList } from "../components/TaskList";
import { AddTaskModal } from "../components/AddTaskModal";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import Project from "../types/Project";
import { Task } from "../types/Task";

function ProjectDetailsPage() {
    const { projectId } = useParams<{ projectId: string }>();
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const {
    data: project,
    isLoading: loadingProject,
    error: projectError,
    refetch: refetchProject
  } = useFetch<Project>(`http://localhost:3001/projects/${projectId}`);

  const {
    data: tasks = [],
    isLoading: loadingTasks,
    error: tasksError,
    refetch: refetchTasks
  } = useFetch<Task[]>(`http://localhost:3001/tasks?projectId=${projectId}`);

  const filteredTasks = ( tasks ?? []).filter(task => 
    statusFilter === "all" ? true : task.status === statusFilter
  );

  const handleAddTask = async (task: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }) => {
    try {
      await addTask({
        projectId: Number(projectId),
        ...task,
        status: "to_do",
      });
      setShowAddTaskModal(false);
      refetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: Task["status"]) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      refetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    try {
      await deleteTask(taskToDelete);
      setTaskToDelete(null);
      refetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

    if (loadingProject || loadingTasks) {
        return (
            <main className="h-screen flex justify-center items-center">
                <button
                    disabled
                    className="text-white bg-blue-700 focus:ring-4 cursor-default focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                >
                    <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                        />
                    </svg>
                    Loading...
                </button>
            </main>
        );
    }

    if (projectError) {
        return (
            <main className="h-screen flex flex-grow justify-center items-center">
                <div className="error-container">
                    <div>Error: {projectError}</div>
                    <button
                        onClick={refetchProject}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    if (tasksError) {
        return (
            <main className="h-screen flex flex-grow justify-center items-center">
                <div className="error-container">
                    <div>Error: {tasksError}</div>
                    <button
                        onClick={refetchTasks}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Project Header */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-2">{project?.name}</h1>
                <p className="text-gray-600 mb-4">{project?.description}</p>
                <div className="text-sm text-gray-500">
                    Created at: {new Date(project?.createdAt || "").toLocaleDateString()}
                </div>
            </div>

            <StatusFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onAddTaskClick={() => setShowAddTaskModal(true)}
            />

            <div>
                <h2 className="text-2xl font-semibold mb-4">Tasks ({filteredTasks?.length})</h2>
                <TaskList
                    tasks={filteredTasks}
                    onStatusChange={handleStatusChange}
                    onDeleteClick={setTaskToDelete}
                />
            </div>

            <AddTaskModal
                isOpen={showAddTaskModal}
                onClose={() => setShowAddTaskModal(false)}
                onSubmit={handleAddTask}
            />

            <DeleteConfirmationModal
                isOpen={taskToDelete !== null}
                onClose={() => setTaskToDelete(null)}
                onConfirm={handleDeleteTask}
            />
        </div>
    );
}

export default ProjectDetailsPage;