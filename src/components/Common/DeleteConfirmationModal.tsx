type DeleteConfirmationModalProps = {
  DeletedItem: string;
    onClose: () => void;
    onConfirm: () => void;
  };
  
  export const DeleteConfirmationModal = ({ 
    DeletedItem,
    onClose, 
    onConfirm
  }: DeleteConfirmationModalProps) => {  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="mb-6">Are you sure you want to delete <strong>{DeletedItem}</strong>?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };