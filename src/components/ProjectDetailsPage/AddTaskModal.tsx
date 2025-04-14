import { useState } from "react";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }) => void;
};

// export const AddTaskModal = ({ isOpen, onClose, onSubmit }: AddTaskModalProps) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ title, description, priority });
//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full">
//         <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//               Title*
//             </label>
//             <input
//               id="title"
//               type="text"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
//               Priority
//             </label>
//             <select
//               id="priority"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };


export const AddTaskModal = ({ isOpen, onClose, onSubmit }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority });
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-white">
              Add New Task
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="mb-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>
            
            <div className="mb-5">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  id="priority"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};