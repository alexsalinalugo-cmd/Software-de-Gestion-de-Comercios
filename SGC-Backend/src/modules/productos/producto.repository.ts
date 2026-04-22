import { pool } from "../../config/db";
import { Producto } from "./producto.types";

export class ProductoRepository {
  static async getAll(): Promise<Producto[]> {
    const [rows] = await pool.query(`
      SELECT p.*,c.nombre AS nombre_categoria, pr.nombre AS nombre_proveedor, ubi.sector , ubi.estanteria, ubi.posicion
      FROM productos p 
      LEFT JOIN categoria c ON p.id_categoria = c.id
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
      LEFT JOIN ubicaciones ubi ON p.id_ubicacion = ubi.id


      `);

    return rows as Producto[];
  }
}
