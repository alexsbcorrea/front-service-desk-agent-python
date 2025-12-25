import React, { useState } from "react";
import { api } from "@/services/api";
import { useToken } from "../../services/useToken";

import { useFlashMessage } from "../../utils/useFlashMessage/useFlashMessage";

export function usePageNovoOperador() {
  const { extractToken } = useToken();
  const { setFlashMessage } = useFlashMessage();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function CreateUser() {
    try {
      const response = await api.post(
        "/operators",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${extractToken()}`,
          },
        }
      );
      setFlashMessage(
        "success",
        `O usuário ${name} foi criado com sucesso.`,
        5000
      );
    } catch (error) {
      console.log(error);
    }
  }

  return { name, setName, email, setEmail, CreateUser };
}
