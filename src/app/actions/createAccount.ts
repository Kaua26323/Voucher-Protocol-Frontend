"use server";

import { api } from "@/services/api";
import { success } from "zod";

interface AccountProps{
  name:     string;
  email:    string;
  isAdmin:  boolean 
  password: string; 

}

export async function createAccount({name, email, isAdmin, password}: AccountProps){
  try{
    await api.post("/create-user", {
      name,
      email,
      password,
      isAdmin,
    });

    return {success: true, message: "Conta criada com sucesso, faça o login para entrar"};

  }catch(err: any){
    console.error(err);
    const message = err.response.data.message || "Erro ao criar a conta";
    return {success: false, message: message};
    
  }
}