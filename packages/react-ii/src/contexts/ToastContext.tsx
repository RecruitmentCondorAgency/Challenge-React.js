import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import Toast from "../components/Toast";
import { toastType } from "../types/enums";

// Props for the ToastContext
interface ToastContextProps {
  showToast: (type: toastType, message: string) => void;
}

// Interface for a Toast item
type ToastItem = {
  id?: string;
  type: toastType;
  message: string;
};

// Create a context for Toasts
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Props for the ToastProvider component
interface ToastProviderProps {
  children: ReactNode;
}

// ToastProvider component to manage and display toasts
const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // State to manage the array of toasts
  const [toasts, setToasts] = useState<Array<ToastItem>>([]);

  // Function to show a toast with a specific type and message
  const showToast = useCallback((type: toastType, message: string) => {
    const id = new Date().getTime().toString();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
  }, []);

  // Effect to handle toast removal and timeout
  useEffect(() => {
    const removeToast = (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const timeoutIds: number[] = [];

    // Set timeout for each toast to automatically remove after 2000 milliseconds (2 seconds)
    toasts.forEach(({ id }) => {
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, 2000);
      timeoutIds.push(timeoutId);
    });

    // Clear all timeouts on component unmount or when the array of toasts changes
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Container for displaying toasts */}
      <div className="fixed bottom-4 right-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the ToastContext
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { ToastProvider, useToast };
