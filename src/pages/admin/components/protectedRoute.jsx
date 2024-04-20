import axios from "axios";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  //  Functions
  const verifyToken = async () => {
    try {
      //  Obtener token
      const token = localStorage.getItem("Auth");
      if (!token) {
        window.location.href = "/";
      }

      //  Verificar token
      // const result = await axios({
      //   url: "http://localhost:8000/checkAuth",
      //   method: "GET",
      //   headers: {
      //     Authorization: token,
      //   },
      // });
      // const data = await result.data;
      // if (data.data == "Error en token") {
      //   localStorage.removeItem("Auth");
      // }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return <>{children}</>;
}
