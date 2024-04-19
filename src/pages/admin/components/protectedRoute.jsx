import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [res, setRes] = useState(false);
  useEffect(() => {
    console.log("sample");
  }, []);

  return <>{res ? <div></div> : <>{children}</>}</>;
}
