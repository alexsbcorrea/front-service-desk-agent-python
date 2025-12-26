import React, { useEffect, useRef, useState } from "react";
import { api } from "@/services/api";
import { io, Socket } from "socket.io-client";
import { URL } from "../../../services/api";
import { useParams, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../../../services/useToken";

import { useAuth } from "../../../contexts/UserContext";

type Thread = {
  id: string;
  incident: string;
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
  created_at: string;
  updated_at: string;
}

export function usePageChats() {
  const { extractToken } = useToken();
  const router = useRouter();
  const { id } = useParams();

  const socketRef = useRef<Socket | null>(null);

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
        Authorization: `Bearer ${extractToken()}`,
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

  //USE QUERY
  async function GetConversation() {
    const response = await api.get(`/threads/${id}`, {
      headers: {
        Authorization: `Bearer ${extractToken()}`,
      },
    });
    return response;
  }
  //USE QUERY
  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    refetch: refetchData2,
  } = useQuery({
    queryFn: async () => await GetConversation(),
    queryKey: [`chat-${id}`], //Array according to Documentation
    refetchOnWindowFocus: false,
  });
  //USE QUERY
  useEffect(() => {
    if (data2) {
      setConversation(data2.data.messages);
    }
  }, [data2]);
  //USE QUERY

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
            Authorization: `Bearer ${extractToken()}`,
          },
        }
      );
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  async function CreateMessageSocket() {
    if (content.length == 0) {
      alert("Você não digitou nada para enviar.");
      return;
    }
    try {
      socketRef.current?.emit("new_message", {
        content: content,
        id_sender: userInfo?.id,
        name: userInfo?.name,
        id_thread: id,
        type_sender: userInfo?.profile,
        room: `bp-chat-${id}`,
      });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  //SETUP DE MENSAGENS

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
        room: `bp-chat-${id}`,
        id: id_user,
        name: name,
        email: email,
        profile: profile,
      },
    });

    socketRef.current.on(`new_message`, (data) => {
      setConversation((chatAnterior) => [...chatAnterior, data]);
    });

    // newSocket.on(`message-${id}`, () => {
    //   refetchArticle();
    // });

    // newSocket.on(`logoff-${idUser}`, () => {
    //   Logout();
    // });

    return () => {
      socketRef.current?.off("new_message");
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
