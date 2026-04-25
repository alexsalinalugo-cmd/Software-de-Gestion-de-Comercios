import { IncomingMessage, ServerResponse } from "http";
import { VentasController } from "./ventas.controllers";

export function ventasRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): boolean {
  if (req.method === "POST" && req.url === "/api/ventas") {
    VentasController.crearVenta(req, res);
    return true;
  }
  if (req.method === "GET" && req.url?.startsWith("/api/ventas/caja/")) {
    VentasController.obtenerVentasPorCaja(req, res);
    return true;
  }

  if (req.method === "GET" && req.url?.match(/^\/api\/ventas\/\d+\/detalle$/)) {
    VentasController.obtenerDetalleVenta(req, res);
    return true;
  }
  return false;
}
