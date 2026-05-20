import { MarcasRepository } from "./marca.repository";
import { Marcas } from "./marca.types";
import { pool } from "../../config/db";

export class MarcasServices {
  static async MostrarMarcasService(): Promise<Marcas[]> {
    const data = await MarcasRepository.getAll();
    return data;
  }
  static async CrearMarcasService(nombre: string): Promise<Marcas> {
    const conexion = await pool.getConnection();
    try {
      const id = await MarcasRepository.CrearMarcasRepository(conexion, nombre);
      return { id, nombre };
    } finally {
      conexion.release();
    }
  }
}
