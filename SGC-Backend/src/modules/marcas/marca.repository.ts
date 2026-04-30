import { pool } from "../../config/db";
import { Marcas } from "./marca.types";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PoolConnection } from "mysql2/promise";
export class MarcasRepository {
  static async getAll(): Promise<Marcas[]> {
    const [data] = await pool.query(`SELECT * FROM marcas`);
    return data as Marcas[];
  }

  static async BuscarMarcasXNombres(
    conexion: PoolConnection,
    nombre: string,
  ): Promise<number | null> {
    const [data] = await conexion.execute<RowDataPacket[]>(
      `SELECT id FROM marcas WHERE nombre = ?`,
      [nombre],
    );
    return data.length > 0 ? data[0].id : null;
  }

  //se esta utilizando en prodcutos por ahora
  static async CrearMarcasRepository(
    conexion: PoolConnection,
    nombre: string,
  ): Promise<number> {
    const [data] = await pool.query<ResultSetHeader>(
      `INSERT INTO marcas (nombre) VALUES (?)`,
      [nombre],
    );
    return data.insertId;
  }
}
