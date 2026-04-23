import { pool } from "../../config/db";
import { CrearVenta, Venta, DetalleVenta } from "./ventas.types";

export class VentasRepository {
  static async crearVenta(datos: CrearVenta, total: number): Promise<Venta> {
    const [result] = await pool.execute(
      `INSERT INTO ventas (id_caja, id_cliente, total, fecha, metodo_pago) 
       VALUES (?, ?, ?, NOW(), ?)`,
      [datos.id_caja, datos.id_cliente, total, datos.metodo_pago],
    );
    const id = (result as any).insertId;
    const [rows] = await pool.execute(`SELECT * FROM ventas WHERE id = ?`, [
      id,
    ]);
    return (rows as Venta[])[0];
  }

  static async crearDetalleVenta(
    id_venta: number,
    datos: CrearVenta,
  ): Promise<void> {
    for (const producto of datos.productos) {
      await pool.execute(
        `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) 
         VALUES (?, ?, ?, ?)`,
        [
          id_venta,
          producto.id_producto,
          producto.cantidad,
          producto.precio_unitario,
        ],
      );
    }
  }

  static async descontarStock(datos: CrearVenta): Promise<void> {
    for (const producto of datos.productos) {
      await pool.execute(
        `UPDATE stock_lotes SET cantidad_actual = cantidad_actual - ? 
         WHERE id_producto = ? AND cantidad_actual >= ? 
         LIMIT 1`,
        [producto.cantidad, producto.id_producto, producto.cantidad],
      );
    }
  }
}
