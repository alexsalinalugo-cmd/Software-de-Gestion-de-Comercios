import { IncomingMessage, ServerResponse } from "http";
import { CajaController } from "./caja.controllers";

export function cajaRoutes(req: IncomingMessage, res: ServerResponse): boolean {
  if (req.method === "POST" && req.url === "/api/caja/abrir") {
    CajaController.abrirCaja(req, res);
    return true;
  }
  if (req.method === "POST" && req.url === "/api/caja/cerrar") {
    CajaController.cerrarCaja(req, res);
    return true;
  }

  if (req.method === "GET" && req.url?.startsWith("/api/caja/estado/")) {
    CajaController.obtenerEstadoCaja(req, res);
    return true;
  }
  return false;
}
