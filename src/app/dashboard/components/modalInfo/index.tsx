"use client"

import { deleteVoucher } from "@/app/actions/deleteVoucher";
import { CatchErrors } from "@/components/catchErrors";
import { VoucherContext } from "@/providers/voucherContext";
import { clientFeedback } from "@/services/clientFeedback";
import { VouchersProps } from "@/types/voucher.type";
import { Trash2, X } from "lucide-react";
import { useContext } from "react";

interface ModalInfoProps {
  voucher: VouchersProps;
}

export function ModalInfo({ voucher }: ModalInfoProps ){ 
  const {changeModalInfo, getVouchers} = useContext(VoucherContext);

  function handleCloseModalInfo(){
    changeModalInfo();
  }

  async function handleDelete(){
    try{
      const response = await deleteVoucher(voucher.id); 
      clientFeedback({success: response.success, message: response.message});
      
    } catch(err){
      console.error(err);
      CatchErrors(err);
      
    } finally {
      await getVouchers();
      changeModalInfo();
    }
  }

  return(
    <div className="fixed left-0 top-0 w-full h-full bg-black/20 z-50 overflow-auto flex justify-center items-center backdrop-blur-sm">
      <div className="relative bg-green-950 w-full max-w-xl m-auto p-4 rounded-md">
        <section className="flex flex-col gap-1.5">

         <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-medium md:text-2xl">Detalhes do voucher</h1>

          <div className="flex items-center gap-3">

            <button onClick={handleDelete}
              className="text-red-500 hover:scale-115 duration-300"
            >
             <Trash2 size={30}/>
            </button>

            <button onClick={handleCloseModalInfo}
              className="hover:scale-115 hover:text-red-600 duration-300">
              <X size={35}/>
            </button>
          </div>
         </div>
        

         <h2 className="sm:text-xl"><strong>Voucher:</strong> {voucher.type}</h2>
         <h2 className="sm:text-xl"><strong>Data:</strong> {voucher.date}</h2>
         <h2 className="sm:text-xl"><strong>Status:</strong> {voucher.isComplete ? ("Completo") : ("incompleto")}</h2>
         
          
         {voucher.description && (
          <div className="flex flex-col gap-1">
            <h2 className="sm:text-xl"><strong>Descrição:</strong></h2> 
            <p className="bg-white text-gray-700 p-2 rounded">
              {voucher.description}
            </p> 
          </div>
         )} 

         <div className="border-b-[1px] border-gray-500 my-3"></div>

         <h3 className="text-gray-400">Ultimo usuário: {voucher.lastUser}</h3>
        </section>
      </div>
    </div>
  )
}