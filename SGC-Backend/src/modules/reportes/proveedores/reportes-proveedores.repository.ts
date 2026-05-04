import { pool } from "../../../config/db";
import {
  MetricasProveedores,
  ProductoCriticoProveedor,
  ProveedorResumen,
  VentaPorProveedor,
} from "./reportes-proveedores.types";

export class ReportesProveedoresRepository {
  static async obtenerMetricas(): Promise<MetricasProveedores> {
    const [rows] = await pool.execute(
      `SELECT
        (SELECT COUNT(*) FROM proveedores) AS total_proveedores,
        (SELECT COUNT(*) FROM productos WHERE activo = 1 AND id_proveedor IS NOT NULL) AS productos_asociados,
        (SELECT COALESCE(SUM(stock_total), 0) FROM productos WHERE activo = 1 AND id_proveedor IS NOT NULL) AS stock_total,
        (SELECT COALESCE(SUM(stock_total * precio_costo), 0) FROM productos WHERE activo = 1 AND id_proveedor IS NOT NULL) AS valor_inventario`,
    );

    return (rows as MetricasProveedores[])[0];
  }

  static async obtenerProveedores(): Promise<ProveedorResumen[]> {
    const [rows] = await pool.execute(
      `SELECT
        pr.id,
        pr.nombre,
        pr.medio_contacto,
        pr.nombre_contacto,
        pr.dia_visita,
        COUNT(p.id) AS cantidad_productos,
        COALESCE(SUM(p.stock_total), 0) AS stock_total,
        COALESCE(SUM(CASE WHEN p.stock_total <= p.stock_minimo THEN 1 ELSE 0 END), 0) AS productos_criticos,
        COALESCE(SUM(p.stock_total * p.precio_costo), 0) AS valor_inventario
       FROM proveedores pr
       LEFT JOIN productos p ON pr.id = p.id_proveedor AND p.activo = 1
       GROUP BY pr.id, pr.nombre, pr.medio_contacto, pr.nombre_contacto, pr.dia_visita
       ORDER BY cantidad_productos DESC, pr.nombre ASC`,
    );

    return rows as ProveedorResumen[];
  }

  static async obtenerVentasPorProveedor(
    periodo: string,
  ): Promise<VentaPorProveedor[]> {
    let filtroVentas = "";

    if (periodo === "hoy") {
      filtroVentas = "AND DATE(v.fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtroVentas = "AND v.fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT
        pr.id,
        pr.nombre,
        COALESCE(SUM(dv.cantidad), 0) AS cantidad_vendida,
        COALESCE(SUM(dv.cantidad * dv.precio_unitario), 0) AS total_vendido
       FROM proveedores pr
       INNER JOIN productos p ON pr.id = p.id_proveedor AND p.activo = 1
       INNER JOIN detalle_ventas dv ON p.id = dv.id_producto
       INNER JOIN ventas v ON dv.id_venta = v.id
       WHERE 1 = 1
       ${filtroVentas}
       GROUP BY pr.id, pr.nombre
       ORDER BY total_vendido DESC, cantidad_vendida DESC`,
    );

    return rows as VentaPorProveedor[];
  }

  static async obtenerProductosCriticos(): Promise<ProductoCriticoProveedor[]> {
    const [rows] = await pool.execute(
      `SELECT
        p.id,
        p.nombre,
        pr.nombre AS proveedor_nombre,
        p.stock_total,
        p.stock_minimo
       FROM productos p
       LEFT JOIN proveedores pr ON p.id_proveedor = pr.id
       WHERE p.activo = 1
         AND p.id_proveedor IS NOT NULL
         AND p.stock_total <= p.stock_minimo
       ORDER BY p.stock_total ASC, p.nombre ASC`,
    );

    return rows as ProductoCriticoProveedor[];
  }
}
