// pages/ProjectDetails.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch";
import {
  addTask,
  updateTaskStatus,
  deleteTask,
} from "../api/taskApi";

type Project = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

type Task = {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const {
    data: project,
    isLoading: loadingProject,
    error: projectError,
    refetch: refetchProject
  } = useFetch<Project>(`http://localhost:3001/projects/${projectId}`);

  const {
    data: tasks,
    isLoading: loadingTasks,
    error: tasksError,
    refetch: refetchTasks
  } = useFetch<Task[]>(`http://localhost:3001/tasks?projectId=${projectId}`);

  const filteredTasks = tasks?.filter(task => 
    statusFilter === "all" ? true : task.status === statusFilter
  );

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTask({
        projectId: Number(projectId),
        title: newTaskTitle,
        description: newTaskDescription,
        status: "to_do",
        priority: newTaskPriority,
      });
      
      setNewTaskTitle("");
      setNewTaskDescription("");
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

      {/* Status Filter and Add Task Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2 border-b">
          <button
            className={`py-2 px-4 ${
              statusFilter === "all"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`py-2 px-4 ${
              statusFilter === "to_do"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setStatusFilter("to_do")}
          >
            To Do
          </button>
          <button
            className={`py-2 px-4 ${
              statusFilter === "in_progress"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setStatusFilter("in_progress")}
          >
            In Progress
          </button>
          <button
            className={`py-2 px-4 ${
              statusFilter === "completed"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => setShowAddTaskModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tasks ({filteredTasks?.length})</h2>
        {filteredTasks?.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          <div className="space-y-4">
            {filteredTasks?.map((task) => (
              <div key={task.id} className="p-4 bg-white rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status === "in_progress" ? "In Progress" : task.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{task.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : task.priority === "medium"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {task.priority}
                  </span>
                  <div className="flex space-x-2">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as Task["status"])}
                      className="text-xs border rounded p-1"
                    >
                      <option value="to_do">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => setTaskToDelete(task.id)}
                      className="text-xs bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title*
                </label>
                <input
                  id="title"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                  Priority
                </label>
                <select
                  id="priority"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailsPage;