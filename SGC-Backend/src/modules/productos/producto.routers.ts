import http, { IncomingMessage, ServerResponse } from "http";
import { ProductosController } from "./producto.controllers";
export const productoRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const miUrl = new URL(req.url || "", `http://${req.headers.host}`);
  // new url = crea una nueva url
  //req.url = /api/productos/Mostrar
  //req.header.host = http://localhost:3000 xq? xq new URL necesita del host para interactuar
  // total = http://localhost:3000/api/productos/Mostrar

  const ruta = miUrl.pathname.replace("/api/productos", ""); //nos da la ruta limpia  /api/productos/Mostrar o podemos hacer .replace
  const metodo = req.method;
  console.log("DEBUG ROUTER -> Ruta:", ruta, "Metodo:", metodo); // <--- SI ESTO NO IMPRIME, EL PROBLEMA ES APP.TS

  if (ruta === "/mostrar" && metodo === "GET") {
    return await ProductosController.TraerProductosController(req, res);
  }
  if (ruta === "/crear" && metodo === "POST") {
    return await ProductosController.CrearProductosController(req, res);
  }
  if (ruta === "/editar" && metodo === "PUT") {
    return await ProductosController.EditarProductosController(req, res);
  }
  if (ruta === "/eliminar" && metodo === "DELETE") {
    return await ProductosController.EliminarProductosController(
      req,
      res,
      miUrl,
    );
  }
};
