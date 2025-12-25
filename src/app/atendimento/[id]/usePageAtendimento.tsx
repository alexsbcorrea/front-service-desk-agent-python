import React, { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/UserContext";
import { Socket, io } from "socket.io-client";
import { URL } from "../../../services/api";
import { getCookie } from "cookies-next";
import { useToken } from "../../../services/useToken";

type Fila = {
  id: string;
  id_user: string;
  user: string;
  initial_msg: string;
  profile: string;
  created_at: string;
  updated_at: string;
};

type PreService = {
  id: string;
  active: boolean;
  initial_msg: string;
  id_user: string;
  user: string;
};

export function usePageAtendimento() {
  const { id } = useParams();
  const { extractToken } = useToken();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const token = getCookie("chat-bp-token");
    const id_user = getCookie("chat-bp-id");
    const name = getCookie("chat-bp-name");
    const email = getCookie("chat-bp-email");
    const profile = getCookie("chat-bp-profile");

    socketRef.current = io(URL, {
      reconnectionDelayMax: 10000,
      query: {
        token: token,
        room: `bp-chat-atendimento-${id}`,
        id: id_user,
        name: name,
        email: email,
        profile: profile,
      },
    });

    socketRef.current.on(`start_thread`, (data) => {
      router.push(`/chats/${data.id_thread}`);
    });

    socketRef.current.on(`cancel_preservice`, (data) => {
      router.push(`/solutions`);
    });

    return () => {
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
  const [preservice, setPreservice] = useState<PreService>();

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();

  async function GetPreService() {
    try {
      const response = await api.get(`/preservices/${id}`, {
        headers: {
          Authorization: `Bearer ${extractToken()}`,
        },
      });
      setPreservice(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function CancelService() {
    try {
      const response = await api.put(`/preservices/cancel/${id}`, {
        active: false,
      });
      router.push(`/solutions`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetPreService();
  }, []);

  return {
    fila,
    setFila,
    GetPreService,
    CancelService,
    currentTime,
    preservice,
  };
}
