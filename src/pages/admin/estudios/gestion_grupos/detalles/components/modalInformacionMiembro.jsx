import {
  Alert,
  Header,
  Modal,
  SpaceBetween,
  Spinner,
  Tabs,
} from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import Informacion_titular from "./tabs/informacion_titular";
import ProyectosIntegrante from "./tabs/proyectosIntegrante";
import Incluido from "./tabs/incluido";
import Informacion_adherente from "./tabs/informacion_adherente";

export default ({ close, id, tipo }) => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    informacion: {},
    proyectos: [],
  });

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("admin/estudios/grupos/visualizarMiembro", {
      params: {
        grupo_integrante_id: id,
      },
    });
    const data = res.data;
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      visible
      size="large"
      onDismiss={close}
      header={
        <Header description="Información general del integrante y proyectos en los que ha participado siendo miembro del grupo">
          Información del integrante de grupo
        </Header>
      }
    >
      <SpaceBetween size="m">
        <Alert header="Apellidos y nombres">
          {loading ? <Spinner /> : <div>{data.informacion.nombre}</div>}
        </Alert>
        <Tabs
          tabs={[
            {
              id: "info",
              label: "Información",
              content:
                tipo == "Titular" ? (
                  <Informacion_titular
                    data={data.informacion}
                    loading={loading}
                  />
                ) : (
                  <Informacion_adherente
                    data={data.informacion}
                    loading={loading}
                  />
                ),
            },
            {
              id: "proyectos",
              label: "Proyectos",
              content: (
                <ProyectosIntegrante data={data.proyectos} loading={loading} />
              ),
            },
            {
              id: "inclusion",
              label: "Inclusión",
              content: <Incluido data={data.informacion} loading={loading} />,
            },
          ]}
        />
      </SpaceBetween>
    </Modal>
  );
};
