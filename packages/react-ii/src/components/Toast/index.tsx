import React, { useState, useEffect } from "react";
import { toastType } from "../../types/enums";

// Props for the Toast component
interface ToastProps {
  id: string;
  type: toastType;
  message: string;
}

// Toast component for displaying toast messages
const Toast: React.FC<ToastProps> = ({ id, type, message }) => {
  // State to manage the visibility of the toast
  const [isVisible, setIsVisible] = useState(true);

  // Effect to automatically hide the toast after a timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Handler function for closing the toast
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      id={id}
      className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${
        // Dynamically apply dark mode styles based on toast type
        type === toastType.success
          ? "dark:text-gray-200 dark:bg-green-800"
          : type === toastType.error
          ? "dark:text-red-200 dark:bg-red-800"
          : "dark:text-orange-200 dark:bg-orange-700"
      } ${isVisible ? "" : "hidden"}`}
      role="alert"
    >
      {/* Icon based on the type of toast */}
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${type}-500 bg-${type}-100 rounded-lg dark:bg-${type}-700 dark:text-${type}-200`}
      >
        {/* Icon content based on the type */}
        {type === toastType.success ? (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        ) : type === toastType.error ? (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        )}
        {/* Accessible text for screen readers */}
        <span className="sr-only">
          {type === toastType.success
            ? "Check icon"
            : type === toastType.error
            ? "Error icon"
            : "Warning icon"}
        </span>
      </div>
      {/* Message content of the toast */}
      <div className="ms-3 text-sm font-normal">{message}</div>
      {/* Close button for dismissing the toast */}
      <button
        type="button"
        className={`ms-auto ml-1 -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}
        data-dismiss-target={`#${id}`}
        aria-label="Close"
        onClick={handleClose}
      >
        <span className="sr-only">Close</span>
        {/* Close icon */}
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
