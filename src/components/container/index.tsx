
import { ReactNode } from "react";


export function Container( {children}:{ children: ReactNode} ){
  return(
    <main className="w-full max-w-4xl min-h-[calc(100dvh-4rem)] mx-auto px-3"> 
      { children }
    </main>
  )
}