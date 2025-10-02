import { Tabs } from "@cloudscape-design/components";
import Anexos from "./anexos";
import Con_con_51_tabs from "./components/51/tabs";
import Con_con_52_tabs from "./components/52/tabs";
import Info from "./info";

export default ({ proyecto, it, formValues, handleChange }) => {
  return (
    <>
      {it == "4" || it == "5" || it == "7" || it == "41" || it == "51" ? (
        <Con_con_51_tabs
          proyecto={proyecto}
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : it == "6" || it == "52" || it == "53" ? (
        <Con_con_52_tabs
          proyecto={proyecto}
          formValues={formValues}
          handleChange={handleChange}
        />
      ) : (
        <Tabs
          tabs={[
            {
              id: "info",
              label: "Info general",
              content: <Info proyecto={proyecto} />,
            },
            {
              id: "anexo",
              label: "Anexo",
              content: (
                <Anexos
                  value1={formValues?.file1}
                  handleChange={handleChange}
                />
              ),
            },
          ]}
        />
      )}
    </>
  );
};
