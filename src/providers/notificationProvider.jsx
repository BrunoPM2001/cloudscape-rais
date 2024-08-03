import { useState, createContext } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  //  State
  const [notifications, setNotifications] = useState([]);

  const pushNotification = (message, type, id, scroll = true) => {
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
    if (scroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearNotification = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, pushNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
