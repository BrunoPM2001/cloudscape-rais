import axios from "axios";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  //  Functions
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("Auth");
      if (!token) {
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return <>{children}</>;
}
