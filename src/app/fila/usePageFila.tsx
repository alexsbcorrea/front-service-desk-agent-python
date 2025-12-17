import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/UserContext";

type Fila = {
  id: string;
  id_user: string;
  user: string;
  initial_msg: string;
  profile: string;
  created_at: string;
  updated_at: string;
};

export function usePageFila() {
  //SETUP TIME UPDATE
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 60000); // Atualiza a cada 60000 milissegundos (1 minuto)

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);
  //SETUP TIME UPDATE
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

  async function StartService(
    id_preservice: string,
    id_user: string,
    profile: string,
    initial_msg: string
  ) {
    try {
      const response = await api.post(`/threads`, {
        id_preservice: id_preservice,
        id_user: id_user,
        id_operator: userInfo?.id,
        content: initial_msg,
        id_sender: id_user,
        type_sender: profile,
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
    currentTime,
  };
}
