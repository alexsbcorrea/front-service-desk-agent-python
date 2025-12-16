import React, { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import { io, Socket } from "socket.io-client";
import { URL } from "../../../services/api";
import { useParams, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../../contexts/UserContext";

type Thread = {
  id: string;
  id_preservice: string;
  id_user: string;
  id_operator: string;
  created_at: string;
  updated_at: string;
  user: string;
  operator: string;
};

interface Conversation {
  id: string;
  content: string;
  id_thread: string;
  id_user: string;
  name: string;
  profile: string;
}

export function usePageChats() {
  const router = useRouter();
  const { id } = useParams();

  const socketRef = useRef<Socket | null>(null);

  const [CONVERSATEMP, SETCONVERSATEMP] = useState<Conversation[]>([]);

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [conversation, setConversation] = useState<Conversation[]>([]);

  //SETUP DE MENSAGENS
  const [content, setContent] = useState<string>("");
  const [idUser, setIdUser] = useState<string>(userInfo?.id || "");
  const [profile, setProfile] = useState<string>(userInfo?.profile || "");
  const [idThead, setIdThread] = useState<string>("");
  //SETUP DE MENSAGENS

  //USE QUERY
  async function GetThreads() {
    const response = await api.get("/threads", {
      headers: {
        Authorization: `Bearer Aex`,
      },
    });
    return response;
  }
  //USE QUERY
  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    refetch: refetchData1,
  } = useQuery({
    queryFn: async () => await GetThreads(),
    queryKey: ["minhas-conversas"], //Array according to Documentation
    refetchOnWindowFocus: false,
  });
  //USE QUERY
  useEffect(() => {
    if (data1) {
      setThreads(data1.data);
    }
  }, [data1]);
  //USE QUERY

  async function StartService(id_preservice: string, id_user: string) {
    try {
      const response = await api.post(`/threads`, {
        id_preservice: id_preservice,
        id_user: id_user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function GetConversation(id: string) {
    // setIdThread(String(id));
    try {
      const response = await api.get(`/threads/${id}`, {
        headers: {
          Authorization: `Bearer Aex`,
        },
      });
      router.push(`/chats/${id}`);
      setConversation(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateMessage() {
    try {
      if (content.length == 0) {
        alert("Você não digitou nada para enviar.");
        return;
      }
      const response = await api.post(
        "/messages",
        {
          content,
          id_sender: userInfo?.id,
          id_thread: id,
          type_sender: userInfo?.profile,
        },
        {
          headers: {
            Authorization: `Bearer Aex`,
          },
        }
      );
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  async function CreateMessageSocket() {
    try {
      socketRef.current?.emit("new_message", {
        content: content,
        id_sender: userInfo?.id,
        name: userInfo?.name,
        id_thread: id,
        type_sender: userInfo?.profile,
        room: `chat-${id}`,
      });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  //SETUP DE MENSAGENS

  useEffect(() => {
    if (id) {
      GetConversation(String(id));
    }
  }, []);

  useEffect(() => {
    const userName = userInfo?.name; //getCookie("authUser");
    const idUser = userInfo?.id; //getCookie("idUser");

    socketRef.current = io(URL, {
      reconnectionDelayMax: 10000,
      query: {
        token: "123456",
        room: `bp-chat-${id}`,
        id: userInfo?.id,
        name: userInfo?.name,
        email: userInfo?.email,
        profile: userInfo?.profile,
      },
    });

    socketRef.current.on(`chat-${id}`, (data) => {
      console.log(data);
    });

    // newSocket.on(`message-${id}`, () => {
    //   refetchArticle();
    // });

    // newSocket.on(`logoff-${idUser}`, () => {
    //   Logout();
    // });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return {
    threads,
    setThreads,
    conversation,
    content,
    setContent,
    idUser,
    setIdUser,
    profile,
    setProfile,
    idThead,
    setIdThread,
    setConversation,
    GetThreads,
    GetConversation,
    CreateMessage,
    CreateMessageSocket,
  };
}
