import { ReportesProductosRepository } from "./reportes-productos.repository";
import { ReporteProductos } from "./reportes-productos.types";

export class ReportesProductosService {
  static async obtenerReporte(periodo: string): Promise<ReporteProductos> {
    if (!["hoy", "7dias", "todo"].includes(periodo)) {
      throw new Error("Periodo invalido. Usa: hoy, 7dias o todo");
    }

    const [metricas, productos_criticos, mas_vendidos, stock_por_categoria] =
      await Promise.all([
        ReportesProductosRepository.obtenerMetricas(),
        ReportesProductosRepository.obtenerProductosCriticos(),
        ReportesProductosRepository.obtenerMasVendidos(periodo),
        ReportesProductosRepository.obtenerStockPorCategoria(),
      ]);

    return {
      metricas,
      productos_criticos,
      mas_vendidos,
      stock_por_categoria,
    };
  }
}
