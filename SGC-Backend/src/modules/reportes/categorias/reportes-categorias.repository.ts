import { pool } from "../../../config/db";
import {
  CategoriaResumen,
  MetricasCategorias,
  VentaPorCategoria,
} from "./reportes-categorias.types";

export class ReportesCategoriasRepository {
  static async obtenerMetricas(periodo: string): Promise<MetricasCategorias> {
    let filtroVentas = "";

    if (periodo === "hoy") {
      filtroVentas = "AND DATE(v.fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtroVentas = "AND v.fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT
        (SELECT COUNT(*) FROM categorias) AS total_categorias,
        (SELECT COUNT(*) FROM productos WHERE activo = 1 AND id_categoria IS NOT NULL) AS productos_asociados,
        (SELECT COALESCE(SUM(stock_total), 0) FROM productos WHERE activo = 1 AND id_categoria IS NOT NULL) AS stock_total,
        (
          SELECT COALESCE(SUM(dv.cantidad * dv.precio_unitario), 0)
          FROM detalle_ventas dv
          INNER JOIN ventas v ON dv.id_venta = v.id
          INNER JOIN productos p ON dv.id_producto = p.id
          WHERE p.activo = 1
            AND p.id_categoria IS NOT NULL
            ${filtroVentas}
        ) AS total_vendido`,
    );

    return (rows as MetricasCategorias[])[0];
  }

  static async obtenerCategorias(): Promise<CategoriaResumen[]> {
    const [rows] = await pool.execute(
      `SELECT
        c.id,
        c.nombre,
        COUNT(p.id) AS cantidad_productos,
        COALESCE(SUM(p.stock_total), 0) AS stock_total,
        COALESCE(SUM(CASE WHEN p.stock_total <= p.stock_minimo THEN 1 ELSE 0 END), 0) AS productos_criticos,
        COALESCE(SUM(p.stock_total * p.precio_costo), 0) AS valor_inventario
       FROM categorias c
       LEFT JOIN productos p ON c.id = p.id_categoria AND p.activo = 1
       GROUP BY c.id, c.nombre
       ORDER BY cantidad_productos DESC, c.nombre ASC`,
    );

    return rows as CategoriaResumen[];
  }

  static async obtenerVentasPorCategoria(
    periodo: string,
  ): Promise<VentaPorCategoria[]> {
    let filtroVentas = "";

    if (periodo === "hoy") {
      filtroVentas = "AND DATE(v.fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtroVentas = "AND v.fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT
        c.id,
        c.nombre,
        COALESCE(SUM(dv.cantidad), 0) AS cantidad_vendida,
        COALESCE(SUM(dv.cantidad * dv.precio_unitario), 0) AS total_vendido
       FROM categorias c
       INNER JOIN productos p ON c.id = p.id_categoria AND p.activo = 1
       INNER JOIN detalle_ventas dv ON p.id = dv.id_producto
       INNER JOIN ventas v ON dv.id_venta = v.id
       WHERE 1 = 1
       ${filtroVentas}
       GROUP BY c.id, c.nombre
       ORDER BY total_vendido DESC, cantidad_vendida DESC`,
    );

    return rows as VentaPorCategoria[];
  }
}
