import { Modal, Box, Button, Table } from "@cloudscape-design/components";
export default ({ close }) => {
  return (
    <Modal
      onDismiss={close}
      visible
      size="large"
      footer={
        <Box float="right">
          <Button variant="normal" onClick={close}>
            Cerrar
          </Button>
        </Box>
      }
      header="Rubros financiables"
    >
      <Table
        wrapLines
        columnDefinitions={[
          {
            id: "rubro",
            header: "Rubro",
            cell: (item) => item.rubro,
          },
          {
            id: "max",
            header: "Financiamiento máximo",
            cell: (item) => item.max,
          },
          {
            id: "partidas",
            header: "Partidas",
            cell: (item) => item.partidas,
          },
        ]}
        columnDisplay={[
          { id: "rubro", visible: true },
          { id: "max", visible: true },
          { id: "partidas", visible: true },
        ]}
        items={[
          {
            rubro: "Incentivo a docentes investigadores",
            max: "S/ 8000",
            partidas: "Subvención Financiera a Investigadores Científicos",
          },
          {
            rubro: "Equipos y bienes duraderos",
            max: "Hasta S/ 32000",
            partidas:
              "Equipos computacionales y periféricos. Equipos de telecomunicaciones. Mobiliario (laboratorio). Equipos (laboratorio). Bienes agropecuarios, mineros y otros. Libros y textos para biblioteca. Software (incluído licencia).",
          },
          {
            rubro: "Materiales e insumos",
            max: "Hasta S/ 32000",
            partidas:
              "Alimentos y bebidas para consumo animal. Repuestos y accesorios. Electricidad, iluminación y electrónica. Materiales e insumos, instrumental y accesorios médicos, quirúrgicos, odontológicos y de laboratorio. Productos químicos. Vacunas. Medicamentos. Suministros para uso agropecuario, forestal y veterinario. Herramientas. Otros bienes.",
          },
          {
            rubro: "Útiles de oficina y materiales de aseo",
            max: "Hasta S/ 800",
            partidas:
              "Papelería en general, útiles y materiales de oficina. Aseo, limpieza y tocador (solo para uso en laboratorio).",
          },
          {
            rubro: "Pasajes y viáticos",
            max: "Hasta S/ 6000",
            partidas:
              "Pasajes y gastos de transporte (interior). Viáticos y asignaciones por comisión de servicios.",
          },
          {
            rubro: "Asesorías especializadas",
            max: "Hasta S/ 5000",
            partidas: "Servicio de consultoría.",
          },
          {
            rubro: "Servicios de terceros",
            max: "Hasta S/ 10000",
            partidas:
              "Servicio de suministro de gas. Servicio de mantenimiento, acondicionamiento y reparaciones. Correos y servicios de mensajería. Servicios diversos (traducciones, publicaciones justificadas en el proyecto). Realizado por personas jurídicas. Servicio de impresiones, encuadernación y empastado. Licencias de uso de software, incluidas suscripciones.",
          },
          {
            rubro: "Movilidad local",
            max: "Hasta S/ 800",
            partidas: "Otros gastos (movilidad local).",
          },
        ]}
      />
    </Modal>
  );
};
