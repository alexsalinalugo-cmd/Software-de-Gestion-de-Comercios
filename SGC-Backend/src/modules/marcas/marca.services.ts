import { MarcasRepository } from "./marca.repository";
import { Marcas } from "./marca.types";

export class MarcasServices {
  static async MostrarMarcasService(): Promise<Marcas[]> {
    const data = await MarcasRepository.getAll();
    return data;
  }
  static async CrearMarcasService(): Promise<Marcas> {
    const data = await MarcasRepository.CrearMarcasRepository();
    return data;
    //provicional esto.....
  }
}
