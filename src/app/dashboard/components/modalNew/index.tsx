"use client"
import { registerVoucher } from "@/app/actions/registerVoucher";
import { CatchErrors } from "@/components/catchErrors";
import { FormButton } from "@/components/formButton";
import { VoucherContext } from "@/providers/voucherContext";
import { clientFeedback } from "@/services/clientFeedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound, X } from "lucide-react"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod"

const schema = z.object({
  data:        z.string().min(1, "Coloque a data do protocolo"),

  isComplete:  z.enum(["Completo", "Incompleto", ""]).refine(
    (val) => val !== "", {
      message: "Selecione o status do vouhcer",
    }
  ),

  voucherType: z.enum(["Day_use", "Hospedagem", ""]).refine(
    (val) => val !== "", {
      message: "Selecione o tipo do vouhcer"
    }
  ),
  description: z.string().optional(),
});

type formData = z.infer<typeof schema>;

export function NewVoucherModal(){
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { onRequestClose, userInfo, getVouchers } = useContext(VoucherContext);
  const {register, handleSubmit, formState: { errors }} = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
     isComplete: "",
     voucherType: "", 
    }
  });

  function handleCloseModal(){
    onRequestClose();
  };

  async function createNewProtocol(data: formData){
    setIsPending(true);

    try{

      if(!userInfo?.name){
        clientFeedback({success: false, message: "Usuário invalido!"});
        router.replace("/");
        return;
      };

      let isCompleteToBoolean = false;

      if(data.isComplete === "Completo"){
        isCompleteToBoolean = true;
      };

      const response = await registerVoucher({
        data: data.data,
        isComplete: isCompleteToBoolean,
        type: data.voucherType,
        description: data.description,
        lastUser: userInfo?.name,
      });
    
      clientFeedback({success: response.success, message: response.message});
      onRequestClose();
      
    }catch(err) {
      console.error(err);
      CatchErrors(err);
      
    } finally {
      await getVouchers();
      setIsPending(false);
    }
  }
  
  return(
    <div
      className="fixed left-0 top-0 w-full h-full bg-black/10 z-50 overflow-auto flex justify-center items-center px-4 backdrop-blur-sm">
      <div className="relative bg-green-950 w-full max-w-xl m-auto p-4 rounded-md">
        
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl">Protocolar voucher</h1>

          <button onClick={handleCloseModal}
            className="hover:scale-110 hover:text-red-600 duration-300">
            <X size={30}/>
          </button>
        </div>

        <form 
          onSubmit={handleSubmit(createNewProtocol)}
          className="flex flex-col gap-3 mt-5"
        >
          <article className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2.5">
              <label className="text-xl font-bold">Data:</label>
              <input
                type="date"
                {...register("data")}
                className="bg-white text-black px-3 py-1 outline rounded"
              />
            </div>
            {errors.data?.message && <p className="text-red-600">{errors.data.message}</p>}
          </article>

          <article className="flex flex-col my-1">
            <label className="text-xl font-bold">Status:</label>

            <div className="flex items-center gap-3">
              <label className="flex gap-1 items-center">
                <input
                  type="radio"
                  value="Completo"
                  {...register("isComplete")}
                  className=""
                />
                Completo
              </label>

              <label className="flex gap-1 items-center">
                <input
                  type="radio"
                  value="Incompleto"
                  {...register("isComplete")}
                  className=""
                />
                Incompleto
              </label>
            </div>
            {errors.isComplete && <p className="text-red-600">{errors.isComplete?.message}</p>}
          </article>

          <article className="flex flex-col justify-center mb-1">
            <div className="flex items-center gap-2">
              <label className="text-xl font-bold">Tipo do voucher:</label>
              <select
                {...register("voucherType")}
                className="p-1.5 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled defaultValue="">Selecione...</option>
                <option value="Day_use">Day use</option>
                <option value="Hospedagem">Hospedagem</option>
              </select>
            </div>
              {errors.voucherType && <p className="text-red-600" >{errors.voucherType.message}</p>}
          </article>

          <article className="w-full">
            <textarea 
              {...register("description")}
              placeholder="Observações..."
              className="w-full bg-white h-20 text-black px-2 py-1 rounded resize-none outline">
            </textarea>
          </article>

          <div className="border-b-1"></div>

          <h1 className="flex items-center gap-1 mb-2 text-gray-400">
            <UserRound size={25} className="pb-1"/>Usuário: {userInfo?.name}
          </h1>

          <FormButton loading={isPending} message="Protocolar"/>
        </form>
      </div>  
    </div>
  )
}