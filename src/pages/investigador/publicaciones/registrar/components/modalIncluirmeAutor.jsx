import { Modal } from "@cloudscape-design/components";

export default ({ close }) => {
  return (
    <Modal
      visible
      size="medium"
      onDismiss={close}
      header="Solicitar ser incluído como autor"
    >
      Hi mom
    </Modal>
  );
};
