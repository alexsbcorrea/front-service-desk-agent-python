import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { io } from "socket.io-client";
import { URL } from "../../../services/api";
import { useParams, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

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
  const router = useRouter();
  const { id } = useParams();

  const { userInfo, authenticated, loginUser, logoutUser } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [conversation, setConversation] = useState<Conversation[]>([]);

  //SETUP DE MENSAGENS
  const [content, setContent] = useState<string>("");
  const [idUser, setIdUser] = useState<string>(userInfo?.id || "");
  const [profile, setProfile] = useState<string>(userInfo?.profile || "");
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
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  //SETUP DE MENSAGENS

  useEffect(() => {
    GetThreads();
    if (id) {
      GetConversation(String(id));
    }
  }, []);

  useEffect(() => {
    const userName = userInfo?.name; //getCookie("authUser");
    const idUser = userInfo?.id; //getCookie("idUser");
    const newSocket = io(URL, {
      reconnectionDelayMax: 10000,
      // auth: {
      //   token: "123456",
      //   room: `edit-article-`,
      //   roomMain: `KBUsers`,
      //   id: idUser ? idUser : "ID",
      //   user: userName ? userName : "Usuário Desconhecido",
      // },
    });

    // newSocket.on("roomList", (data) => {
    //   setRoomList(data);
    // });

    // newSocket.on(`update-${id}`, () => {
    //   refetchArticle();
    // });

    // newSocket.on(`logoff-${idUser}`, () => {
    //   Logout();
    // });

    // return () => {
    //   newSocket.disconnect();
    // };
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
  };
}
