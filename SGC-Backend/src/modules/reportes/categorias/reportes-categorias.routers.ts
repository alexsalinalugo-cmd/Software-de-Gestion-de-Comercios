import { IncomingMessage, ServerResponse } from "http";
import { ReportesCategoriasController } from "./reportes-categorias.controllers";

export function reportesCategoriasRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): boolean {
  if (req.method === "GET" && req.url?.startsWith("/api/reportes/categorias")) {
    ReportesCategoriasController.obtenerReporte(req, res);
    return true;
  }

  return false;
}
