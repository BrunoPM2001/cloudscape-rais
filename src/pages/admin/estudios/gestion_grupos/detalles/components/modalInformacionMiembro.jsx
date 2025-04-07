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
import Excluido from "./tabs/excluido";
import Informacion_externo from "./tabs/informacion_externo";

export default ({ close, id, condicion, tipo }) => {
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
          {condicion.startsWith("Ex")
            ? "Información del ex-integrante de grupo"
            : "Información del integrante de grupo"}
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
                condicion == "Titular" ? (
                  <Informacion_titular
                    data={data.informacion}
                    loading={loading}
                  />
                ) : tipo.startsWith("Externo") ? (
                  <Informacion_externo
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
              label: condicion.startsWith("Ex") ? "Exclusión" : "Inclusión",
              content: condicion.startsWith("Ex") ? (
                <Excluido data={data.informacion} loading={loading} />
              ) : (
                <Incluido data={data.informacion} loading={loading} />
              ),
            },
          ]}
        />
      </SpaceBetween>
    </Modal>
  );
};
