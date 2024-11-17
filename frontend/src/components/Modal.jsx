import React, { useEffect, useRef } from 'react';

const Modal = ({
  isOpen,
  onClose,
  onConfirm = () => {},
  title,
  children,
  footer,
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
        return 'max-w-full';
      default:
        return 'max-w-lg';
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
        <div className="flex justify-between p-4 rounded border border-slate-800 bg-slate-800 text-white">
          <h3 id="modal-title" className="text-xl font-semibold">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-white hover:text-gray-300 focus:outline-none">
            &times;
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">{children}</div>
        <div className="border-t border-gray-300 bg-gray-20 p-3">
          {footer ? (
            footer
          ) : (
            <div className="flex justify-end">
              {showConfirm && (
                <button
                  type="button"
                  onClick={onConfirm}
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                  {confirmLabel}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="ms-2 px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
