import React, { useEffect, useState } from "react";
import { api } from "@/services/api";

import { useAuth } from "../../../contexts/UserContext";

type Thread = {
  id: string;
  id_preservice: string;
  id_user: string;
  created_at: string;
  updated_at: string;
  name: string;
};

interface Conversation {
  id: string;
  content: string;
  id_threads: string;
  id_user: string;
  name: string;
}

export function usePageChats() {
  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [conversation, setConversation] = useState<Conversation[]>([]);

  //SETUP DE MENSAGENS
  const [content, setContent] = useState<string>("");
  const [idUser, setIdUser] = useState<string>(userInfo?.id || "");
  const [idThead, setIdThread] = useState<string>("");
  //SETUP DE MENSAGENS

  async function GetThreads() {
    try {
      const response = await api.get("/threads", {
        headers: {
          Authorization: `Bearer Aex`,
        },
      });
      setThreads(response.data);
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

      setConversation(response.data.messages);
      alert("sucesso");
      console.log("VALIDAÇÃO");
      console.log(conversation);
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
        { content, id_user: idUser, id_thread: idThead },
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
  //SETUP DE MENSAGENS

  useEffect(() => {
    GetThreads();
  }, []);

  return {
    threads,
    setThreads,
    conversation,
    content,
    setContent,
    idUser,
    setIdUser,
    idThead,
    setIdThread,
    setConversation,
    GetThreads,
    GetConversation,
    CreateMessage,
  };
}
