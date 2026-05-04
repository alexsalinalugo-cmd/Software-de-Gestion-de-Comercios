import type { ReporteProductos } from "../../pages/interfaces/reporteproductos";

const API_URL = "http://localhost:3000/api/reportes/productos";

export class ReporteProductosService {
  static async ObtenerReporte(periodo: string): Promise<ReporteProductos> {
    const res = await fetch(`${API_URL}?periodo=${periodo}`);
    if (!res.ok) throw new Error("Error al obtener reporte de productos");
    const data = await res.json();
    return data;
  }
}
