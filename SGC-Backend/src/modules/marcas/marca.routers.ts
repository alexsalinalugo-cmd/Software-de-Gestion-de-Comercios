import { IncomingMessage, ServerResponse } from "node:http";
import { MarcaControllers } from "./marca.controllers";

export const MarcaRouters = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const miUrl = new URL(req.url || "", `http://${req.headers.host}`);
  const ruta = miUrl.pathname.replace("/api/marcas", "");
  const metodo = req.method;

  if (ruta === "/mostrar" && metodo === "GET") {
    return MarcaControllers.MostrarMarcasControllers(req, res);
  }
  if (ruta === "crear" && metodo === "POST") {
    return MarcaControllers.CrearMarcasControllers(req, res);
  }
};
