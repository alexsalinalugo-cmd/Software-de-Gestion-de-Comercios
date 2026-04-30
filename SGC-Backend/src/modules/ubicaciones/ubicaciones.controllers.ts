import { IncomingMessage, ServerResponse } from "node:http";
import { UbicacionesServices } from "./ubicaciones.services";

export class UbicacionesControllers {
  static async MostrarControllers(req: IncomingMessage, res: ServerResponse) {
    try {
      const data = await UbicacionesServices.MostrarServices();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch {
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
}
