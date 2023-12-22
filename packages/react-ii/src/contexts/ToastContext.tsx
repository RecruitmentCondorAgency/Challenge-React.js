import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import Toast from "../components/Toast";
import { toastType } from "../types/enums";

interface ToastContextProps {
  showToast: (type: toastType, message: string) => void;
}

type Toast = {
  id?: string;
  type: toastType;
  message: string;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  const showToast = useCallback((type: toastType, message: string) => {
    const id = new Date().getTime().toString();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
  }, []);

  useEffect(() => {
    const removeToast = (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const timeoutIds: number[] = [];

    toasts.forEach(({ id }) => {
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, 2000);
      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
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

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export { ToastProvider, useToast };
