import { ReportesCategoriasRepository } from "./reportes-categorias.repository";
import { ReporteCategorias } from "./reportes-categorias.types";

export class ReportesCategoriasService {
  static async obtenerReporte(periodo: string): Promise<ReporteCategorias> {
    if (!["hoy", "7dias", "todo"].includes(periodo)) {
      throw new Error("Periodo invalido. Usa: hoy, 7dias o todo");
    }

    const [metricas, categorias, ventas_por_categoria] = await Promise.all([
      ReportesCategoriasRepository.obtenerMetricas(periodo),
      ReportesCategoriasRepository.obtenerCategorias(),
      ReportesCategoriasRepository.obtenerVentasPorCategoria(periodo),
    ]);

    return {
      metricas,
      categorias,
      ventas_por_categoria,
    };
  }
}
