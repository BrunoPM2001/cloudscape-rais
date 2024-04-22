import {
  Container,
  FormField,
  Header,
  PieChart,
  Select,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";

export default function () {
  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  //  Functions
  const getData = async () => {
    try {
      setLoading("loading");
      const res = await fetch(
        "http://localhost:8000/api/admin/dashboard/proyectos/2024",
        {
          headers: {
            Authorization: localStorage.getItem("Auth"),
          },
        }
      );
      if (!res.ok) {
        setLoading("error");
        throw new Error("Error in fetch");
      } else {
        const data = await res.json();
        setData(data.data);
        setLoading("finished");
      }
    } catch (error) {
      setItems([]);
      setLoading("error");
      console.log(error);
    }
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Cantidad de proyectos clasificados por tipos"
        >
          Proyectos del presente año
        </Header>
      }
      fitHeight={true}
    >
      <PieChart fitHeight size="large" statusType={loading} data={data} />
    </Container>
  );
}
