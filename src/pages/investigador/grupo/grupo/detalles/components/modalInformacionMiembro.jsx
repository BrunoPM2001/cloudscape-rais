import { Header, Modal, Tabs } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import axiosBase from "../../../../../../api/axios";
import ProyectosIntegrante from "./tabs/proyectosIntegrante";

export default ({ visible, setVisible, id }) => {
  //  States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    informacion: {},
    proyectos: [],
  });

  //  Functions
  const getData = async () => {
    const res = await axiosBase.get("investigador/grupo/visualizarMiembro", {
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
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      header={
        <Header description="Información general del integrante y proyectos en los que ha participado siendo miembro del grupo">
          Información del integrante de grupo
        </Header>
      }
    >
      <Tabs
        tabs={[
          {
            id: "proyectos",
            label: "Proyectos",
            content: (
              <ProyectosIntegrante data={data.proyectos} loading={loading} />
            ),
          },
        ]}
      />
    </Modal>
  );
};
