import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "./producto.services";
import { getBodyData } from "../../shared/utils/BodyReq";
import { ManagerErrors } from "../../shared/errors/AppErrors";
import { Producto } from "./producto.types";

export class ProductosController {
  static async TraerProductosController(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    //funcion asincrona que tiene una promesa que no devuelve nada al codigo pero si al navegador "res.end"
    try {
      const data = await ProductoService.obtenerProductos();
      res.writeHead(200);
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ Mensaje: "Error interno del servidor" }));
    }
  }
  static async CrearProductosController(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const DatosParseados = await getBodyData<Producto>(req);
      const ProductoAgregado =
        await ProductoService.AgregarProductos(DatosParseados);
      res.writeHead(201);
      res.end(JSON.stringify(ProductoAgregado));
    } catch (error: any) {
      console.error(error);
      const statuscode =
        error instanceof ManagerErrors ? error.statuscode : 500; //si es un error/status puesto desde la clase ponemos ese si no 500
      const mensaje = error.message || "Error interno del servidor";
      res.statusCode = statuscode;
      res.end(JSON.stringify({ Mensaje: mensaje }));
    }
  }

  static async EditarProductosController(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    let Datos = "";
    req.on("data", (chunk) => {
      Datos += chunk.toString();
    });
    req.on("end", async () => {
      const DatosParseados = JSON.parse(Datos);
      try {
        const ProductoEditado =
          await ProductoService.EditarProductos(DatosParseados);
        res.writeHead(200);
        res.end(JSON.stringify(ProductoEditado));
      } catch (error: any) {
        console.error(error);
        const statuscode =
          error instanceof ManagerErrors ? error.statuscode : 500; //si es un error/status puesto desde la clase ponemos ese si no 500
        const mensaje = error.message || "Error interno del servidor";
        res.statusCode = statuscode;
        res.end(JSON.stringify({ Mensaje: mensaje }));
      }
    });
  }
}
