import { IncomingMessage, ServerResponse } from "http";
import { ReportesProveedoresController } from "./reportes-proveedores.controllers";

export function reportesProveedoresRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): boolean {
  if (
    req.method === "GET" &&
    req.url?.startsWith("/api/reportes/proveedores")
  ) {
    ReportesProveedoresController.obtenerReporte(req, res);
    return true;
  }

  return false;
}
