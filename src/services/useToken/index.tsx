import { getCookie } from "cookies-next";

export function useToken() {
  function extractToken(chave: string = "userInfo") {
    const token = getCookie("authTokenKB");
    if (token) {
      return token;
    }
    return undefined;
  }
  return { extractToken };
}
