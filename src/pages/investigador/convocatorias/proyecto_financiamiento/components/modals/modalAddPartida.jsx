import {
  Modal,
  Box,
  SpaceBetween,
  Form,
  Button,
  FormField,
  Input,
  Select,
  Alert,
} from "@cloudscape-design/components";
import { useContext, useState, useEffect } from "react";
import { useFormValidation } from "../../../../../../hooks/useFormValidation";
import axiosBase from "../../../../../../api/axios";
import NotificationContext from "../../../../../../providers/notificationProvider";

// Monto máximo por partida según la categoría
const montoMaximoPorPartida = {
  Bienes: {
    EquiposBienesYDuraderos: {
      24: 12500, // Maquinas y equipos
      26: 12500, // Equipos computacionales y periféricos
      27: 12500, // Equipos de telecomunicaciones
      28: 12500, // Mobiliario (laboratorio)
      29: 12500, // Equipos (laboratorio)
      30: 12500, // Animales de cría
      31: 12500, // Animales reproductores
      34: 12500, // Semillas y almacigos
      37: 12500, // Software
      35: 12500, // Libros textos para bibliotecas
      54: 12500, // Maquinarias, equipos y mobiliarios de otras instalaciones
      76: 12500, // Otros bienes agropecuarios, pesqueros y mineros
    },
    MaterialesEInsumos: {
      4: 7500, // Alimentos y bebidas para consumo animal
      5: 7500, // Repuestos y accesorios
      9: 7500, // Electricidad, iluminación y electrónica
      11: 7500, // Otros accesorios y repuestos
      13: 7500, // Vacunas
      14: 7500, // Medicamentos
      15: 7500, // Otros productos similares
      16: 7500, // Mat. insumos, instrumental y accesorios, quirúrgicos, odontológicos y de laboratorio
      17: 7500, // Material biologico
      18: 7500, // Animales para estudio
      19: 7500, // Fertilizantes, insecticidas, plaguicidas y similares
      20: 7500, // Productos farmacéuticos de uso animal
      21: 7500, // Herramientas
      22: 7500, // Productos quimicos
      23: 7500, // Otros bienes
      77: 7500, // Suministros de uso zootécnico
    },
    UtilesDeOficinaYMaterialesDeAseo: {
      6: 500, // Papelería en general, útiles y Mat. de oficina
      7: 500, // Aseo, limpieza y tocador (Mat. de limpieza)
    }
  },
  Servicios: {
    PasajesYViaticos: {
      38: 3750, //Pasajes y gasto de transporte (interior)
      39: 3750, //Viaticos y asignaciones por comision de servicio
    },
    AsesoriasEspecializadas: {
      79: 4000, //Asesoria especializada
      78: 4000, //Servicio de Consultoria
      50: 4000, //Realizadas por personas jurídicas
      55: 4000, //Otros servicios de informatica
    },
    ServiciosDeTerceros: {
      49: 8750, //Servicios diversos
      46: 8750, //De mobiliario y similares
      45: 8750, //Servicio de impresiones, encuadernación y empastado
      47: 8750, //Servicio de mantenimiento, acondicionamiento y reparaciones
    },
    MovilidadLocal: {
      40: 500, //Otros gastos (movilidad local)
    }
  }
};

export default ({ id, visible, setVisible, reload, limit }) => {
  //  Const
  const initialForm = {
    tipo: null,
    partida: null,
    monto: "",
  };

  const formRules = {
    tipo: { required: true },
    partida: { required: true },
    monto: { required: true, lessThan: limit },
  };

  //  Context
  const { notifications, pushNotification } = useContext(NotificationContext);

  //  States
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [optPartidas, setOptPartidas] = useState([]);
  const [montoError, setMontoError] = useState("");

  //  Hooks
  const { formValues, formErrors, handleChange, validateForm } =
    useFormValidation(initialForm, formRules);

  //  Functions
  const listarTiposPartidas = async (value) => {
    setOptPartidas([]);
    const res = await axiosBase.get(
      "investigador/convocatorias/pro-ctie/listarTiposPartidas",
      {
        params: {
          tipo: value,
        },
      }
    );
    const data = res.data;
    setOptPartidas(data);
    console.log("Partidas recibidas del backend:", data); // Log para depuración
  };

  const validarMontoPartida = (partidaSeleccionada, montoIngresado) => {
    // Obtener el tipo de partida (Bienes o Servicios)
    const valuePartida = partidaSeleccionada.value; // ID de la partida seleccionada

    // Verificar el monto máximo para la partida seleccionada
    let montoMaximo;

    // Validacion para "Bienes"
    if (
      [
        24, 26, 27, 28, 29, 30, 31, 34, 37, 35, 54, 76 //Equipos Bienes y Duraderos
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Bienes.EquiposBienesYDuraderos[valuePartida];
    }
    // Validacion para "Materiales e Insumos"
    else if (
      [
        4, 5, 9, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 77 // Materiales e Insumos
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Bienes.MaterialesEInsumos[valuePartida];
    }
    // Validacion para "Utiles de oficina y materiales de aseo"
    else if (
      [
        6, 7 // Útiles de Oficina y materiales de aseo
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Bienes.UtilesDeOficinaYMaterialesDeAseo[valuePartida];
    }

    // Validación para "Servicios"
    else if (
      [
        38, 39 // Pasajes y viaticos
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Servicios.PasajesYViaticos[valuePartida];
    }
    else if (
      [
        50, 55, 79, 78 // AsesoriasEspecializadas
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Servicios.AsesoriasEspecializadas[valuePartida];
    }
    else if (
      [
        49, 45, 46, 47 //Servicios de terceros
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Servicios.ServiciosDeTerceros[valuePartida];
    }
    else if (
      [
        40 //Movilidad local
      ].includes(valuePartida)
    ) {
      montoMaximo = montoMaximoPorPartida.Servicios.MovilidadLocal[valuePartida];
    }

    // Comparar el monto ingresado con el monto máximo
    if (parseFloat(montoIngresado) > montoMaximo) {
      setMontoError(`El monto ingresado no puede superar S/. ${montoMaximo}`);
      pushNotification(
        `El monto ingresado no puede superar S/. ${montoMaximo}`,
        "warning",
        notifications.length + 1
      );
      return false; // Detener la acción si el monto supera el máximo
    }
    setMontoError("");
    return true; // El monto es válido
  };

  const agregarPartida = async () => {
    if (validateForm()) {
      // Validar el monto antes de agregar la partida
      const isMontoValido = validarMontoPartida(formValues.partida, formValues.monto);
      if (!isMontoValido) return; // Detener la acción si el monto no es válido
      // Verificación de los datos antes de enviarlos
      console.log("Datos enviados al backend:", {
        partida_id: formValues.partida.value,
        proyecto_id: id,
        monto: formValues.monto,
      });

      setLoadingCreate(true);
      try {
        const res = await axiosBase.post(
          "investigador/convocatorias/pro-ctie/agregarPartida",
          {
            partida_id: formValues.partida.value,
            proyecto_id: id,
            monto: formValues.monto,
          }
        );
        const data = res.data;
        setLoadingCreate(false);
        setVisible(false);
        reload();
        pushNotification(data.detail, data.message, notifications.length + 1);
      } catch (error) {
        setLoadingCreate(false);
        console.error("Error al agregar la partida:", error);
         // Verifica si el error es un 400 y si el mensaje de error es de la partida ya agregada
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.detail || "Ocurrió un error al agregar la partida.";
          pushNotification(errorMessage, "warning", notifications.length + 1); // Muestra el mensaje de error
        } else {
          pushNotification("Error desconocido. Intenta nuevamente.", "error", notifications.length + 1);
        }
      }
    }
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
              onClick={agregarPartida}
              loading={loadingCreate}
              disabled={loadingCreate}
            >
              Incluir partida
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Agregar partida al proyecto"
    >
      <Form>
        <SpaceBetween size="s">
          <Alert header={`Saldo disponible: S/. ${limit}`} />
          <FormField
            label="Tipo de partida"
            stretch
            errorText={formErrors.tipo}
          >
            <Select
              placeholder="Escoja una opción"
              options={[{ value: "Bienes" }, { value: "Servicios" }]}

              // Cuando se selecciona un tipo, actualizamos las partidas
              selectedOption={formValues.tipo}
              onChange={({ detail }) => {
                handleChange("tipo", detail.selectedOption);
                listarTiposPartidas(detail.selectedOption.value);
              }}
            />
          </FormField>
          <FormField label="Partida" stretch errorText={formErrors.partida}>
            <Select
              placeholder="Escoja una opción"
              statusType={optPartidas.length === 0 ? "loading" : "finished"}
              options={optPartidas}
              selectedOption={formValues.partida}
              onChange={({ detail }) =>
                handleChange("partida", detail.selectedOption)
              }
            />
          </FormField>
          <FormField label="Monto" stretch errorText={formErrors.monto}>
            <Input
              type="number"
              placeholder="Escriba el monto"
              value={formValues.monto}
              onChange={({ detail }) => handleChange("monto", detail.value)}
            />
            {montoError && <Alert type="error" header={montoError} />}
          </FormField>
        </SpaceBetween>
      </Form>
    </Modal>
  );
};
