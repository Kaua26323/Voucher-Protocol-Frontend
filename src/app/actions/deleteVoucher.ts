"use server";

import { getCookieServer } from "@/lib/getCookieServer";
import { api } from "@/services/api";

export async function deleteVoucher( id: string){
  try{
    const token = await getCookieServer();

    if(!token){
      throw new Error("Token invalido!");
    };
    if(!id){
      throw new Error("Id invalido!");
    };

    const response = await api.delete(`/delete-voucher/${id}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    return {success: true, message: response.data.message };

  }catch(err: any){
    console.error(err);
    const message = err.response.data.message || "Erro ao deletar voucher";
    throw new Error(message);
  };
}