import React, { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

import { useAuth } from "../../contexts/UserContext";

export function usePageLogin() {
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
        profile: profile,
        token: response.data.token,
      };
      loginUser(data);
      alert(`Bem vindo(a) ${response.data.name}`);
      router.push("/fila");
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
