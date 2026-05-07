import { useState } from "react";

const RejectModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-80 space-y-4">
        <h2 className="text-lg font-semibold">Reject Content</h2>

        <textarea
          placeholder="Enter rejection reason"
          className="w-full border p-2 rounded"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={() => {
              if (!reason.trim()) return;
              onSubmit(reason);
              setReason("");
            }}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
