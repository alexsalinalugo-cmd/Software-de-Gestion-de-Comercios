import http, { IncomingMessage, ServerResponse } from "http";
import { CategoriasControllers } from "./categorias.controllers";

export const CategoriasRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const miUrl = new URL(req.url || "", `http://${req.headers.host}`);

  const ruta = miUrl.pathname.replace("/api/categorias", "");
  const metodo = req.method;

  if (ruta === "/categoriasCompleta" && metodo === "GET") {
    return await CategoriasControllers.MostrarRelaControllers(req, res);
  }
  if (ruta === "/categoriasNormales" && metodo === "GET") {
    return await CategoriasControllers.MostrarCategoriasControllers(req, res);
  }
  if (ruta === "/categoriasCrear" && metodo === "POST") {
    return await CategoriasControllers.CategoriasCrearControllers(req, res);
  }
  if (ruta === "/editar" && metodo === "PUT") {
    return await CategoriasControllers.CategoriasEditarControllers(req, res);
  }
};
