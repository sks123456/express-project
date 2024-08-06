// Modal.tsx
import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
  children?: React.ReactNode; // Add this line to accept children
}

const Modal: React.FC<ModalProps> = ({ message, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        {children} {/* Render the children here */}
        <button
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
