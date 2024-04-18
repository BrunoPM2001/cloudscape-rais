import { Header, HelpPanel, Toggle } from "@cloudscape-design/components";
import { Mode, applyMode } from "@cloudscape-design/global-styles";
import { useEffect, useState } from "react";

export default function Helpbar({ children }) {
  //  States
  const [checked, setChecked] = useState(false);

  //  Effects
  useEffect(() => {
    applyMode(checked ? Mode.Dark : Mode.Light);
  }, [checked]);

  return (
    <HelpPanel
      header={
        <Header
          variant="h2"
          actions={
            <Toggle
              onChange={({ detail }) => setChecked(detail.checked)}
              checked={checked}
            >
              Modo oscuro
            </Toggle>
          }
        >
          Panel de ayuda
        </Header>
      }
    >
      {children}
    </HelpPanel>
  );
}
