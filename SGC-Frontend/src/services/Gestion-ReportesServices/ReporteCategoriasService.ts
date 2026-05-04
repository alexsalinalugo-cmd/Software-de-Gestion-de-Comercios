import type { ReporteCategorias } from "../../pages/interfaces/reportecategorias";

const API_URL = "http://localhost:3000/api/reportes/categorias";

export class ReporteCategoriasService {
  static async ObtenerReporte(periodo: string): Promise<ReporteCategorias> {
    const res = await fetch(`${API_URL}?periodo=${periodo}`);
    if (!res.ok) throw new Error("Error al obtener reporte de categorias");
    const data = await res.json();
    return data;
  }
}
