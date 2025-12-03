import { ApiManager } from "../ApiManager/ApiManager";
import { File } from "../interfaces/pdf";

export const downloadExcel = async (token: string, data: File) => {
  try {
    // Enviamos los datos al endpoint que genera el PDF
    const response = await ApiManager.post("/proveedor/excel", data, {
      responseType: "blob", // importante: recibir archivo
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Creamos un blob con la respuesta
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    // Creamos un link temporal y forzamos la descarga
    const link = document.createElement("a");
    link.href = url;

    // Asignamos un nombre dinámico para el archivo
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Liberamos memoria
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error al generar/descargar PDF:", error);
    throw error;
  }
};


export const downloadExcelByProvId = async (token: string, proveedorId: number) => {
    try {
      // Enviamos los datos al endpoint que genera el PDF
      const response = await ApiManager.post(`/proveedor/excel/${proveedorId}`, null, {
        responseType: "blob", // importante: recibir archivo
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // Creamos un blob con la respuesta
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
  
      // Creamos un link temporal y forzamos la descarga
      const link = document.createElement("a");
      link.href = url;
  
      // Asignamos un nombre dinámico para el archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      // Liberamos memoria
      window.URL.revokeObjectURL(url);
  
      return true;
    } catch (error) {
      console.error("Error al generar/descargar PDF:", error);
      throw error;
    }
  };


  export const downloadExcelReport = async (token: string) => {
    try {
      // Enviamos los datos al endpoint que genera el PDF
      const response = await ApiManager.post(`/reports/excel-report`, null, {
        responseType: "blob", // importante: recibir archivo
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // Creamos un blob con la respuesta
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
  
      // Creamos un link temporal y forzamos la descarga
      const link = document.createElement("a");
      link.href = url;
  
      // Asignamos un nombre dinámico para el archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      // Liberamos memoria
      window.URL.revokeObjectURL(url);
  
      return true;
    } catch (error) {
      console.error("Error al generar/descargar PDF:", error);
      throw error;
    }
  };