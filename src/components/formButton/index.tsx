import { Loader } from "lucide-react";

interface FormButtonProps {
  loading: boolean 
  message: string;
}

export function FormButton({loading, message}: FormButtonProps){
  return(
    <button
      type="submit"
      disabled={loading}
      className={`${loading ? "bg-gray-600" : "bg-green-800 hover:scale-102 hover:bg-green-600 duration-300"} h-12 flex items-center justify-center text-xl font-bold rounded`}
    >
      {loading ? (
        <Loader size={30} className="text-white animate-spin"/>
      ): (
        <span>{message }</span>
      )}
    </button>
  )
}