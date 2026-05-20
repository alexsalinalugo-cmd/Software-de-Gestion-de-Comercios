import { IncomingMessage, ServerResponse } from "http";
import { MarcasServices } from "./marca.services";
import { parsearBody } from "../../shared/utils/parsearBody";

export class MarcaControllers {
  static async MostrarMarcasControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const data = await MarcasServices.MostrarMarcasService();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
  static async CrearMarcasControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const body = await parsearBody(req);
      const data = await MarcasServices.CrearMarcasService(body.nombre);
      res.writeHead(201);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
}
