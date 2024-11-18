import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = toastIdRef.current++;
    setToasts(currentToasts => [...currentToasts, { id, message, type }]);

    // Auto-hide toast after the specified duration
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <Toast 
            key={toast.id}
            id={toast.id}
            message={toast.message} 
            type={toast.type} 
            onClose={() => hideToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ id, message, type = 'success', onClose }) => {
  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div 
      className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg transition-all transform duration-300 ${styles[type]}`}
      style={{ transform: 'translateY(0)', opacity: 1 }}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};
