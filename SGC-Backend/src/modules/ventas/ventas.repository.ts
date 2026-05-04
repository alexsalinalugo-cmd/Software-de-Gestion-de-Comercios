import { pool } from "../../config/db";
import {
  CrearVenta,
  Venta,
  DetalleVenta,
  ModificarDetalleVenta,
} from "./ventas.types";

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
        `INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario) 
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

      await pool.execute(
        `UPDATE productos SET stock_total = stock_total - ? 
         WHERE id = ?`,
        [producto.cantidad, producto.id_producto],
      );
    }
  }
  static async obtenerVentasPorCaja(id_caja: number): Promise<Venta[]> {
    const [rows] = await pool.execute(
      `SELECT * FROM ventas WHERE id_caja = ?`,
      [id_caja],
    );
    return rows as Venta[];
  }

  static async obtenerDetalleVenta(id_venta: number): Promise<DetalleVenta[]> {
    const [rows] = await pool.execute(
      `SELECT dv.*, p.nombre 
       FROM detalle_ventas dv
       JOIN productos p ON dv.id_producto = p.id
       WHERE dv.id_venta = ?`,
      [id_venta],
    );
    return rows as DetalleVenta[];
  }

  static async modificarDetalleVenta(
    datos: ModificarDetalleVenta,
  ): Promise<void> {
    // 1. Actualizar la cantidad en detalle_ventas
    await pool.execute(`UPDATE detalle_ventas SET cantidad = ? WHERE id = ?`, [
      datos.cantidad_nueva,
      datos.id_detalle,
    ]);

    // 2. Recalcular el total
    const [detalles] = await pool.execute(
      `SELECT SUM(cantidad * precio_unitario) as nuevo_total 
   FROM detalle_ventas WHERE id_venta = ?`,
      [datos.id_venta],
    );
    const nuevoTotal = (detalles as any[])[0].nuevo_total;

    // 3. Actualizar el total en ventas
    await pool.execute(`UPDATE ventas SET total = ? WHERE id = ?`, [
      nuevoTotal,
      datos.id_venta,
    ]);

    // 4. Devolver la diferencia al stock
    const diferencia = datos.cantidad_anterior - datos.cantidad_nueva;
    if (diferencia > 0) {
      await pool.execute(
        `UPDATE stock_lotes SET cantidad_actual = cantidad_actual + ? 
         WHERE id_producto = ? LIMIT 1`,
        [diferencia, datos.id_producto],
      );
      await pool.execute(
        `UPDATE productos SET stock_total = stock_total + ? WHERE id = ?`,
        [diferencia, datos.id_producto],
      );
    }
  }
}
