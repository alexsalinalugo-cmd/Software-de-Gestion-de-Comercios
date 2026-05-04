import { pool } from "../../config/db";
import { ManagerErrors } from "../../shared/errors/AppErrors";
import { CategoriaCrear, Productos } from "./categorias.types";
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
      `SELECT pr.id_categoria, pr.id AS id_producto, pr.nombre , pr.precio_costo, pr.stock_total, mr.nombre AS marca
       FROM productos pr 
      LEFT JOIN marcas mr ON pr.id_marca = mr.id
       WHERE activo=1`,
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

  static async CrearCategoriaRapido(
    conexion: PoolConnection,
    Nombre: string,
  ): Promise<number> {
    const [res] = await conexion.execute<ResultSetHeader>(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [Nombre],
    );
    return res.insertId;
  }
  static async CrearCategoria(
    conexion: PoolConnection,
    data: CategoriaCrear,
  ): Promise<number> {
    const { nombre } = data;
    const [res] = await conexion.execute<ResultSetHeader>(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre],
    );
    return res.insertId;
  }

  static async buscarCategoriaPorId(
    conexion: PoolConnection,
    id: number,
  ): Promise<CategoriasResponse> {
    const [rows] = await conexion.execute<RowDataPacket[]>(
      "SELECT * FROM categorias WHERE id = ?",
      [id],
    );

    return rows[0] as CategoriasResponse;
  }
  static async EditarCategoria(
    conexion: PoolConnection,
    data: CategoriasResponse,
  ) {
    const [rows] = await conexion.execute<ResultSetHeader>(
      "UPDATE categorias SET nombre = ? WHERE id = ?",
      [data.nombre, data.id],
    );

    if (rows.affectedRows === 0) {
      throw new ManagerErrors(
        "No se pudo actualizar el proveedor xq no se encontro",
        404,
      );
    }
    return data.id;
  }
}
