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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{totalProjects}</h3>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
          <ListTodo className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTasks}</h3>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{completedTasks}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}% of total` : ''}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{inProgressTasks}</h3>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
          <ListTodo className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">To Do</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{todoTasks}</h3>
        </div>
      </div>
    </div>
  </div>
);