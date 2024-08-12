import {
  Modal,
  FormField,
  Input,
  Box,
  SpaceBetween,
  Form,
  Header,
  ColumnLayout,
  Select,
  Button,
  DatePicker,
  StatusIndicator,
} from "@cloudscape-design/components";
import { useContext, useEffect, useState } from "react";
import axiosBase from "../../../../../api/axios";
import NotificationContext from "../../../../../providers/notificationProvider";

const CreateUserModal = ({ visible, setVisible, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [creating, setCreating] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [form, setForm] = useState({
    codigo_trabajador: null,
    cargo: null,
    nombres: null,
    apellido1: null,
    apellido2: null,
    sexo: null,
    email_admin: null,
    fecha_nacimiento: undefined,
    telefono_casa: null,
    telefono_trabajo: null,
    telefono_movil: null,
    direccion1: null,
    username: null,
    password: null,
    tipo: "Usuario_admin",
  });

  //  Functions
  const createUser = async () => {
    setCreating(true);
    const response = await axiosBase.post("admin/admin/usuarios/create", form);
    const data = response.data;
    setCreating(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={creating}
              onClick={() => createUser()}
            >
              Crear usuario
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Crear usuario administrativo"
    >
      <Form>
        <SpaceBetween direction="vertical" size="s">
          <div>
            <Header variant="h3">Datos institucionales</Header>
            <ColumnLayout columns={2}>
              <FormField label="Código de trabajador">
                <Input
                  controlId="codigo_trabajador"
                  placeholder="Código del trabajador"
                  value={form.codigo_trabajador}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      codigo_trabajador: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Cargo">
                <Input
                  controlId="cargo"
                  placeholder="Cargo del trabajador"
                  value={form.cargo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      cargo: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </div>
          <div>
            <Header variant="h3">Datos personales</Header>
            <ColumnLayout columns={3}>
              <FormField label="Apellido paterno">
                <Input
                  controlId="apellido1"
                  placeholder="Apellido paterno del trabajador"
                  value={form.apellido1}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      apellido1: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Apellido materno">
                <Input
                  controlId="apellido2"
                  placeholder="Apellido materno del trabajador"
                  value={form.apellido2}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      apellido2: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Nombres">
                <Input
                  controlId="nombres"
                  placeholder="Nombres del trabajador"
                  value={form.nombres}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      nombres: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Sexo">
                <Select
                  controlId="sexo"
                  placeholder="Escoga una opción"
                  selectedOption={selectedOption}
                  onChange={({ detail }) => {
                    setSelectedOption(detail.selectedOption);
                    setForm((prev) => ({
                      ...prev,
                      sexo: detail.selectedOption.value,
                    }));
                  }}
                  options={[
                    {
                      label: "Masculino",
                      value: "M",
                    },
                    {
                      label: "Femenino",
                      value: "F",
                    },
                  ]}
                />
              </FormField>
              <FormField label="Fecha_nacimiento">
                <DatePicker
                  controlId="fecha_nacimiento"
                  placeholder="YYYY/MM/DD"
                  value={form.fecha_nacimiento}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      fecha_nacimiento: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Correo">
                <Input
                  controlId="email_admin"
                  placeholder="Correo del trabajador"
                  value={form.email_admin}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      email_admin: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Teléfono de casa">
                <Input
                  controlId="telefono_casa"
                  placeholder="Tel. de casa del trabajador"
                  value={form.telefono_casa}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      telefono_casa: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Teléfono de trabajo">
                <Input
                  controlId="telefono_trabajo"
                  placeholder="Tel. de trabajo del trabajador"
                  value={form.telefono_trabajo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      telefono_trabajo: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Dirección">
                <Input
                  controlId="direccion1"
                  placeholder="Domicilio del trabajador"
                  value={form.direccion1}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      direccion1: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </div>
          <div>
            <Header variant="h3">Datos de acceso</Header>
            <ColumnLayout columns={2}>
              <FormField label="Usuario" stretch>
                <Input
                  controlId="username"
                  placeholder="Nombre de usuario"
                  value={form.username}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      username: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Contraseña" stretch>
                <Input
                  controlId="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      password: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </div>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

const EditUserModal = ({ visible, setVisible, id, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  State
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [form, setForm] = useState({
    id: null,
    tabla_id: null,
    codigo_trabajador: null,
    cargo: null,
    nombres: null,
    apellido1: null,
    apellido2: null,
    sexo: null,
    email_admin: null,
    telefono_casa: null,
    telefono_trabajo: null,
    telefono_movil: null,
    direccion1: null,
    username: null,
  });

  //  Functions
  const getData = async () => {
    setLoading(true);
    const res = await axiosBase.get(
      "admin/admin/usuarios/getOneAdmin/" + id[0].id
    );
    const data = res.data;
    setForm(data);
    setSelectedOption(
      data.sexo == "M"
        ? { value: data.sexo, label: "Masculino" }
        : { value: data.sexo, label: "Femenino" }
    );
    setLoading(false);
  };

  const editUser = async () => {
    setEditing(true);
    const response = await axiosBase.put("admin/admin/usuarios/update", {
      ...form,
      tipo: "Usuario_admin",
    });
    const data = await response.data;
    setEditing(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  //  Effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="large"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={editing}
              onClick={() => editUser()}
            >
              Editar usuario
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar usuario administrativo"
    >
      {loading ? (
        <StatusIndicator type="loading" />
      ) : (
        <Form>
          <SpaceBetween direction="vertical" size="s">
            <div>
              <Header variant="h3">Datos institucionales</Header>
              <ColumnLayout columns={2}>
                <FormField label="Código de trabajador">
                  <Input
                    controlId="codigo"
                    placeholder="Código del trabajador"
                    value={form.codigo_trabajador}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        codigo_trabajador: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Cargo">
                  <Input
                    controlId="cargo"
                    placeholder="Cargo del trabajador"
                    value={form.cargo}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        cargo: detail.value,
                      }))
                    }
                  />
                </FormField>
              </ColumnLayout>
            </div>
            <div>
              <Header variant="h3">Datos personales</Header>
              <ColumnLayout columns={3}>
                <FormField label="Apellido paterno">
                  <Input
                    controlId="paterno"
                    placeholder="Apellido paterno del trabajador"
                    value={form.apellido1}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        apellido1: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Apellido materno">
                  <Input
                    controlId="materno"
                    placeholder="Apellido materno del trabajador"
                    value={form.apellido2}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        apellido2: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Nombres">
                  <Input
                    controlId="nombres"
                    placeholder="Nombres del trabajador"
                    value={form.nombres}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        nombres: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Sexo">
                  <Select
                    controlId="sexo"
                    placeholder="Escoga una opción"
                    selectedOption={selectedOption}
                    onChange={({ detail }) => {
                      setSelectedOption(detail.selectedOption);
                      setForm((prev) => ({
                        ...prev,
                        sexo: detail.selectedOption.value,
                      }));
                    }}
                    options={[
                      {
                        label: "Masculino",
                        value: "M",
                      },
                      {
                        label: "Femenino",
                        value: "F",
                      },
                    ]}
                  />
                </FormField>
                <FormField label="Correo">
                  <Input
                    controlId="email"
                    placeholder="Correo del trabajador"
                    value={form.email}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        email: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Teléfono de casa">
                  <Input
                    controlId="telefono_casa"
                    placeholder="Tel. de casa del trabajador"
                    value={form.telefono_casa}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        telefono_casa: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Teléfono de trabajo">
                  <Input
                    controlId="telefono_trabajo"
                    placeholder="Tel. de trabajo del trabajador"
                    value={form.telefono_trabajo}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        telefono_trabajo: detail.value,
                      }))
                    }
                  />
                </FormField>
                <FormField label="Dirección">
                  <Input
                    controlId="direccion"
                    placeholder="Domicilio del trabajador"
                    value={form.direccion1}
                    onChange={({ detail }) =>
                      setForm((prev) => ({
                        ...prev,
                        direccion1: detail.value,
                      }))
                    }
                  />
                </FormField>
              </ColumnLayout>
            </div>
            <div>
              <Header variant="h3">Datos de acceso</Header>
              <FormField label="Usuario" stretch>
                <Input
                  controlId="usuario"
                  placeholder="Username"
                  value={form.username}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      username: detail.value,
                    }))
                  }
                />
              </FormField>
            </div>
          </SpaceBetween>
        </Form>
      )}
    </Modal>
  );
};

const ResetPasswordModal = ({ visible, setVisible, item }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const resetPass = async () => {
    setLoading(true);
    const response = await axiosBase.put("admin/admin/usuarios/resetPass", {
      id: item[0].id,
    });
    const data = response.data;
    setLoading(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={() => resetPass()}
            >
              Resetar contraseña
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Reiniciar contraseña"
    >
      ¿Estás seguro de reiniciar la contraseña de este usuario? La contraseña
      regresará a la por defecto
    </Modal>
  );
};

const DeleteModal = ({ visible, setVisible, item, reload }) => {
  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loading, setLoading] = useState(false);

  //  Functions
  const deleteUser = async () => {
    setLoading(true);
    const response = await axiosBase.delete("admin/admin/usuarios/delete", {
      data: {
        idUser: item[0].id,
        tipo: "Usuario_admin",
      },
    });
    const data = await response.data;
    setLoading(false);
    setVisible(false);
    pushNotification(data.detail, data.message, notifications.length + 1);
    reload();
  };

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      size="medium"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="normal" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={() => deleteUser()}
            >
              Eliminar usuario
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar usuario administrativo"
    >
      ¿Estás seguro de eliminar a este usuario? La acción no se puede deshacer
    </Modal>
  );
};

export { CreateUserModal, EditUserModal, ResetPasswordModal, DeleteModal };
