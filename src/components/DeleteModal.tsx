type DeleteModalProps = {
    projectName: string;
    onCancel: () => void;
    onConfirm: () => void;
  };
  
  function DeleteModal({ projectName, onCancel, onConfirm }: DeleteModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
          <p className="text-gray-700 mb-6 text-center">
            Are you sure you want to delete <strong>{projectName}</strong>?
          </p>
          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteModal;
  