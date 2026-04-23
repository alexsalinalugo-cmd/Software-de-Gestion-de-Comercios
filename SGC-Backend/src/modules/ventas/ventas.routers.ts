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

  return false;
}
