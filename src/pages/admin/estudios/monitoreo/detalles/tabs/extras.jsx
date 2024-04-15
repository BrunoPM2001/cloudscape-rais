import {
  Container,
  ColumnLayout,
  Header,
  Box,
  Spinner,
  SpaceBetween,
  FormField,
  Select,
  Button,
} from "@cloudscape-design/components";
import { useState } from "react";

export default ({ data, loading }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: data.estado_label,
    value: data.estado,
  });

  return (
    <Container header={<Header variant="h2">Extras</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        <SpaceBetween size="s">
          <div>
            <Box variant="awsui-key-label">
              Descripción / comentarios del monitoreo
            </Box>
            {loading ? <Spinner /> : <div>{data.descripcion}</div>}
          </div>
        </SpaceBetween>
        <SpaceBetween size="s">
          <FormField label="Evaluación del monitoreo">
            <Select
              selectedOption={selectedOption}
              onChange={({ detail }) =>
                setSelectedOption(detail.selectedOption)
              }
              options={[
                {
                  label: "En proceso",
                  value: "1",
                },
                {
                  label: "Enviado",
                  value: "2",
                },
                {
                  label: "Observado",
                  value: "3",
                },
                {
                  label: "Aprobado",
                  value: "4",
                },
                {
                  label: "No aprobado",
                  value: "5",
                },
              ]}
            />
          </FormField>
          <Button variant="primary">Guardar</Button>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
};
