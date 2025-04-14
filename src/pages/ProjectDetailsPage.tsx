import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch";
import { addTask, updateTaskStatus, deleteTask } from "../api/taskApi";
import { StatusFilter } from "../components/ProjectDetailsPage/StatusFilter";
import { TaskList } from "../components/ProjectDetailsPage/TaskList";
import { AddTaskModal } from "../components/ProjectDetailsPage/AddTaskModal";
import { DeleteConfirmationModal } from "../components/Common/DeleteConfirmationModal";
import Project from "../types/Project";
import { Task } from "../types/Task";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorDisplay } from "../components/Common/ErrorDisplay";

function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>(
    "all"
  );
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const {
    data: project,
    isLoading: loadingProject,
    error: projectError,
    refetch: refetchProject,
  } = useFetch<Project>(`http://localhost:3001/projects/${projectId}`);

  const {
    data: tasks = [],
    isLoading: loadingTasks,
    error: tasksError,
    refetch: refetchTasks,
  } = useFetch<Task[]>(`http://localhost:3001/tasks?projectId=${projectId}`);

  const filteredTasks = (tasks ?? []).filter((task) =>
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

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
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
    return <LoadingSpinner />;
  }

  if (projectError) {
    return <ErrorDisplay error={projectError} onRetry={refetchProject} />;
  }

  if (tasksError) {
    return <ErrorDisplay error={tasksError} onRetry={refetchTasks} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {project?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                Created:{" "}
                {new Date(project?.createdAt || "").toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        {project?.description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            {project.description}
          </p>
        )}
      </div>

      <StatusFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddTaskClick={() => setShowAddTaskModal(true)}
      />

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Tasks ({filteredTasks?.length})
        </h2>
        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDeleteClick={(taskId, taskTitle) =>
            setTaskToDelete({ id: taskId, title: taskTitle })
          }
        />
      </div>

      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onSubmit={handleAddTask}
      />
      {taskToDelete && (
        <DeleteConfirmationModal
          DeletedItem={taskToDelete?.title || ""}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default ProjectDetailsPage;
