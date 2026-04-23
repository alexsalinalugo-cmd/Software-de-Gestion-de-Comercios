import { IncomingMessage, ServerResponse } from "http";
import { CajaService } from "./caja.services";
import { parsearBody } from "../../shared/utils/parsearBody";

export class CajaController {
  static async abrirCaja(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const datosParseados = await parsearBody(req);
      const caja = await CajaService.abrirCaja(datosParseados);
      res.writeHead(201);
      res.end(JSON.stringify(caja));
    } catch (error: any) {
      if (error.message === "El monto de apertura debe ser mayor a cero") {
        res.writeHead(400);
        res.end(JSON.stringify({ mensaje: error.message }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
      }
    }
  }

  static async cerrarCaja(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const datosParseados = await parsearBody(req);
      const caja = await CajaService.cerrarCaja(datosParseados);
      res.writeHead(200);
      res.end(JSON.stringify(caja));
    } catch (error: any) {
      if (
        error.message === "El monto de cierre no puede ser negativo" ||
        error.message === "La caja no existe" ||
        error.message === "La caja ya está cerrada"
      ) {
        res.writeHead(400);
        res.end(JSON.stringify({ mensaje: error.message }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
      }
    }
  }

  static async obtenerEstadoCaja(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const url = new URL(req.url!, `http://localhost`);
      const id = parseInt(url.pathname.split("/").pop()!);

      const caja = await CajaService.obtenerEstadoCaja(id);
      res.writeHead(200);
      res.end(JSON.stringify(caja));
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
}
