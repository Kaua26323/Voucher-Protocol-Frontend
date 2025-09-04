import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  type:        string;
  name:        string;
  rules?:      RegisterOptions;
  error?:      string;
  register:    UseFormRegister<any>;
  placeholder: string;
}

export function FormInput({type, name, error, rules, register, placeholder}: FormInputProps){
  return(
    <>
      <input
        type={type}
        id={name}
        {...register(name, rules)}
        placeholder={placeholder}
        className={`w-full bg-white h-11 rounded-3xl ${name === "name" ? "pl-15" : "pl-5"} pt-0.5 placeholder-green-900 text-xl text-black outline-none`}
      />
      {error && <p className="text-red-600 mt-1 pl-3">{error}</p>}
    </>
  )
}