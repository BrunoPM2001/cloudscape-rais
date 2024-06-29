import { AttributeEditor, Input, Select } from "@cloudscape-design/components";

export default ({ partidas, opts, handleChange, handlePartidaChange }) => {
  //  Functions
  const getAvailableOptions = (index) => {
    const selectedOptions = partidas.map((partida) => partida.partida?.value);
    return opts.filter(
      (option) =>
        !selectedOptions.includes(option.value) ||
        partidas[index].partida?.value === option.value
    );
  };

  return (
    <AttributeEditor
      key="sample"
      disableAddButton={opts.length == partidas.length}
      onAddButtonClick={() => handleChange("partidas", [...partidas, {}])}
      onRemoveButtonClick={({ detail: { itemIndex } }) => {
        if (partidas.length != 1) {
          const tmpItems = [...partidas];
          tmpItems.splice(itemIndex, 1);
          handleChange("partidas", tmpItems);
        }
      }}
      items={partidas}
      addButtonText="Agregar partida"
      definition={[
        {
          label: "Partida",
          control: (item, index) => (
            <Select
              placeholder="Escoja una partida"
              selectedOption={item.partida}
              onChange={({ detail }) =>
                handlePartidaChange(index, "partida", detail.selectedOption)
              }
              options={getAvailableOptions(index)}
            />
          ),
          warningText: (item) => {
            if (item.partida == null) return "Tiene que escoger una partida";
          },
        },
        {
          label: "Monto",
          control: (item, index) => (
            <Input
              type="number"
              inputMode="decimal"
              value={item.monto}
              placeholder="Ingresa un monto"
              onChange={({ detail }) =>
                handlePartidaChange(index, "monto", detail.value)
              }
            />
          ),
          warningText: (item) => {
            if (parseFloat(item.monto) <= 0) {
              return "El monto tiene que ser mayor a 0";
            } else if (
              parseFloat(item.partida?.max).toFixed(3) < parseFloat(item.monto)
            ) {
              return (
                "Para esta partida el saldo disponible es de S/. " +
                item.partida.max
              );
            }
          },
        },
      ]}
    />
  );
};
