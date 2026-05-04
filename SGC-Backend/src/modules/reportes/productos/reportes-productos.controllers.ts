import { IncomingMessage, ServerResponse } from "http";
import { ReportesProductosService } from "./reportes-productos.services";

export class ReportesProductosController {
  static async obtenerReporte(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const url = new URL(req.url!, "http://localhost");
      const periodo = url.searchParams.get("periodo") || "todo";

      const reporte = await ReportesProductosService.obtenerReporte(periodo);
      res.writeHead(200);
      res.end(JSON.stringify(reporte));
    } catch (error: any) {
      if (error.message === "Periodo invalido. Usa: hoy, 7dias o todo") {
        res.writeHead(400);
        res.end(JSON.stringify({ mensaje: error.message }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
      }
    }
  }
}
