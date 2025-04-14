import { Task } from "../../types/Task";

type TaskCardProps = {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteClick: (taskId: string, taskTitle: string) => void;
};

export const TaskCard = ({ task, onStatusChange, onDeleteClick }: TaskCardProps) => (
  <div className="group p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
    <div className="flex justify-between items-start gap-3 mb-3">
      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{task.title}</h3>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        task.status === "completed"
          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          : task.status === "in_progress"
          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
      }`}>
        {task.status === "in_progress" ? "In Progress" : task.status.replace("_", " ")}
      </span>
    </div>
    
    {task.description && (
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {task.description}
      </p>
    )}
    
    <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        task.priority === "high"
          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
          : task.priority === "medium"
          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
      }`}>
        {task.priority}
      </span>
      
      <div className="flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task["status"])}
          className="text-xs dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => onDeleteClick(task.id, task.title)}
          className="p-1.5 text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);