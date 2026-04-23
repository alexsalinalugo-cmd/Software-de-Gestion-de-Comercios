import { server } from "./app";

const PORT = 3000;

// Ponemos el servidor a escuchar peticiones
server.listen(PORT, () => {
  console.log(` SERVIDOR  CORRIENDO EN   Puerto: http://localhost:${PORT}`);
});

// Manejo de errores básicos del servidor
server.on("error", (error) => {
  console.error("Error en el servidor:", error.message);
});
