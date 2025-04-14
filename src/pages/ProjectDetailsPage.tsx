import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch";
import {
    addTask,
    updateTaskStatus,
    deleteTask,
} from "../api/taskApi";
import { StatusFilter } from "../components/ProjectDetailsPage/StatusFilter";
import { TaskList } from "../components/ProjectDetailsPage/TaskList";
import { AddTaskModal } from "../components/ProjectDetailsPage/AddTaskModal";
import { DeleteConfirmationModal } from "../components/Common/DeleteConfirmationModal";
import Project from "../types/Project";
import { Task } from "../types/Task";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";

function ProjectDetailsPage() {
    const { projectId } = useParams<{ projectId: string }>();
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{id: string, title: string} | null>(null);

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
        projectId: projectId || "",
        ...task,
        status: "to_do",
      });
      setShowAddTaskModal(false);
      refetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
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
      await deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      refetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

    if (loadingProject || loadingTasks) {
        return (
            <LoadingSpinner />
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
                    onDeleteClick={(taskId, taskTitle) => setTaskToDelete({id: taskId, title: taskTitle})}
                />
            </div>

            <AddTaskModal
                isOpen={showAddTaskModal}
                onClose={() => setShowAddTaskModal(false)}
                onSubmit={handleAddTask}
            />
            {taskToDelete && (
                <DeleteConfirmationModal
                    DeletedItem={taskToDelete?.title || ''}
                    onClose={() => setTaskToDelete(null)}
                    onConfirm={handleDeleteTask}
                />
            )}
        </div>
    );
}

export default ProjectDetailsPage;