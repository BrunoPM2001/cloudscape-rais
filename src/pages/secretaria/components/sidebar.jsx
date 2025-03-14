import { SideNavigation } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    type: "section",
    text: "Constancias",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Listado",
        href: "/secretaria",
      },
    ],
  },
];

export default function Sidebar({ activeHref = "#" }) {
  const location = useLocation();
  return (
    <SideNavigation
      header={{
        text: "Facultad",
        href: "/facultad",
      }}
      activeHref={"/secretaria" + location.pathname}
      items={navItems}
    />
  );
}
