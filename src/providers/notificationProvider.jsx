import { useState, createContext } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  //  State
  const [notifications, setNotifications] = useState([]);

  const pushNotification = (message, type, id) => {
    setNotifications((prev) => [
      ...prev,
      {
        type: type,
        dismissible: true,
        content: message,
        id: id,
        onDismiss: () =>
          setNotifications((items) => items.filter((item) => item.id !== id)),
      },
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
