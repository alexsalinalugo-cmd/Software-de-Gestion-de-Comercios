import { IncomingMessage, ServerResponse } from "http";
import { CajaService } from "./caja.services";

export class CajaController {
  static async abrirCaja(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    let datos = "";

    req.on("data", (chunk) => {
      datos += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const datosParseados = JSON.parse(datos);
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
    });
  }
}
