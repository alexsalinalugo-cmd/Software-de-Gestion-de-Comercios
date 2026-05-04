import { IncomingMessage, ServerResponse } from "http";
import { ProveedoresController } from "./proveedores.controllers";

export const ProveedoresRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const miUrl = new URL(req.url || "", `http://${req.headers.host}`);

  const ruta = miUrl.pathname.replace("/api/proveedores", "");
  const metodo = req.method;

  if (ruta === "/mostrar" && metodo === "GET") {
    return ProveedoresController.MostrarProvedoresControllers(req, res);
  }
  if (ruta === "/proveedoresCompletas" && metodo === "GET") {
    return ProveedoresController.ProveedoresCompletoControllers(req, res);
  }
  if (ruta === "/crearProveedores" && metodo === "POST") {
    return ProveedoresController.ProveedoresCrearControllers(req, res);
  }
  if (ruta === "/editarProveedores" && metodo === "PUT") {
    return ProveedoresController.ProveedoresEditarControllers(req, res);
  }
};
