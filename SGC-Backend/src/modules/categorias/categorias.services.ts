import { pool } from "../../config/db";
import { CategoriasRepository } from "./categorias.repository";
import {
  CategoriasResponseCompleta,
  CategoriasResponse,
} from "./categorias.types";

export class CategoriasServices {
  static async MostrarRelaServices(): Promise<CategoriasResponseCompleta[]> {
    const conexion = await pool.getConnection();
    try {
      // beginTransaction (no hace falta para lectura)
      const Categorias = await CategoriasRepository.getAll(conexion);
      const Productos = await CategoriasRepository.Productos(conexion);

      const Filtrado: CategoriasResponseCompleta[] = Categorias.map((cat) => ({
        ...cat,
        Productos: Productos.filter((p) => p.id_categoria === cat.id),
      }));

      return Filtrado;
    } catch (error) {
      throw error;
    } finally {
      conexion.release();
    }
  }
  static async MostrarCategoriasServices(): Promise<CategoriasResponse[]> {
    const conexion = await pool.getConnection();
    try {
      // beginTransaction (no hace falta para lectura)
      const Categorias = await CategoriasRepository.getAll(conexion);

      return Categorias;
    } catch (error) {
      throw error;
    } finally {
      conexion.release();
    }
  }
}
