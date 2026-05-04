import { ReporteCategoriasService } from "./Gestion-ReportesServices/ReporteCategoriasService";
import { ReporteProductosService } from "./Gestion-ReportesServices/ReporteProductosService";
import { ReporteProveedoresService } from "./Gestion-ReportesServices/ReporteProveedoresService";
import { ReporteVentasService } from "./Gestion-ReportesServices/ReporteVentasService";

export class DashboardServices {
  static async ObtenerDashboard() {
    const [ventasHoy, ventasSemana, productos, categorias, proveedores] =
      await Promise.all([
        ReporteVentasService.ObtenerReporte("hoy"),
        ReporteVentasService.ObtenerReporte("7dias"),
        ReporteProductosService.ObtenerReporte("todo"),
        ReporteCategoriasService.ObtenerReporte("todo"),
        ReporteProveedoresService.ObtenerReporte("todo"),
      ]);

    return {
      ventasHoy,
      ventasSemana,
      productos,
      categorias,
      proveedores,
    };
  }
}
