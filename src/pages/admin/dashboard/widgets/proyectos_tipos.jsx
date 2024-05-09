import { Container, Header, PieChart } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";

export default function () {
  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  //  Functions
  const getData = async () => {
    setLoading("loading");
    const res = await axiosBase.get("admin/dashboard/proyectos/2024");
    const data = await res.data;
    setData(data.data);
    setLoading("finished");
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
