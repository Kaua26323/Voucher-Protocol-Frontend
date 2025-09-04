"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, User, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Login } from "./actions/auth";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/formInput";
import { CatchErrors } from "@/components/catchErrors";
import { useState } from "react";
import { clientFeedback } from "@/services/clientFeedback";
import { FormButton } from "@/components/formButton";

const schema = z.object({
  name: z.string().min(1, "Digite seu nome"),
  password: z.string().min(1, "Digite sua senha para entrar"),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const {register, handleSubmit, setError, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data: FormData){
    setIsPending(true);
    
    try{  
      const result = await Login({
        name: data.name,
        password: data.password,
      });
      
      if(!result.success){
        setError("name", {type: "manual", message: result.message});
        setError("password", {type: "manual", message: result.message});
        return;
      }
      
      clientFeedback({success: result.success, message: result.message});
      router.replace("/dashboard");

    }catch(err: any ){
      console.error(err);
      CatchErrors(err);
      return;
      
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-xl shadow-lg w-96  px-5 py-8">
        
        <div className="absolute bg-green-900 w-32 h-32 -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-full">
          <UserRound size={50} className="text-white"/>
        </div>
          
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex flex-col gap-5 mt-5"
          >
            <article className="relative mt-8">
              <div className="absolute bg-green-800 w-14 h-14 -top-2 -left-1 flex justify-center items-center p-1 rounded-full">
                <User size={30} className="text-white"/>
              </div>
              <FormInput
                type="text"
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="Usuário"
              />
            </article>

            <article className="relative">
              <div className="absolute bg-green-800 w-14 h-14 -top-1.5 left-75 flex justify-center items-center p-1 rounded-full">
                <LockKeyhole size={30} className="text-white"/>
              </div>

              <FormInput
                type="password"
                name="password"
                register={register}
                error={errors.password?.message}
                placeholder="Senha"
              />
            </article>

            <FormButton loading={isPending} message="Login"/>
          </form>
      </div>
    </main>
  );
}
