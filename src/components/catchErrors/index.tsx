"use client";

import { toast } from "sonner";

export function CatchErrors(err: any){
  if(err.response){
    const message = err.response.data?.message || "Erro do servidor";
    toast.error(message);

  } else if(err.request){
    toast.error("Servidor não respondeu. Verifique sua conexão");

  } else if(err instanceof Error){
    toast.error(err.message);

  } else {
    toast.error("Ocorreu um erro inesperado.");
  };
}
