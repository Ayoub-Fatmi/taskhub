import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { StatusFilter } from "../components/ProjectDetailsPage/StatusFilter";
import { TaskList } from "../components/ProjectDetailsPage/TaskList";
import { AddTaskModal } from "../components/ProjectDetailsPage/AddTaskModal";
import { DeleteConfirmationModal } from "../components/Common/DeleteConfirmationModal";
import { Task } from "../types/Task";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { ErrorDisplay } from "../components/Common/ErrorDisplay";
import { 
  fetchTasksFailure,
  addTask as addTaskAction,
  updateTaskStatus as updateTaskStatusAction,
  deleteTask as deleteTaskAction
} from "../store/taskSlice";
import { addTask as addTaskApi, updateTaskStatus, deleteTask } from "../api/taskApi";

function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: string; title: string } | null>(null);

  const { projects, loading: projectsLoading, error: projectsError } = useAppSelector((state) => state.projects);
  const { tasks, loading: tasksLoading, error: tasksError } = useAppSelector((state) => state.tasks);


  console.log("tasks ", tasks);
  console.log("projects ", projects);

  const project = projects.find(p => p.id === projectId);

  console.log(project);

  const filteredTasks = tasks
    .filter(task => task.projectId === projectId)
    .filter(task => statusFilter === "all" ? true : task.status === statusFilter);

  console.log("filteredTasks", filteredTasks);


  const handleAddTask = async (task: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }) => {
    if (!projectId) return;
    
    try {
      const newTask = await addTaskApi({
        projectId,
        ...task,
        status: "to_do"
      });
      dispatch(addTaskAction(newTask));
      setShowAddTaskModal(false);
      console.log("handleAdd", tasks )
    } catch (error) {
      dispatch(fetchTasksFailure((error as Error).message));
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      dispatch(updateTaskStatusAction({ id: taskId, status: newStatus }));
    } catch (error) {
      dispatch(fetchTasksFailure((error as Error).message));
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete.id);
      dispatch(deleteTaskAction(taskToDelete.id));
      setTaskToDelete(null);
    } catch (error) {
      dispatch(fetchTasksFailure((error as Error).message));
    }
  };

  if (projectsLoading || tasksLoading) {
    return <LoadingSpinner />;
  }

  if (projectsError) {
    return <ErrorDisplay error={projectsError} onRetry={() => window.location.reload()} />;
  }

  if (tasksError) {
    return <ErrorDisplay error={tasksError} onRetry={() => window.location.reload()} />;
  }

  if (!project) {
    return <ErrorDisplay error="Project not found" onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {project.name}
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
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {project.description && (
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
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Tasks ({filteredTasks.length})
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
          DeletedItem={taskToDelete.title}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default ProjectDetailsPage;