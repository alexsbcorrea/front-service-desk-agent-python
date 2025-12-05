import React, { useState } from "react";
import { api } from "@/services/api";

export function usePageNovoUsuario() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function CreateUser() {
    try {
      const response = await api.post(
        "/users",
        { name, email },
        {
          headers: {
            Authorization: `Bearer Aex`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return { name, setName, email, setEmail, CreateUser };
}
