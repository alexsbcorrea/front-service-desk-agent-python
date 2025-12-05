import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { io } from "socket.io-client";
import { URL } from "../../services/api";
import { getCookie, deleteCookie } from "cookies-next";

export function usePageNovaMSG() {
  const [content, setContent] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  const [idThead, setIdThread] = useState<string>("");

  async function CreateMessage() {
    try {
      const response = await api.post(
        "/messages",
        { content, id_user: idUser, id_threads: idThead },
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

  useEffect(() => {
    const userName = getCookie("authUser");
    const idUser = getCookie("idUser");
    const newSocket = io(URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token: "123456",
      },
      query: {
        room: `edit-article-`,
        roomMain: `KBUsers`,
        id: idUser ? idUser : "ID",
        user: userName ? userName : "Usuário Desconhecido",
      },
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
    content,
    setContent,
    idUser,
    setIdUser,
    idThead,
    setIdThread,
    CreateMessage,
  };
}
