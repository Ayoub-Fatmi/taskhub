import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

type StatsCardsProps = {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
};

export const StatsCards = ({
  totalProjects,
  totalTasks,
  completedTasks,
  inProgressTasks,
  todoTasks
}: StatsCardsProps) => (
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
);