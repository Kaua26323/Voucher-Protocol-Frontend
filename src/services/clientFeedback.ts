"use client";

import { toast } from "sonner";

interface ClientFeedbackProps {
  success: boolean
  message: string;
}

export function clientFeedback({success, message}: ClientFeedbackProps): null {

  if(success === true){
    toast.success(message);

  } else {
    toast.error(message); 
  }

  return null;
}