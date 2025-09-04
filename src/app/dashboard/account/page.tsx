"use client"

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserRoundPlus } from "lucide-react";
import { CatchErrors } from "@/components/catchErrors";
import { FormInput } from "@/components/formInput";
import { createAccount } from "@/app/actions/createAccount";
import { useRouter } from "next/navigation";
import { FormButton } from "@/components/formButton";
import { useState } from "react";
import { clientFeedback } from "@/services/clientFeedback";
import Link from "next/link"; 


const schema = z.object({
  userName:  z.string().min(1, "Digite seu nome"),
  email:     z.string().min(1, "Digite seu e-mail"),
  password:  z.string().min(6, "Digite sua sua senha"),
  isAdmin:   z.enum(["true", "false", ""]).refine(
    (val) => val !== "", {
      message: "Preencha qual autorização o usuário vai ter",
    }
  )
});

type formData = z.infer<typeof schema>;

export default function Account(){
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isAdmin: "",
    }
  });

  async function handleCreateAccount(data: formData){
    setIsPending(true);

    try{
      let isAdminToBoolean = false;

      if(data.isAdmin === "true"){
        isAdminToBoolean = true;
      }

      const response = await createAccount({
        name: data.userName,
        email: data.email.toLowerCase(),
        isAdmin: isAdminToBoolean,
        password: data.password,
      });

      clientFeedback({success: response.success, message: response.message});
      
    }catch(err){
      console.error(err);
      CatchErrors(err);
      
    } finally {
      setIsPending(false);
    }
  }

  return(
    <main className="w-full min-h-[calc(100dvh-4rem)] flex justify-center items-center">
      <div className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-xl shadow-lg w-96  px-5 py-8">
        
        <div className="absolute bg-green-900 w-32 h-32 -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-full">
          <UserRoundPlus size={50} className="text-white"/>
        </div>
          
          <form
            onSubmit={handleSubmit(handleCreateAccount)}
            className="w-full flex flex-col gap-4 mt-5"
          >
            <h1 className="mt-3 text-center font-bold text-2xl sm:text-3xl">Cria sua conta</h1>
            <article className="flex flex-col justify-center">
              <label className="font-bold text-2xl pl-3">Nome:</label>              
              <FormInput
                type="text"
                name="userName"
                register={register}
                error={errors.userName?.message}
                placeholder="Digite seu nome..."
              />
            </article>

            <article className="flex flex-col justify-center">
              <label className="font-bold text-2xl pl-3">E-mail:</label>

              <FormInput
                type="email"
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder="Senha"
              />
            </article>

            <article className="flex flex-col justify-center">
              <label className="font-bold text-2xl pl-3">Senha:</label>

              <FormInput
                type="password"
                name="password"
                register={register}
                error={errors.password?.message}
                placeholder="Digite sua senha"
              />
            </article>

            <article className="flex flex-col justify-center gap-1">
              <label className="font-bold text-2xl pl-3">Autorização do Usuário:</label>

              <select {...register("isAdmin")}
                className="p-1.5 text-center rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled defaultValue="">Selecione...</option>
                <option value="true">Admin</option>
                <option value="false">Client</option>
              </select>
              {errors.isAdmin && <p className="text-red-700 font-bold mt-1">{errors.isAdmin.message}</p>}
            </article>

            <FormButton loading={isPending} message="Cadastrar"/>
          </form>

          <h2 className="text-xl mt-2">
            Já criou a conta? <Link href="/" className="text-blue-700 hover:text-blue-600 hover:font-bold duration-500">Fazer login</Link>
          </h2>
      </div>
    </main>
  )
}