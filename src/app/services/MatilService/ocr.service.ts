import { ApiManager } from "../ApiManager/ApiManager";
// import { ApiManagerColaboradores } from "../ApiManager/ApiManagerColaboradores";

export const subirYProcesarDocumento = async (token :string, file: File, name: string, type: number, userId: string) => {
  try {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("Name", name);
    formData.append("Type", type.toString());
    formData.append("UserId", userId);

    const response = await ApiManager.post("/files/upload-and-process", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al subir y procesar documento:", error);
    throw error;
  }
};
