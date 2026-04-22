import http, { IncomingMessage, ServerResponse } from "http";
import { GetProductosController } from "./producto.controllers";
export const productoRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const miUrl = new URL(req.url || "", `http://${req.headers.host}`);
  // new url = crea una nueva url
  //req.url = /api/productos/Mostrar
  //req.header.host = http://localhost:3000 xq? xq new URL necesita del host para interactuar
  // total = http://localhost:3000/api/productos/Mostrar

  const ruta = miUrl.pathname; //nos da la ruta limpia  /api/productos/Mostrar
  const metodo = req.method;

  if (ruta === "/api/productos/Mostrar" && metodo === "GET") {
    return await GetProductosController(req, res);
  }
};
