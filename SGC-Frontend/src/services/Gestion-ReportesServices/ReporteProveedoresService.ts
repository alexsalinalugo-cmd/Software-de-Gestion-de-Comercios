import type { ReporteProveedores } from "../../pages/interfaces/reporteproveedores";

const API_URL = "http://localhost:3000/api/reportes/proveedores";

export class ReporteProveedoresService {
  static async ObtenerReporte(periodo: string): Promise<ReporteProveedores> {
    const res = await fetch(`${API_URL}?periodo=${periodo}`);
    if (!res.ok) throw new Error("Error al obtener reporte de proveedores");
    const data = await res.json();
    return data;
  }
}
