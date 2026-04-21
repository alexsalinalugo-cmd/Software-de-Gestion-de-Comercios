import { pool } from "../../config/db";
import { Producto } from "./producto.types";

export class ProductoRepository {
  static async getAll(): Promise<Producto[]> {
    const [rows] = await pool.query("SELECT * FROM productos");

    return rows as Producto[];
  }
}
