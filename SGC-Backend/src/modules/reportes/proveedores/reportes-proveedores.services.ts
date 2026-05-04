import { ReportesProveedoresRepository } from "./reportes-proveedores.repository";
import { ReporteProveedores } from "./reportes-proveedores.types";

export class ReportesProveedoresService {
  static async obtenerReporte(periodo: string): Promise<ReporteProveedores> {
    if (!["hoy", "7dias", "todo"].includes(periodo)) {
      throw new Error("Periodo invalido. Usa: hoy, 7dias o todo");
    }

    const [metricas, proveedores, ventas_por_proveedor, productos_criticos] =
      await Promise.all([
        ReportesProveedoresRepository.obtenerMetricas(),
        ReportesProveedoresRepository.obtenerProveedores(),
        ReportesProveedoresRepository.obtenerVentasPorProveedor(periodo),
        ReportesProveedoresRepository.obtenerProductosCriticos(),
      ]);

    return {
      metricas,
      proveedores,
      ventas_por_proveedor,
      productos_criticos,
    };
  }
}
