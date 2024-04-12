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
} from "@cloudscape-design/components";
import { useState } from "react";

const CreateUserModal = ({ visible, setVisible }) => {
  const [selectedOption, setSelectedOption] = useState();
  const [form, setForm] = useState({
    codigo: null,
    cargo: null,
    nombres: null,
    paterno: null,
    materno: null,
    sexo: null,
    mail: null,
    telefono_casa: null,
    telefono_trabajo: null,
    telefono_movil: null,
    direccion: null,
    grupo: null,
    username: null,
    password: null,
  });

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
      header="Crear usuario administrativo"
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
                  controlId="mail"
                  placeholder="Correo del trabajador"
                  value={form.mail}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      mail: detail.value,
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
                  value={form.usuario}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      usuario: detail.value,
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
                  controlId="mail"
                  placeholder="Correo del trabajador"
                  value={form.mail}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      mail: detail.value,
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
                  value={form.usuario}
                  onChange={({ detail }) =>
                    setForm((prev) => ({
                      ...prev,
                      usuario: detail.value,
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
