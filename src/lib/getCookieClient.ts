import { getCookie } from "cookies-next"


async function getCookieClient(){
  const token = await getCookie("session");

  return token || null;
};

export { getCookieClient };