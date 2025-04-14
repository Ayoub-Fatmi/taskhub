import { Task} from "../../types/Task";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteClick: (taskId: string, taskTitle: string) => void;
};

export const TaskList = ({ tasks, onStatusChange, onDeleteClick }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks found</p>;
  }

  return (
    <div className="space-y-4">
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