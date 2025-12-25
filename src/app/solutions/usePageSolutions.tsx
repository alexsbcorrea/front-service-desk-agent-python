import React, { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useToken } from "../../services/useToken";
import { Socket, io } from "socket.io-client";
import { URL } from "../../services/api";
import { getCookie } from "cookies-next";

import { useAuth } from "../../contexts/UserContext";

export function usePageSolutions() {
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
        room: `bp-chat-solutions`,
        id: id,
        name: name,
        email: email,
        profile: profile,
      },
    });

    socketRef.current.on(`event`, (data) => {
      alert("Evento");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
  const { extractToken } = useToken();
  const router = useRouter();

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();

  const [initialMsg, setInitialMsg] = useState("");

  async function StartService() {
    try {
      const response = await api.post(
        "/preservices",
        { id_user: userInfo?.id, initial_msg: initialMsg },
        {
          headers: {
            Authorization: `Bearer ${extractToken()}`,
          },
        }
      );
      router.push(`/atendimento/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  return {
    initialMsg,
    setInitialMsg,
    StartService,
  };
}
