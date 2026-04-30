import { PoolConnection } from "mysql2/promise";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Ubicaciones } from "./ubicaciones.types";
import { pool } from "../../config/db";
export class UbicacionesRepository {
  static async CrearUbicacion(
    conexion: PoolConnection,
    sector: string,
    estanteria: string | undefined,
    posicion: string | undefined,
  ): Promise<number> {
    const [res]: any = await conexion.execute(
      "INSERT INTO ubicaciones (sector,estanteria,posicion) VALUES (?,?,?)",
      [sector, estanteria || null, posicion || null],
    );
    return res.insertId;
  }

  static async ActualizarUbicacion(
    conexion: PoolConnection,
    id: number,
    sector: string,
    estanteria: string,
    posicion: string,
  ): Promise<number> {
    const [Ubicacion_update] = await conexion.execute(
      "UPDATE ubicaciones SET sector = ?, estanteria = ?, posicion = ? WHERE id = ?",
      [sector || null, estanteria || null, posicion || null, id],
    );
    return id;
  }
  static async BuscarUbicaciones(
    conexion: PoolConnection,
    sector: string,
    estanteria: string,
    posicion: string,
  ): Promise<number | null> {
    const [data] = await conexion.execute<RowDataPacket[]>(
      `SELECT id FROM ubicaciones WHERE sector= ? AND estanteria = ? AND posicion = ? 
      `,
      [sector, estanteria, posicion],
    );
    if (data.length > 0) {
      return data[0].id;
    }
    return null;
  }
  static async MostrarUbicaciones(): Promise<Ubicaciones[]> {
    const [data] = await pool.query(`SELECT * FROM ubicaciones`);
    return data as Ubicaciones[];
  }
}
