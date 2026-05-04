import type { ModificarDetalleVenta } from "../../pages/interfaces/venta";
import type { ReporteVentas } from "../../pages/interfaces/reporteventas";

const API_REPORTES_URL = "http://localhost:3000/api/reportes/ventas";
const API_VENTAS_URL = "http://localhost:3000/api/ventas";

export interface DetalleReporteVenta {
  id: number;
  id_venta: number;
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}

export class ReporteVentasService {
  static async ObtenerReporte(periodo: string): Promise<ReporteVentas> {
    const res = await fetch(`${API_REPORTES_URL}?periodo=${periodo}`);
    if (!res.ok) throw new Error("Error al obtener reporte de ventas");
    const data = await res.json();
    return data;
  }

  static async ObtenerDetalleVenta(
    idVenta: number,
  ): Promise<DetalleReporteVenta[]> {
    const res = await fetch(`${API_VENTAS_URL}/${idVenta}/detalle`);
    if (!res.ok) throw new Error("Error al obtener detalle de venta");
    const data = await res.json();
    return data;
  }

  static async ModificarDetalleVenta(
    datos: ModificarDetalleVenta,
  ): Promise<void> {
    const res = await fetch(`${API_VENTAS_URL}/detalle/modificar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!res.ok) throw new Error("Error al modificar detalle de venta");
  }
}
