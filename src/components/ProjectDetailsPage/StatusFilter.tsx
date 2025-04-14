type StatusFilterProps = {
    statusFilter: "all" | "to_do" | "in_progress" | "completed";
    setStatusFilter: (status: "all" | "to_do" | "in_progress" | "completed") => void;
    onAddTaskClick: () => void;
  };
  
//   export const StatusFilter = ({ 
//     statusFilter, 
//     setStatusFilter,
//     onAddTaskClick
//   }: StatusFilterProps) => (
//     <div className="flex justify-between items-center mb-6">
//       <div className="flex space-x-2 border-b">
//         {["all", "to_do", "in_progress", "completed"].map((status) => (
//           <button
//             key={status}
//             className={`py-2 px-4 ${
//               statusFilter === status
//                 ? "border-b-2 border-blue-500 text-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setStatusFilter(status)}
//           >
//             {status === "all" ? "All" : status === "in_progress" ? "In Progress" : status.replace("_", " ")}
//           </button>
//         ))}
//       </div>
//       <button
//         onClick={onAddTaskClick}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Add Task
//       </button>
//     </div>
//   );

export const StatusFilter = ({ 
  statusFilter, 
  setStatusFilter,
  onAddTaskClick
}: StatusFilterProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {(["all", "to_do", "in_progress", "completed"] as const).map((status) => (
        <button
          key={status}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            statusFilter === status
              ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setStatusFilter(status)}
        >
          {status === "all" 
            ? "All" 
            : status === "in_progress" 
              ? "In Progress" 
              : status.replace("_", " ")}
        </button>
      ))}
    </div>
    <button
      onClick={onAddTaskClick}
      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      Add Task
    </button>
  </div>
);