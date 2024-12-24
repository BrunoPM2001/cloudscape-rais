import {
  Container,
  FormField,
  Input,
  TokenGroup,
} from "@cloudscape-design/components";

export default ({ value1, value2, error, handleChange }) => {
  return (
    <Container>
      <FormField
        label="Palabras clave"
        description="Presione enter para añadir una palabra clave, máximo 5 palabras"
        stretch
        errorText={error}
      >
        <Input
          placeholder="Escriba las palabras clave de su publicación"
          value={value1}
          onChange={({ detail }) => {
            handleChange("palabras_clave_input", detail.value);
          }}
          onKeyDown={({ detail }) => {
            if (detail.key == "Enter" && value1 != "" && value2.length < 5) {
              handleChange("palabras_clave", [...value2, { label: value1 }]);
              handleChange("palabras_clave_input", "");
            }
          }}
        />
        <TokenGroup
          items={value2}
          onDismiss={({ detail: { itemIndex } }) => {
            handleChange("palabras_clave", [
              ...value2.slice(0, itemIndex),
              ...value2.slice(itemIndex + 1),
            ]);
          }}
        />
      </FormField>
    </Container>
  );
};
