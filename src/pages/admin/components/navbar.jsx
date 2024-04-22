import { TopNavigation, Input } from "@cloudscape-design/components";

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
  {
    id: "signout",
    text: "Cerrar sesión",
    href: "/",
  },
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
      utilities={[
        {
          type: "menu-dropdown",
          text: user,
          description: mail,
          iconName: "user-profile",
          items: profileActions,
          onItemClick: ({ detail }) => {
            //  Eliminar token de autenticación
            if (detail.id == "signout") {
              localStorage.removeItem("Auth");
            }
          },
        },
      ]}
    />
  );
}
