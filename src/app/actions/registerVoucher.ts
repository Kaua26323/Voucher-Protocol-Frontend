"use server"

import { getCookieServer } from "@/lib/getCookieServer";
import { api } from "@/services/api";

interface RegisterVoucherProps {
  data:        string;
  isComplete:  boolean;
  type:        string;
  description: string | undefined;
  lastUser:    string;
}

export async function registerVoucher({data, isComplete, type, description, lastUser}: RegisterVoucherProps){
  
  try{ 
    const token = await getCookieServer();

    if(!token){
      throw new Error("Valores invalidos...");

    }

    if(!data || !type || !lastUser){
      throw new Error("Valores invalidos...");
    }

    const response = await api.post("/register-voucher",{
      data,
      type,
      isComplete,
      description,
      lastUser,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return {success: true, message: response.data.message };

  }catch(err: any){
    console.error(err);
    const message = err.response.data.message || "Erro ao protocolar voucher";
    throw new Error(message);
  }
}