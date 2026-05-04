import { pool } from "../../config/db";
import { ManagerErrors } from "../../shared/errors/AppErrors";
import { Producto } from "../productos/producto.types";
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
      `SELECT pr.id_proveedor, pr.id AS id_producto, pr.nombre , pr.precio_costo, pr.stock_total, mr.nombre AS marca
       FROM productos pr 
      LEFT JOIN marcas mr ON pr.id_marca = mr.id
       WHERE activo=1`,
    );
    return Data as Productos[];
  }
  static async CrearProveedoresRapido(
    conexion: PoolConnection,
    razon_social: string,
  ): Promise<number> {
    const [res] = await conexion.execute<ResultSetHeader>(
      "INSERT INTO proveedores (razon_social) VALUES (?)",
      [razon_social],
    );
    return res.insertId;
  }
  static async BuscarProveedorxNombre(
    conexion: PoolConnection,
    razon_social: string,
  ): Promise<number | null> {
    const [Data] = await conexion.execute<RowDataPacket[]>(
      `SELECT id FROM proveedores WHERE razon_social = ?`,
      [razon_social],
    );

    return Data.length > 0 ? Data[0].id : null;
  }
  static async CrearProveedores(
    conexion: PoolConnection,
    Datos: Proveedores,
  ): Promise<number> {
    const { cuit, razon_social, telefono, email, nombre_contacto, dia_visita } =
      Datos;
    const [res] = await conexion.execute<ResultSetHeader>(
      "INSERT INTO proveedores (cuit ,razon_social ,telefono ,email ,nombre_contacto ,dia_visita) VALUES (?,?,?,?,?,?)",
      [cuit, razon_social, telefono, email, nombre_contacto, dia_visita],
    );
    return res.insertId;
  }
  static async BuscarProveedorxid(
    conexion: PoolConnection,
    id: number,
  ): Promise<Proveedores> {
    const [Data] = await conexion.execute<RowDataPacket[]>(
      `SELECT * FROM proveedores WHERE id = ?`,
      [id],
    );

    return Data[0] as Proveedores;
  }
  static async EditarProveedor(conexion: PoolConnection, Datos: Proveedores) {
    const {
      id,
      cuit,
      razon_social,
      telefono,
      email,
      nombre_contacto,
      dia_visita,
    } = Datos;
    const [res] = await conexion.execute<ResultSetHeader>(
      `UPDATE proveedores SET cuit = ?,razon_social = ? ,telefono = ?,email = ?, nombre_contacto = ?, dia_visita = ? WHERE id=?`,
      [cuit, razon_social, telefono, email, nombre_contacto, dia_visita, id],
    );
    if (res.affectedRows === 0) {
      throw new ManagerErrors(
        "No se pudo actualizar el proveedor xq no se encontro",
        404,
      );
    }
    return id;
  }
}
