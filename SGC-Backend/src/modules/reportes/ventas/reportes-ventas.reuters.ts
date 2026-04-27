import { IncomingMessage, ServerResponse } from "http";
import { ReportesVentasController } from "./reportes-ventas.controllers";

export function reportesVentasRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): boolean {
  if (req.method === "GET" && req.url?.startsWith("/api/reportes/ventas")) {
    ReportesVentasController.obtenerReporte(req, res);
    return true;
  }

  return false;
}
