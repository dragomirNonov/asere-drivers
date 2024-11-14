// src/components/Modal.js
import React, { useEffect, useRef } from 'react';

const Modal = ({
  isOpen,
  onClose,
  onConfirm = () => {},
  title,
  children,
  showConfirm = false,
  confirmLabel = 'OK',
  size = 'md',
}) => {
  const modalRef = useRef();

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-lg';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'full':
        return 'max-w-full'; // Full width for larger screens
      default:
        return 'max-w-lg'; // Default to medium size if no match
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = () => onClose();
  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={handleModalClick}
        className={`bg-white rounded-lg shadow-lg w-full ${getSizeClass()}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title">
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h3 id="modal-title" className="text-xl font-semibold">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 focus:outline-none">
            &times;
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">{children}</div>
        <div className="flex justify-end p-4 border-t border-gray-300">
          {showConfirm && (
            <button
              onClick={onConfirm}
              className="px-3 py-1 me-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              {confirmLabel}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
