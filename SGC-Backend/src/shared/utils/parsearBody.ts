import { IncomingMessage } from "http";

export function parsearBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let datos = "";

    req.on("data", (chunk) => {
      datos += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(datos));
      } catch {
        reject(new Error("El body no es un JSON válido"));
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

/*
O sea la función tiene un solo trabajo: recibir 
el request, esperar que llegue todo el body, convertirlo a JSON y devolverlo listo para usar
*/
