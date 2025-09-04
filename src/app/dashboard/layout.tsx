import { ReactNode } from "react";
import { DashboardHeader } from "./components/dashboardHeader";
import { VoucherProvider } from "@/providers/voucherContext";

export default function DashboardLayout({ children }: { children: ReactNode }){
  return(
    <>
      <DashboardHeader/>
      {children}
    </>
  )
}