import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  //  Functions
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("Auth");
      if (!token) {
        localStorage.clear();
        window.location.href = "/";
      }
      if (localStorage.getItem("Type") != "Usuario_investigador") {
        localStorage.clear();
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
