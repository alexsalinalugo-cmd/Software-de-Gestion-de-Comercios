import { ReportesVentasRepository } from "./reportes-ventas.repository";
import { ReporteVentas } from "./reportes-ventas.types";

export class ReportesVentasService {
  static async obtenerReporte(periodo: string): Promise<ReporteVentas> {
    if (!["hoy", "7dias", "todo"].includes(periodo)) {
      throw new Error("Período inválido. Usá: hoy, 7dias o todo");
    }

    const [metricas, por_metodo, historial] = await Promise.all([
      ReportesVentasRepository.obtenerMetricas(periodo),
      ReportesVentasRepository.obtenerPorMetodo(periodo),
      ReportesVentasRepository.obtenerHistorial(periodo),
    ]);

    return {
      metricas,
      por_metodo,
      historial,
    };
  }
}
