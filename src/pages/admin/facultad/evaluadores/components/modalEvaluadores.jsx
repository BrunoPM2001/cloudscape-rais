import {
  Modal,
  Box,
  SpaceBetween,
  Button,
  AttributeEditor,
  Spinner,
  FormField,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../../../providers/notificationProvider";
import axiosBase from "../../../../../api/axios";
import EvaluadorName from "./evaluadorName";

export default ({ close, reload, items }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingData, setLoadingData] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [data, setData] = useState([]);

  //  Functions
  const getData = async () => {
    setLoadingData(true);
    const res = await axiosBase.get(
      "admin/facultad/evaluadores/evaluadoresProyecto",
      {
        params: {
          proyecto_id: items[0].id,
        },
      }
    );
    const data1 = res.data;
    setLoadingData(false);
    setData(data1);
  };

  const editarEvaluadores = async () => {
    setLoadingUpdate(true);
    const res = await axiosBase.put(
      "admin/facultad/evaluadores/updateEvaluadores",
      {
        proyectos: items,
        evaluadores: data,
      }
    );
    setLoadingUpdate(false);
    const data2 = res.data;
    pushNotification(data2.detail, data2.message, notifications.length + 1);
    reload();
    close();
  };

  //  Effects
  useEffect(() => {
    if (items.length == 1) {
      getData();
    } else {
      setLoadingData(false);
    }
  }, []);

  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={close}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={editarEvaluadores}
              loading={loadingUpdate}
            >
              Guardar evaluadores
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Evaluadores de proyecto"
    >
      {loadingData ? (
        <>
          <Spinner /> Cargando datos
        </>
      ) : (
        <AttributeEditor
          disableAddButton={data.length >= 3}
          onAddButtonClick={() => setData([...data, { evaluador: "" }])}
          onRemoveButtonClick={({ detail: { itemIndex } }) => {
            const tmpItems = [...data];
            tmpItems.splice(itemIndex, 1);
            setData(tmpItems);
          }}
          items={data}
          addButtonText="Agregar evaluador"
          definition={[
            {
              label: "Evaluador",
              control: (item, index) => (
                // <FormField label={"Evaluador " + (index + 1)}>
                <EvaluadorName
                  index={index}
                  value={data[index].evaluador}
                  setValue={setData}
                />
                // </FormField>
              ),
            },
          ]}
        />
      )}
    </Modal>
  );
};
