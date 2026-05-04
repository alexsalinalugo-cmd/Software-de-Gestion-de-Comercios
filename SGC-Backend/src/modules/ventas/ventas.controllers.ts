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

  static async obtenerVentasPorCaja(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const url = new URL(req.url!, `http://localhost`);
      const id_caja = parseInt(url.pathname.split("/").pop()!);

      const ventas = await VentasService.obtenerVentasPorCaja(id_caja);
      res.writeHead(200);
      res.end(JSON.stringify(ventas));
    } catch (error: any) {
      if (error.message === "La caja no existe") {
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: error.message }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
      }
    }
  }

  static async obtenerDetalleVenta(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const url = new URL(req.url!, `http://localhost`);
      const partes = url.pathname.split("/");
      const id_venta = parseInt(partes[3]);

      const detalle = await VentasService.obtenerDetalleVenta(id_venta);
      res.writeHead(200);
      res.end(JSON.stringify(detalle));
    } catch (error: any) {
      if (error.message === "La venta no existe") {
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: error.message }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
      }
    }
  }

  static async modificarDetalleVenta(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const datosParseados = await parsearBody(req);
      await VentasService.modificarDetalleVenta(datosParseados);
      res.writeHead(200);
      res.end(JSON.stringify({ mensaje: "Detalle actualizado correctamente" }));
    } catch (error: any) {
      if (
        error.message === "La cantidad debe ser mayor a cero" ||
        error.message === "La cantidad nueva debe ser menor a la anterior"
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
