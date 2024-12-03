import { Spinner, Container } from "@cloudscape-design/components";
import axiosBase from "../../../api/axios";
import Estado5 from "./components/estado5";
import Estado4 from "./components/estado4";
import Estado0 from "./components/estado0";
import Estado1 from "./components/estado1";
import Estado2 from "./components/estado2";
import Estado3 from "./components/estado3";
import Estado6 from "./components/estado6";
import { useState, useEffect } from "react";

export default () => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get("investigador/perfil/cdiEstado");
    const data = res.data;
    setLoading(false);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {loading ? (
        <>
          <Spinner /> Cargando información de CDI
        </>
      ) : (
        <>
          {data.estado == 0 ? (
            <Estado0 />
          ) : data.estado == 1 ? (
            <Estado1 />
          ) : data.estado == 2 ? (
            <Estado2 data={data} reload={getData} />
          ) : data.estado == 3 ? (
            <Estado3 data={data} />
          ) : data.estado == 4 ? (
            <Estado4 data={data} />
          ) : data.estado == 5 ? (
            <Estado5 data={data} reload={getData} />
          ) : (
            <Estado6 data={data} />
          )}
        </>
      )}
    </Container>
  );
};
