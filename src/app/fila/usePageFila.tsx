import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/UserContext";

type Fila = {
  id: string;
  id_user: string;
  user: string;
};

export function usePageFila() {
  const router = useRouter();
  const [fila, setFila] = useState<Fila[]>([]);

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();

  async function GetQueue() {
    try {
      const response = await api.get("/preservices", {
        headers: {
          Authorization: `Bearer Aex`,
        },
      });
      setFila(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function StartService(id_preservice: string, id_user: string) {
    try {
      const response = await api.post(`/threads`, {
        id_preservice: id_preservice,
        id_user: id_user,
      });
      router.push(`/chats/${response.data.id_thread}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetQueue();
  }, []);

  return {
    fila,
    setFila,
    GetQueue,
    StartService,
  };
}
