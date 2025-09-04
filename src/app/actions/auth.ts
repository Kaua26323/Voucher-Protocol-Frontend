"use server"

import { cookies } from "next/headers";
import { api } from "@/services/api";

interface LoginProps{
  name:     string;
  password: string;
}

export async function Login({name, password}: LoginProps){
  try{
    const response = await api.post("/login", {
      name,
      password,
    });

    if(!response.data.token){    
      return {success: false, message: "Token invalido!"}
    };
    
    const expressTime: number = 60 * 60 * 24 * 30 * 1000;
    const cookieStore = await cookies();
    cookieStore.set("session", response.data.token, {
      maxAge: expressTime,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production"
    });

    return {success: true, message: "Login feito com sucesso!"};

  }catch(err: any){
    const message = err.response?.data?.message || "Erro ao logar";
    return {success: false, message};
  }
}
