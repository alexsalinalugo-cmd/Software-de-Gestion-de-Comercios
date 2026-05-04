import { pool } from "../../../config/db";
import {
  MetricasProductos,
  ProductoCritico,
  ProductoMasVendido,
  StockPorCategoria,
} from "./reportes-productos.types";

export class ReportesProductosRepository {
  static async obtenerMetricas(): Promise<MetricasProductos> {
    const [rows] = await pool.execute(
      `SELECT
        COUNT(*) AS total_productos,
        COALESCE(SUM(stock_total), 0) AS stock_total,
        SUM(CASE WHEN stock_total <= stock_minimo THEN 1 ELSE 0 END) AS productos_criticos,
        COALESCE(SUM(stock_total * precio_costo), 0) AS valor_inventario
       FROM productos
       WHERE activo = 1`,
    );

    return (rows as MetricasProductos[])[0];
  }

  static async obtenerProductosCriticos(): Promise<ProductoCritico[]> {
    const [rows] = await pool.execute(
      `SELECT
        p.id,
        p.nombre,
        p.stock_total,
        p.stock_minimo,
        c.nombre AS categoria_nombre,
        pr.nombre AS proveedor_nombre
       FROM productos p
       LEFT JOIN categorias c ON p.id_categoria = c.id
       LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
       WHERE p.activo = 1
         AND p.stock_total <= p.stock_minimo
       ORDER BY p.stock_total ASC, p.nombre ASC`,
    );

    return rows as ProductoCritico[];
  }

  static async obtenerMasVendidos(periodo: string): Promise<ProductoMasVendido[]> {
    let filtro = "";

    if (periodo === "hoy") {
      filtro = "AND DATE(v.fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtro = "AND v.fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT
        p.id,
        p.nombre,
        COALESCE(SUM(dv.cantidad), 0) AS cantidad_vendida,
        COALESCE(SUM(dv.cantidad * dv.precio_unitario), 0) AS total_vendido
       FROM detalle_ventas dv
       INNER JOIN ventas v ON dv.id_venta = v.id
       INNER JOIN productos p ON dv.id_producto = p.id
       WHERE p.activo = 1
       ${filtro}
       GROUP BY p.id, p.nombre
       ORDER BY cantidad_vendida DESC, total_vendido DESC
       LIMIT 10`,
    );

    return rows as ProductoMasVendido[];
  }

  static async obtenerStockPorCategoria(): Promise<StockPorCategoria[]> {
    const [rows] = await pool.execute(
      `SELECT
        COALESCE(c.nombre, 'Sin categoria') AS categoria_nombre,
        COUNT(p.id) AS cantidad_productos,
        COALESCE(SUM(p.stock_total), 0) AS stock_total
       FROM productos p
       LEFT JOIN categorias c ON p.id_categoria = c.id
       WHERE p.activo = 1
       GROUP BY COALESCE(c.nombre, 'Sin categoria')
       ORDER BY stock_total DESC`,
    );

    return rows as StockPorCategoria[];
  }
}
