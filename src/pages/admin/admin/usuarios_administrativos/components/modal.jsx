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
} from "@cloudscape-design/components";
import { useState } from "react";
import axiosBase from "../../../../../api/axios";

const CreateUserModal = ({ visible, setVisible }) => {
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
    tipo: "Usuario_admin",
  });

  //  Function
  const create = async () => {
    setCreating(true);
    await axiosBase.post("admin/admin/usuarios/create", form);
    setCreating(false);
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
              onClick={() => create()}
            >
              Crear usuario
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Crear usuario administrativo"
    >
      <Form variant="embedded">
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
          </div>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};

const EditUserModal = ({ visible, setVisible, form, setForm }) => {
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
            <Button variant="primary">Crear usuario</Button>
          </SpaceBetween>
        </Box>
      }
      header="Editar usuario administrativo"
    >
      <Form variant="embedded">
        <SpaceBetween direction="vertical" size="s">
          <div>
            <Header variant="h3">Datos institucionales</Header>
            <ColumnLayout columns={2}>
              <FormField label="Código de trabajador">
                <Input
                  controlId="codigo"
                  placeholder="Código del trabajador"
                  value={form.codigo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      codigo: detail.value,
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
                  value={form.paterno}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      paterno: detail.value,
                    }))
                  }
                />
              </FormField>
              <FormField label="Apellido materno">
                <Input
                  controlId="materno"
                  placeholder="Apellido materno del trabajador"
                  value={form.materno}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      materno: detail.value,
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
                  value={form.sexo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      sexo: detail.value,
                    }))
                  }
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
                  value={form.direccion}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      direccion: detail.value,
                    }))
                  }
                />
              </FormField>
            </ColumnLayout>
          </div>
          <div>
            <Header variant="h3">Datos de acceso</Header>
            <ColumnLayout columns={3}>
              <FormField label="Grupo" stretch>
                <Input
                  controlId="grupo"
                  placeholder="Grupo de permisos"
                  value={form.grupo}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      grupo: detail.value,
                    }))
                  }
                />
              </FormField>
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
              <FormField label="Contraseña" stretch>
                <Input
                  controlId="password"
                  placeholder="Escriba la contraseña del usuario"
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

const DeleteModal = ({ visible, setVisible }) => {
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
            <Button variant="primary">Eliminar usuario</Button>
          </SpaceBetween>
        </Box>
      }
      header="Eliminar usuario administrativo"
    >
      ¿Estás seguro de eliminar a este usuario? La acción no se puede deshacer
    </Modal>
  );
};

export { CreateUserModal, EditUserModal, DeleteModal };
