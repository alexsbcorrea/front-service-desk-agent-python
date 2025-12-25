import React, { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

import { useAuth } from "../../contexts/UserContext";
import { useFlashMessage } from "../../utils/useFlashMessage/useFlashMessage";

export function usePageLogin() {
  const { setFlashMessage } = useFlashMessage();
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();

  async function Login() {
    try {
      const response = await api.post(
        "/users/login",
        { email },
        {
          headers: {
            Authorization: `Bearer`,
          },
        }
      );

      const data = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        profile: response.data.profile,
        token: response.data.token,
      };
      loginUser(data);
      setCookie("chat-bp-id", response.data.id);
      setCookie("chat-bp-name", response.data.name);
      setCookie("chat-bp-email", response.data.email);
      setCookie("chat-bp-profile", response.data.profile);
      setCookie("chat-bp-token", response.data.token);
      //setFlashMessage("success", `Bem vindo(a) ${name}`, 5000);
      router.push("/solutions");
    } catch (error) {
      console.log(error);
    }
  }
  return {
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    profile,
    setProfile,
    Login,
  };
}
