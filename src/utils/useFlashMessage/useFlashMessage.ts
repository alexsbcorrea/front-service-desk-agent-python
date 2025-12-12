import bus from "./bus";

export function useFlashMessage() {
  function setFlashMessage(
    type: "success" | "error" | "warning",
    message: string,
    time: number
  ) {
    bus.emit("flash", {
      type: type,
      message: message,
      time: time,
    });
    console.log("Evento emitido com sucesso.");
  }
  return { setFlashMessage };
}
