import { TopNavigation } from "@cloudscape-design/components";
import { useState } from "react";
import ModalChangePassword from "../dashboard/components/modalChangePassword";

const profileActions = [
  {
    id: "support-group",
    text: "Opciones",
    items: [
      {
        id: "perfil",
        text: "Mi perfil",
        href: "/investigador/perfil",
      },
      {
        id: "updatePassword",
        text: "Cambiar contraseña",
        // href: "#",
      },
    ],
  },
  {
    id: "signout",
    text: "Cerrar sesión",
    href: "/",
  },
];

export default function Navbar() {
  const [changePassModal, setChangePassModal] = useState(false);

  return (
    <>
      <TopNavigation
        identity={{
          title: "RAIS",
          // logo: { src: logo, alt: "Logo RAIS" },
        }}
        utilities={[
          {
            type: "menu-dropdown",
            text: localStorage.getItem("User"),
            description: localStorage.getItem("Type"),
            iconName: "user-profile",
            items: profileActions,
            onItemClick: ({ detail }) => {
              //  Eliminar token de autenticación
              if (detail.id == "signout") {
                localStorage.removeItem("Auth");
              }

              //  Cambiar contraseña
              if (detail.id == "updatePassword") {
                setChangePassModal(true);
              }
            },
          },
        ]}
      />
      {changePassModal && (
        <ModalChangePassword close={() => setChangePassModal(false)} />
      )}
    </>
  );
}
