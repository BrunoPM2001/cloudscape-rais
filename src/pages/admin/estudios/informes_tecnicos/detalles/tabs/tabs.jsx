import Eci_tabs from "./components/ECI/tabs";
import Pconfigi_tabs from "./components/PCONFIGI/tabs";
import Pconfigi_inv_tabs from "./components/PCONFIGI_INV/tabs";
import Pevento_tabs from "./components/PEVENTO/tabs";
import Pinterdis_tabs from "./components/PINTERDIS/tabs";
import Pinvpost_tabs from "./components/PINVPOST/tabs";
import Pmulti_tabs from "./components/PMULTI/tabs";
import Psinfinv_tabs from "./components/PSINFINV/tabs";
import Psinfipu_tabs from "./components/PSINFIPU/tabs";
import Ptpbachiller_tabs from "./components/PTPBACHILLER/tabs";
import { Ptpdocto_tabs, Ptpdocto_final_tabs } from "./components/PTPDOCTO/tabs";
import { Ptpgrado_tabs, Ptpgrado_final_tabs } from "./components/PTPGRADO/tabs";
import { Ptpmaest_final_tabs, Ptpmaest_tabs } from "./components/PTPMAEST/tabs";

export default ({
  tipo_proyecto,
  tipo_informe,
  formValues,
  handleChange,
  files,
}) => {
  return (
    <>
      {tipo_proyecto == "PINVPOST" ? (
        <Pinvpost_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PTPDOCTO" &&
        tipo_informe != "Informe académico final" ? (
        <Ptpdocto_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PTPDOCTO" &&
        tipo_informe == "Informe académico final" ? (
        <Ptpdocto_final_tabs
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : tipo_proyecto == "PTPMAEST" &&
        tipo_informe != "Informe académico final" ? (
        <Ptpmaest_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PTPMAEST" &&
        tipo_informe == "Informe académico final" ? (
        <Ptpmaest_final_tabs
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : tipo_proyecto == "PTPGRADO" &&
        tipo_informe != "Informe académico final" ? (
        <Ptpgrado_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PTPGRADO" &&
        tipo_informe == "Informe académico final" ? (
        <Ptpgrado_final_tabs
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : tipo_proyecto == "ECI" ? (
        <Eci_tabs
          formValues={formValues}
          handleChange={handleChange}
          files={files}
        />
      ) : tipo_proyecto == "PCONFIGI" ? (
        <Pconfigi_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PCONFIGI-INV" ? (
        <Pconfigi_inv_tabs
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : tipo_proyecto == "PEVENTO" ? (
        <Pevento_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PINTERDIS" ? (
        <Pinterdis_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PMULTI" ? (
        <Pmulti_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PSINFINV" ? (
        <Psinfinv_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PSINFIPU" ? (
        <Psinfipu_tabs formValues={formValues} handleChange={handleChange} />
      ) : tipo_proyecto == "PTPBACHILLER" ? (
        <Ptpbachiller_tabs
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : (
        <></>
      )}
    </>
  );
};
