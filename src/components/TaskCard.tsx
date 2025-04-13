import { Task } from "../types/Task";

type TaskCardProps = {
  task: Task;
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void;
  onDeleteClick: (taskId: number) => void;
};

export const TaskCard = ({ task, onStatusChange, onDeleteClick }: TaskCardProps) => (
  <div className="p-4 bg-white rounded-lg shadow">
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
          onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
          className="text-xs border rounded p-1"
        >
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => onDeleteClick(task.id)}
          className="text-xs bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);