"use client";
import SideMenu from "@/core/components/sidebar";
import { ReactNode, useLayoutEffect } from "react";
import { CollapsedProvider } from "@/core/components/sidebar/context/collapsed-context";
import { useAuthSessionStore } from "@/core/store/auth/auth-session-store";
import { useRouter } from "next/navigation";
import Navbar from "@/core/components/navbar";
// import Navbar from "@/core/components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const { isAuth, verifySession } = useAuthSessionStore();

  useLayoutEffect(() => {
    verifySession();
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router, verifySession]);

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex">
      <CollapsedProvider collapsedContextValue={true}>
        <SideMenu/>
      </CollapsedProvider>

      <div
        className={`bg-[url("/bg.svg")] dark:bg-[url("/bgdark.svg")] flex-1 flexbg-[url("/bgdark.svg")]  flex-col`}
      >
        
        <Navbar />
        {/* <div className="bg-white dark:bg-gray-800 shadow-md flex items-center justify-between p-4"> */}
        {/*   <Button>Logo</Button> */}
        {/*   <Button>Cerrar Sesion</Button> */}
        {/* </div> */}
        {/* agregar el bg de figma a main */}
        {/* El suspense es Temporal */}
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        {/* <main className='bg-[#f3f5fb] flex-1 p-8'>{children}</main> */}
        <main className="flex-1 p-8">{children}</main>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
