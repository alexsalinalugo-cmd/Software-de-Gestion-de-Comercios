import { IncomingMessage, ServerResponse } from "http";
import { ProductoService } from "./producto.services";

export const GetProductosController = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  try {
    const data = await ProductoService.obtenerProductos();
    res.writeHead(200);
    res.end(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    res.writeHead(500);
    res.end(JSON.stringify({ Mensaje: "Error interno del servidor()" }));
  }
};
