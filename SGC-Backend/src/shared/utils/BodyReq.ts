import { IncomingMessage } from "node:http";

export const getBodyData = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((CuerpoParse, ErrorParse) => {
    let Cuerpo = "";

    req.on("data", (chunk) => {
      Cuerpo += chunk.toString();
    });

    req.on("end", async () => {
      try {
        CuerpoParse = Cuerpo ? JSON.parse(Cuerpo) : {};
      } catch (error) {
        ErrorParse(new Error("JSON INVALIDO"));
      }
    });
  });
};
