import { UbicacionesRepository } from "./ubicaciones.repository";
import { Ubicaciones } from "./ubicaciones.types";

export class UbicacionesServices {
  static async MostrarServices(): Promise<Ubicaciones[]> {
    try {
      const data = await UbicacionesRepository.MostrarUbicaciones();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
