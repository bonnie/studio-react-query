// using Toasts here since there could be multiple errors at once
// NOTE: this implementation does not allow for multiple toasts, but
// there could easily be an implementation that does (with a toast
// container that rendered and dismissed toasts in an array)

import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import { StyledToast } from '../pages/common/StyledToast';

interface Toast {
  showToast: (message: string | null) => void;
  Toast: React.FC;
}

const toastContext = createContext<Toast | null>(null);

interface ProvideToastProps {
  children: React.ReactNode;
}

// Provider component that wraps your app and makes toast object,
// available to any child component that calls useToast().
export function ProvideToast({ children }: ProvideToastProps): ReactElement {
  const toast = useProvideToast();
  return (
    <toastContext.Provider value={toast}>{children}</toastContext.Provider>
  );
}

// Hook for child components to get the toast object,
// and re-render when it changes.
export const useToast = (): Toast => {
  if (!toastContext) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  const context = useContext(toastContext);
  if (!context) {
    throw new Error('useToast is missing context');
  }
  return context;
};

// Provider hook that creates toast object and handles state
function useProvideToast(): Toast {
  const [content, setContent] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(!!content && content.length > 0);

  const Toast = (): ReactElement => (
    <StyledToast isOpen={isOpen} message={content} setIsOpen={setIsOpen} />
  );

  function showToast(message: string | null): void {
    setContent(message);
    setIsOpen(true);
  }

  // Return the user object and auth methods
  return {
    showToast,
    Toast,
  };
}
