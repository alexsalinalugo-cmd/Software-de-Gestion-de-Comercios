import { IncomingMessage, ServerResponse } from "node:http";
import { ProveedoresServices } from "./proveedores.services";
import { getBodyData } from "../../shared/utils/BodyReq";
import { Proveedores } from "./proveedores.types";

export class ProveedoresController {
  static async MostrarProvedoresControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const data = await ProveedoresServices.MostrarProveedoresService();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
  static async ProveedoresCompletoControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const data = await ProveedoresServices.ProveedoresCompletoService();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
  static async ProveedoresCrearControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const DatosParseados = await getBodyData<Proveedores>(req);
      const data =
        await ProveedoresServices.ProveedoresCrearService(DatosParseados);
      res.writeHead(201);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
  static async ProveedoresEditarControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const DatosParseados = await getBodyData<Proveedores>(req);
      const data =
        await ProveedoresServices.ProveedoresEditarService(DatosParseados);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
}
