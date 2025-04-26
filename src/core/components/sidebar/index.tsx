"use client";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { useCollapsedContext } from "./context/collapsed-context";
import { usePathname, useRouter } from "next/navigation";
import { BookOpenIcon } from "@heroicons/react/20/solid";

const SideMenu = () => {
  //   const { collapsedContextValue } = useCollapsedContext();
  const pathname = usePathname();
  const router = useRouter();
  const claimsRoutes = [
    {
      label: "Lista de reclamaciones",
      path: `/claims-list`,
    },
    {
      label: "Establecimientos",
      path: `/establishments`,
    },
    {
      label: "Categorias",
      path: `/categories-claim`,
    },
    {
      label: "Páginas de selección",
      path: `/selection-pages`,
    },
    {
      label: "Correos de notificación",
      path: `/notification-emails`,
    },
  ];
  return (
    <Sidebar
      backgroundColor="#041214"
      //   collapsed={collapsedContextValue || false}
      rootStyles={{
        color: "#fff",
        width: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 20,
        border: "none",
      }}
    >
      <Menu
        menuItemStyles={{
          button: {
            "&:hover": {
              // backgroundColor: '#003b3d',
              backgroundColor: "#010101",
              // color: 'white'
              color: "#67b5dc",
            },
          },
          label: {
            // '&:hover': {
            //   backgroundColor: 'pink',
            //   color: 'blue'
            // }
          },
          root: {
            // '&:hover': {
            //   backgroundColor: 'pink',
            //   color: 'blue'
            // }
          },
          subMenuContent: {
            // '&:hover': {
            //   backgroundColor: 'pink',
            //   color: 'blue'
            // }
          },
        }}
      >
        <div className="flex items-center justify-center flex-col my-4">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-accent p-2 rounded-full shadow-lg shadow-indigo-500/20">
              <BookOpenIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Reclamos virtuales
            </h2>
          </div>
        </div>
        {claimsRoutes.map((route) => (
          <MenuItem
            key={route.path}
            rootStyles={{
              // backgroundColor: '#006766',
              backgroundColor: "#041214",
              fontSize: "0.875rem",
              color: pathname === route.path ? "#67b5dc" : "#fff",
            }}
            onClick={() => router.push(route.path)}
          >
            {route.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SideMenu;
