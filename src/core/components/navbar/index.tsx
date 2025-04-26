import { useAuthSessionStore } from "@/core/store/auth/auth-session-store";
import { Button } from "../ui";
import { usePathname } from "next/navigation";
import UserEditForm from "@/modules/user/components/user-edit-form";
import { UserIcon } from "@heroicons/react/20/solid";
import Modal from "../modal";
import { useModal } from "@/core/hooks/utils/use-modal";

const Navbar = () => {
  const pathname = usePathname();
  const { setLogout } = useAuthSessionStore();
  const handleLogout = () => {
    setLogout();
  };
  const {openModal} = useModal()

  return (
    <div className="bg-background-dark flex items-center justify-between p-4">
      <div>
        <p className="text-white text-lg font-bold ml-10">
          {{
            "/claims-list": "Lista de Reclamos",
            "/establishments": "Establecimientos",
            "/categories": "Categorias",
            "/selection-pages": "Páginas de Selección",
            "/notification-emails": "Correos de Notificación",
          }[pathname] || "Página Desconocida"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => {
          openModal({
            elementById: "user-edit-form",
          });
        }}>
          <UserIcon className="w-5 h-5 " />
        </Button>
        <Button onClick={handleLogout}>
          <span className="">Cerrar Sesion</span>
        </Button>
      </div>
      <Modal elementById="user-edit-form">
        <UserEditForm />
      </Modal>
    </div>
  );
};
export default Navbar;
