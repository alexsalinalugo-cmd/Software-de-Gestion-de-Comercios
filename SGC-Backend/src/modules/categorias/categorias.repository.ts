import { pool } from "../../config/db";
import { Productos } from "./categorias.types";
import { CategoriasResponse } from "./categorias.types";
import { PoolConnection } from "mysql2/promise";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
export class CategoriasRepository {
  static async getAll(conexion: PoolConnection) {
    const [Data] = await conexion.execute(`
      SELECT * FROM categorias
        `);
    return Data as CategoriasResponse[];
  }
  static async Productos(conexion: PoolConnection) {
    const [Data] = await conexion.execute(
      `SELECT id_categoria, nombre , precio_venta FROM productos WHERE activo=1`,
    );
    return Data as Productos[];
  }

  static async buscarCategoriaPorNombre(
    conexion: PoolConnection,
    nombre: string,
  ): Promise<number | null> {
    const [rows] = await conexion.execute<RowDataPacket[]>(
      "SELECT id FROM categorias WHERE nombre = ?",
      [nombre],
    );

    return rows.length > 0 ? rows[0].id : null;
  }

  static async CrearCategoria(
    conexion: PoolConnection,
    nombre: string,
  ): Promise<number> {
    const [res]: any = await conexion.execute(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre],
    );
    return res.insertId;
  }
}
