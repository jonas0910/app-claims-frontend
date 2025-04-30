import { useAuthSessionStore } from "@/core/store/auth/auth-session-store";
import { Button } from "../ui";
import { usePathname } from "next/navigation";
import UserEditForm from "@/modules/user/components/user-edit-form";
import { UserIcon } from "@heroicons/react/20/solid";
import Modal from "../modal";
import { useModal } from "@/core/hooks/utils/use-modal";
import useUser from "@/modules/user/hooks/use-user";
import { useRef } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { setLogout} = useAuthSessionStore();
  const formRef = useRef<{ resetForm: () => void }>(null);
  const handleReset = () => {
    formRef.current?.resetForm();
  };
  const { user, isLoading} = useUser();
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
      <Modal elementById="user-edit-form" onCancel={handleReset}>
        {
          isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-white">Cargando...</p>
            </div>
          ) : (
            <UserEditForm user={user!} ref={formRef}/>
          )
        }
      </Modal>
    </div>
  );
};
export default Navbar;
