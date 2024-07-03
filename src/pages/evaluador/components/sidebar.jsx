import { Badge, SideNavigation } from "@cloudscape-design/components";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    type: "section",
    text: "Evaluaciones",
    defaultExpanded: false,
    items: [
      {
        type: "link",
        text: "Evaluar",
        href: "/evaluador",
      },
    ],
  },
];

export default function Sidebar({ activeHref = "#" }) {
  const location = useLocation();
  return (
    <SideNavigation
      header={{
        text: "Evaluador",
        href: "/evaluador",
      }}
      activeHref={location.pathname}
      items={navItems}
    />
  );
}
