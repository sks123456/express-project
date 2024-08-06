import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Success</h2>
        <p>{message}</p>
        <button onClick={onClose}>Login</button>
      </div>
    </div>
  );
};

export default Modal;
