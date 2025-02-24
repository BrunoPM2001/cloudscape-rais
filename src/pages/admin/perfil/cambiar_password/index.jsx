import {
  Button,
  Container,
  Form,
  FormField,
  Input,
  SpaceBetween,
} from "@cloudscape-design/components";
import { useState } from "react";
import BaseLayout from "../../components/baseLayout";
import axiosBase from "../../../../api/axios";
import { useFormValidation } from "../../../../hooks/useFormValidation";

const breadcrumbs = [
  {
    text: "Admin",
    href: "/admin",
  },
  {
    text: "Cambiar contraseña",
  },
];

const initialForm = {
  current_password: "",
  new_pass1: "",
  new_pass2: "",
};

const formRules = {
  current_password: { required: true },
  new_pass1: { required: true },
  new_pass2: { required: true },
};

export function Component() {
  //  States
  const [loading, setLoading] = useState(false);
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  const cambiar = async () => {
    if (validateForm()) {
      setLoading(true);
      const res = await axiosBase.put("admin/perfil/changePass", formValues);
      const data = res.data;
      setLoading(false);
    }
  };

  return (
    <BaseLayout
      breadcrumbs={breadcrumbs}
      header="Cambiar contraseña"
      helpInfo="Información sobre la páginal actual para poder mostrarla al público
      en general."
    >
      <Container>
        <Form
          actions={
            <Button variant="primary" loading={loading} onClick={cambiar}>
              Cambiar contraseña
            </Button>
          }
        >
          <SpaceBetween size="m">
            <FormField
              label="Contraseña actual"
              errorText={formErrors.current_password}
              stretch
            >
              <Input
                placeholder="Escriba su contraseña actual"
                value={formValues.current_password}
                onChange={({ detail }) =>
                  handleChange("current_password", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Nueva contraseña"
              errorText={formErrors.new_pass1}
              stretch
            >
              <Input
                placeholder="Escriba su nueva contraseña"
                value={formValues.new_pass1}
                onChange={({ detail }) =>
                  handleChange("new_pass1", detail.value)
                }
              />
            </FormField>
            <FormField
              label="Repetir nueva contraseña"
              errorText={formErrors.new_pass2}
              stretch
            >
              <Input
                placeholder="Repita su nueva contraseña"
                value={formValues.new_pass2}
                onChange={({ detail }) =>
                  handleChange("new_pass2", detail.value)
                }
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </Container>
    </BaseLayout>
  );
}
