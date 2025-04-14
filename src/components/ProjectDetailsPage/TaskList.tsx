import { Task} from "../../types/Task";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteClick: (taskId: string, taskTitle: string) => void;
};

export const TaskList = ({ tasks, onStatusChange, onDeleteClick }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h4 className="text-lg font-medium text-gray-500 dark:text-gray-400">No tasks found</h4>
        <p className="text-gray-400 dark:text-gray-500 mt-1">Create a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};