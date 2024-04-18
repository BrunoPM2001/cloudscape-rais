import { TopNavigation, Input } from "@cloudscape-design/components";
import { useState } from "react";

const profileActions = [
  {
    id: "support-group",
    text: "Opciones",
    items: [
      {
        id: "perfil",
        text: "Mi perfil",
        href: "#",
      },
      {
        id: "updatePassword",
        text: "Cambiar contraseña",
        href: "#",
      },
    ],
  },
  { id: "signout", text: "Cerrar sesión" },
];

export default function Navbar({
  idUser = 1,
  user = "Ichajaya",
  mail = "max.ichajaya@unmsm.edu.pe",
}) {
  return (
    <TopNavigation
      identity={{
        title: "RAIS",
        // logo: { src: logo, alt: "Logo RAIS" },
      }}
      // search={
      //   <Input
      //     ariaLabel="Search input field for navigation"
      //     clearAriaLabel="Clear input field for navigation"
      //     value={searchNav}
      //     type="search"
      //     placeholder="Buscar..."
      //     onChange={({ detail }) => setSearchNav(detail.value)}
      //   />
      // }
      utilities={[
        {
          type: "menu-dropdown",
          text: user,
          description: mail,
          iconName: "user-profile",
          items: profileActions,
        },
      ]}
    />
  );
}
