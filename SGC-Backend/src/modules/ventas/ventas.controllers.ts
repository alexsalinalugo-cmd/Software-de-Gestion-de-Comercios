import { IncomingMessage, ServerResponse } from "http";
import { VentasService } from "./ventas.services";
import { parsearBody } from "../../shared/utils/parsearBody";

export class VentasController {
  static async crearVenta(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const datosParseados = await parsearBody(req);
      const venta = await VentasService.crearVenta(datosParseados);
      res.writeHead(201);
      res.end(JSON.stringify(venta));
    } catch (error: any) {
      if (
        error.message === "La caja no existe" ||
        error.message ===
          "La caja está cerrada, no se pueden registrar ventas" ||
        error.message === "La venta debe tener al menos un producto"
      ) {
        res.writeHead(400);
        res.end(JSON.stringify({ mensaje: error.message }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
      }
    }
  }
}
