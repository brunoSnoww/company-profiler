import { createContext, useContext, useState, type ReactNode } from "react";
import {Alert} from "@mui/material";

type Notification = {
  message: string;
  isSuccess?: boolean;
};


const NotificationContext = createContext<
  | {
    triggerNotification: (notification: Notification) => void;
  }
  | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const triggerNotification = (notification: Notification) => {
    setNotification(notification);
    // not ideal for accessibility, closing the alert with timeout
    setTimeout(() => setNotification(null),10000)
  };

  return (
      <NotificationContext.Provider value={{ triggerNotification }}>
        {notification && (
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2">
              <div
                  className={`transition-all duration-300 ease-in-out ${notification 
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
              >
                <Alert
                    severity={notification.isSuccess ? 'success' : 'error'}
                    variant="standard"
                >
                  {notification.message}
                </Alert>
              </div>
            </div>
        )}
        {children}
      </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
