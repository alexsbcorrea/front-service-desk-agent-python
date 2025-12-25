import { getCookie } from "cookies-next";

export function useToken() {
  function extractToken() {
    const token = getCookie("chat-bp-token");
    if (token) {
      return token;
    }
    return undefined;
  }
  return { extractToken };
}
