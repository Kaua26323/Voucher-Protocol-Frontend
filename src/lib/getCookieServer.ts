import { cookies } from "next/headers";

async function getCookieServer(){
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  return token || null
};

export { getCookieServer };