import http from "http";
// src/app.ts
import { productoRoutes } from "./modules/productos/producto.routers";
// Importamos el ruteador de ventas

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

  // Manejo de errores 404 global
  res.writeHead(404, { "content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Ruta global no encontrada" }));
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Servidor listo en http://localhost:${PORT}`);
});
