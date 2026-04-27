import http from "http";
import { productoRoutes } from "./modules/productos/producto.routers";
import { cajaRoutes } from "./modules/caja/caja.routers";
import { ventasRoutes } from "./modules/ventas/ventas.routers";
import { reportesVentasRoutes } from "./modules/reportes/ventas/reportes-ventas.reuters";

export const server = http.createServer(async (req, res) => {
  const { url } = req;
  res.setHeader("Access-Control-Allow-Origin", "*"); //Esto permite que cualquier origen pueda acceder al servidor
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET , POST, OPTIONS, DELETE,PUT",
  ); //Esto permite los metodos HTTP
  res.setHeader("Access-Control-Allow-Headers", "content-Type");
  res.setHeader("content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
  }

  // 1. Rutas de Productos
  if (url?.startsWith("/api/productos")) {
    return await productoRoutes(req, res);
  }

  // 2. Rutas de Caja
  if (url?.startsWith("/api/caja")) {
    return await cajaRoutes(req, res);
  }

  // 3. Rutas de Ventas
  if (url?.startsWith("/api/ventas")) {
    return await ventasRoutes(req, res);
  }
  // 4. Rutas de Reportes de Ventas
  if (url?.startsWith("/api/reportes/ventas")) {
    return await reportesVentasRoutes(req, res);
  }

  // Manejo de errores 404 global
  res.writeHead(404, { "content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Ruta global no encontrada" }));
});
