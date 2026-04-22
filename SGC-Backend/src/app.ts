import http from "http";
// src/app.ts
import { productoRoutes } from "./modules/productos/producto.routers";
// Importamos el ruteador de ventas

export const server = http.createServer(async (req, res) => {
  const { url } = req;

  // 1. Rutas de Productos
  if (url?.startsWith("/api/productos")) {
    return await productoRoutes(req, res);
  }

  // Manejo de errores 404 global
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Ruta global no encontrada" }));
});
