type StatusFilterProps = {
    statusFilter: "all" | "to_do" | "in_progress" | "completed";
    setStatusFilter: (status: "all" | "to_do" | "in_progress" | "completed") => void;
    onAddTaskClick: () => void;
  };
  
  export const StatusFilter = ({ 
    statusFilter, 
    setStatusFilter,
    onAddTaskClick
  }: StatusFilterProps) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2 border-b">
        {["all", "to_do", "in_progress", "completed"].map((status) => (
          <button
            key={status}
            className={`py-2 px-4 ${
              statusFilter === status
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status === "all" ? "All" : status === "in_progress" ? "In Progress" : status.replace("_", " ")}
          </button>
        ))}
      </div>
      <button
        onClick={onAddTaskClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </div>
  );