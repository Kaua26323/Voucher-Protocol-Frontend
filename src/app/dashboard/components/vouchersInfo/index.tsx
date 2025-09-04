"use client";

import { VoucherContext } from "@/providers/voucherContext";
import { VouchersProps } from "@/types/voucher.type";
import { useContext } from "react";

interface VoucherInfo{
  voucher: VouchersProps
}

export function VoucherInfo({ voucher }: VoucherInfo){
  const {changeModalInfo} = useContext(VoucherContext);

  async function showModalInfo(){
    changeModalInfo(voucher);
  }

  return(
    <section key={voucher.id} className="border-b-1 border-gray-500 mb-1">
      <button
        onClick={showModalInfo}
        className="hover:font-bold hover:text-gray-400 duration-300"
      >
        <div></div>
        <span className="text-[18px] sm:text-xl">
          Dia - {new Date(voucher.date).toLocaleDateString("pt-br")} - {voucher.isComplete ? ("Completo") : ("incompleto")}
        </span>
      </button>  
    </section>
  )
}