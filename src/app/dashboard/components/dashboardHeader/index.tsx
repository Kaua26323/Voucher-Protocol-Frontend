"use client";

import { CatchErrors } from "@/components/catchErrors";
import { VoucherContext } from "@/providers/voucherContext";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

export function DashboardHeader(){
  const router = useRouter();
  const {checkUserLoggedIn, userInfo} = useContext(VoucherContext);

  useEffect(() => {
    async function isAuthenticated(){
      try{
        await checkUserLoggedIn();

      }catch(err){
        console.error(err);
        CatchErrors(err);
      }
    } 
    isAuthenticated();
  }, []);

  async function handleLogout(){
    deleteCookie("session", {path: "/"});
    toast.success("Logout realizado com sucesso!");
    router.replace("/");
  }

  return(
    <header className="w-full h-16 bg-gradient-to-bl from-yellow-200 to-yellow-400 flex items-center text-black">
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="mx-3 text-2xl md:text-3xl">Voucher-Protocol</h1>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">
            {userInfo?.name}
          </h2>
          <button onClick={handleLogout}
            className="hover:scale-110 hover:text-red-500 duration-300"
          >
            <LogOut  size={30} className="text-red-600"/>
          </button>
        </div>
      </div>
    </header>
  )
}