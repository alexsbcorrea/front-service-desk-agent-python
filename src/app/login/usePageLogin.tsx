import React, { useState } from "react";
import { api } from "@/services/api";

import { useAuth } from "../../contexts/UserContext";

export function usePageLogin() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();

  async function Login() {
    try {
      // const response = await api.post(
      //   "/messages",
      //   { content, id_user: idUser, id_threads: idThead },
      //   {
      //     headers: {
      //       Authorization: `Bearer Aex`,
      //     },
      //   }
      // );
      const data = {
        id: id,
        name: name,
        email: email,
        profile: "operador",
        token: "123",
      };
      loginUser(data);
      alert(`Bem vindo(a) ${name}`);
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
    Login,
  };
}
