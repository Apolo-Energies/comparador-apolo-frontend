import { ApiManager } from "../ApiManager/ApiManager";
// import { ApiManagerColaboradores } from "../ApiManager/ApiManagerColaboradores";

interface AskResponse {
  result: string;
}

export const enviarMensajeChatbot = async (mensaje: string): Promise<AskResponse> => {
  try {
    const response = await ApiManager.post<AskResponse>("/boot/ask", {
      message: mensaje 
    });

    return response.data;
  } catch (error) {
    console.error("Error al enviar mensaje al chatbot:", error);
    throw error;
  }
};
