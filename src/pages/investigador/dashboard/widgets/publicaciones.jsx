import { Container, Header, PieChart } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../api/axios";

export default function () {
  //  States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  //  Functions
  const getData = async () => {
    try {
      setLoading("loading");
      const res = await axiosBase.get(
        "investigador/dashboard/tipoPublicaciones"
      );
      if (res.status == 401 || res.status == 500) {
        localStorage.removeItem("Auth");
        setLoading(false);
      } else {
        const data = await res.data;
        setData(data.data);
        setLoading("finished");
      }
    } catch (error) {
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
          description="Cantidad de publicaciones registradas"
        >
          Tipos de publicaciones
        </Header>
      }
      fitHeight={true}
    >
      <PieChart fitHeight size="large" statusType={loading} data={data} />
    </Container>
  );
}
