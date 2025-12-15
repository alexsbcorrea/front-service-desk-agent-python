import React, { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

import { useAuth } from "../../contexts/UserContext";

export function usePageSolutions() {
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
            Authorization: `Bearer`,
          },
        }
      );
      router.push("/fila");
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
