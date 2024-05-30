import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Important for accessibility

const ModalWrapper = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Modal"
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <button onClick={onClose} className="float-right">X</button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
