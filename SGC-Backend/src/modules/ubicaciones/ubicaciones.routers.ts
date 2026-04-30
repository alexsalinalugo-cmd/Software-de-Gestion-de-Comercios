import { IncomingMessage, ServerResponse } from "node:http";
import { UbicacionesControllers } from "./ubicaciones.controllers";

export const UbicacionesRouters = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const miUrl = new URL(req.url || "", `http://${req.headers.host}`);

  const ruta = miUrl.pathname.replace("/api/ubicaciones", "");
  const metodo = req.method;

  if (ruta === "/mostrar" && metodo === "GET") {
    return UbicacionesControllers.MostrarControllers(req, res);
  }
};
