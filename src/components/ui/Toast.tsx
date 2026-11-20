import { useCallback, useState, type ReactNode } from 'react';
import { ToastContext, type ToastMessage } from './useToast';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setMessages((prev) => [...prev, { id, text }]);
    window.setTimeout(() => {
      setMessages((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-20 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 flex-col gap-2 sm:bottom-6"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="pointer-events-auto rounded-sm border border-secondary/40 bg-secondary px-4 py-3 text-sm font-medium text-[var(--on-secondary)] shadow-lifted"
          >
            {msg.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
