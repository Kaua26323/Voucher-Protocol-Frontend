import { cookies } from "next/headers";

export async function SaveCookieServer(tokenData: string){
  const expressTime: number =  60 * 60 * 24 * 30 * 1000; //30 dias
  const cookieStore = await cookies();
  cookieStore.set("session", tokenData, {
    maxAge: expressTime,
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production"
  });
}