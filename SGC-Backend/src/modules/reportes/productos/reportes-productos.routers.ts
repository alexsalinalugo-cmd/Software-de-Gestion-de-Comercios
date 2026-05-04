import { IncomingMessage, ServerResponse } from "http";
import { ReportesProductosController } from "./reportes-productos.controllers";

export function reportesProductosRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): boolean {
  if (req.method === "GET" && req.url?.startsWith("/api/reportes/productos")) {
    ReportesProductosController.obtenerReporte(req, res);
    return true;
  }

  return false;
}
