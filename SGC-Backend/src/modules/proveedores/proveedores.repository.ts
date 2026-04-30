import { pool } from "../../config/db";
import { Proveedores } from "./proveedores.types";
import { Productos } from "./proveedores.types";
import { PoolConnection } from "mysql2/promise";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
export class ProveedoresRepository {
  static async MostrarProveedores(
    conexion: PoolConnection,
  ): Promise<Proveedores[]> {
    const [Data] = await conexion.execute(`SELECT * FROM proveedores`);
    return Data as Proveedores[];
  }
  static async Productos(conexion: PoolConnection) {
    const [Data] = await conexion.execute(
      `SELECT id_proveedor, nombre , precio_venta FROM productos WHERE activo=1`,
    );
    return Data as Productos[];
  }
  static async CrearProveedores(
    conexion: PoolConnection,
    nombre: string,
  ): Promise<number> {
    const [res]: any = await conexion.execute(
      "INSERT INTO proveedores (nombre) VALUES (?)",
      [nombre],
    );
    return res.insertId;
  }
  static async BuscarProveedor(
    conexion: PoolConnection,
    nombre: string,
  ): Promise<number | null> {
    const [Data] = await conexion.execute<RowDataPacket[]>(
      `SELECT id FROM proveedores WHERE nombre = ?`,
      [nombre],
    );

    return Data.length > 0 ? Data[0].id : null;
  }
}
