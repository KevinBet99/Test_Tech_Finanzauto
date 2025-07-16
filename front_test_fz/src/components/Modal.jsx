import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <div className="mb-8 mt-2 text-center text-lg text-gray-700">
          {text}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
          >
            Cerrar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
