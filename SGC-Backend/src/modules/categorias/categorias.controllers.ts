import { IncomingMessage, ServerResponse } from "node:http";
import { CategoriasServices } from "./categorias.services";
import { ManagerErrors } from "../../shared/errors/AppErrors";
import { getBodyData } from "../../shared/utils/BodyReq";
import { CategoriaCrear, CategoriasResponse } from "./categorias.types";
export class CategoriasControllers {
  static async MostrarRelaControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const data = await CategoriasServices.MostrarRelaServices();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error: any) {
      console.error(error);
      const statuscode =
        error instanceof ManagerErrors ? error.statuscode : 500; //si es un error/status puesto desde la clase ponemos ese si no 500
      const mensaje = error.message || "Error interno del servidor";
      res.statusCode = statuscode;
      res.end(JSON.stringify({ Mensaje: mensaje }));
    }
  }
  static async MostrarCategoriasControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const data = await CategoriasServices.MostrarCategoriasServices();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error: any) {
      console.error(error);
      const statuscode =
        error instanceof ManagerErrors ? error.statuscode : 500; //si es un error/status puesto desde la clase ponemos ese si no 500
      const mensaje = error.message || "Error interno del servidor";
      res.statusCode = statuscode;
      res.end(JSON.stringify({ Mensaje: mensaje }));
    }
  }
  static async CategoriasCrearControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const DatosParseados = await getBodyData<CategoriaCrear>(req);
      const data =
        await CategoriasServices.CrearCategoriasService(DatosParseados);
      res.writeHead(201);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
  static async CategoriasEditarControllers(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const DatosParseados = await getBodyData<CategoriasResponse>(req);

      const data =
        await CategoriasServices.CategoriasEditarService(DatosParseados);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
}
