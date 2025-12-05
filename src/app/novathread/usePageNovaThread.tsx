import React, { useState } from "react";
import { api } from "@/services/api";

export function usePageNovaThread() {
  const [incident, setIncident] = useState<string>("");

  async function CreateThread() {
    try {
      const response = await api.post(
        "/threads",
        { incident },
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
  return { incident, setIncident, CreateThread };
}
