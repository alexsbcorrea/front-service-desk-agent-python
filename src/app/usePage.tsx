import React, { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Conversation {
  id: string;
  content: string;
  id_threads: string;
  id_user: string;
}

export function usePage() {
  const [conversation, setConversation] = useState<Conversation[]>([]);

  useEffect(() => {}, []);

  const currentUser = "8e9de819c7134c9096f73620474df7c0";

  async function GetConversation() {
    try {
      const response = await api.get(
        "/conversation/f0a4ee50571e4c6a8214190425c5c473",
        {
          headers: {
            Authorization: `Bearer Aex`,
          },
        }
      );

      setConversation(response.data.content);
      console.log("VALIDAÇÃO");
      console.log(conversation);
    } catch (error) {
      console.log(error);
    }
  }
  return { conversation, setConversation, GetConversation, currentUser };
}
