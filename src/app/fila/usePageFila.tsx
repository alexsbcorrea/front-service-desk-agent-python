import React, { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/UserContext";
import { Socket, io } from "socket.io-client";
import { URL } from "../../services/api";
import { getCookie } from "cookies-next";
import { useToken } from "../../services/useToken";

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
  const { extractToken } = useToken();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const token = getCookie("chat-bp-token");
    const id = getCookie("chat-bp-id");
    const name = getCookie("chat-bp-name");
    const email = getCookie("chat-bp-email");
    const profile = getCookie("chat-bp-profile");

    socketRef.current = io(URL, {
      reconnectionDelayMax: 10000,
      query: {
        token: token,
        room: `bp-chat-fila`,
        id: id,
        name: name,
        email: email,
        profile: profile,
      },
    });

    socketRef.current.on(`new_preservice`, (data) => {
      GetQueue();
    });

    return () => {
      socketRef.current?.off("new_preservice");
      socketRef.current?.disconnect();
    };
  }, []);
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
          Authorization: `Bearer ${extractToken()}`,
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

  async function CancelService(id_preservice: string) {
    try {
      const response = await api.put(`/preservices/cancel/${id_preservice}`, {
        active: false,
      });
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
    CancelService,
  };
}
