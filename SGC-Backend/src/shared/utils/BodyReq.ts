import { IncomingMessage } from "node:http";

export const getBodyData = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((CuerpoParse, ErrorParse) => {
    let Cuerpo = "";

    req.on("data", (chunk) => {
      Cuerpo += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = Cuerpo ? JSON.parse(Cuerpo) : {};
        CuerpoParse(data as T);
      } catch (error) {
        ErrorParse(new Error("JSON INVALIDO"));
      }
    });
  });
};

export const QueryParams = (url: URL): number => {
  let idCapturado = url.searchParams.get("id");
  if (!idCapturado) {
    return 0;
  }
  const id = parseInt(idCapturado);
  return id;
};
