import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useContext, useEffect, useMemo, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";
import RuleTree from "../metas/metasTree";
import { queryToTree } from "../metas/helpers";

const newGroup = (children = [newCondition()]) => ({
  id: crypto.randomUUID(),
  type: "group",
  operator: "AND",
  children,
});

const newCondition = () => ({
  id: crypto.randomUUID(),
  type: "condition",
  key: "Artículo",
  number: 0,
});

const treeToQuery = (node, isRoot = false) => {
  if (node.type === "condition") {
    return `${node.key} = ${node.number}`;
  }

  const parts = node.children
    .map((child) => treeToQuery(child))
    .filter(Boolean);

  if (parts.length === 0) return "";

  const joined = parts.join(` ${node.operator} `);

  return isRoot ? `(${joined})` : `(${joined})`;
};

export default ({ close, reload, item }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState(() => newGroup());
  const query = useMemo(() => treeToQuery(tree, true), [tree]);

  //  Functions
  const editar = async () => {
    setLoading(true);
    const res = await axiosBase.post("admin/estudios/monitoreo/editarMeta", {
      meta_tipo_proyecto: item.id,
      condicion: query,
    });
    const data = res.data;
    pushNotification(data.detail, data.message, notifications.length + 1);
    setLoading(false);
    close();
    reload();
  };

  useEffect(() => {
    if (!item.condicion || item.condicion.trim() === "") return;

    const parsedTree = queryToTree(item.condicion);

    if (parsedTree) {
      setTree(parsedTree);
    }
  }, []);

  return (
    <Modal
      visible
      onDismiss={close}
      size="medium"
      header="Editar meta"
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={close}>Cerrar</Button>
            <Button variant="primary" loading={loading} onClick={editar}>
              Guardar cambios
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <RuleTree value={tree} onChange={setTree} />
    </Modal>
  );
};
