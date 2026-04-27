import { pool } from "../../../config/db";
import { MetricasVentas, VentasPorMetodo } from "./reportes-ventas.types";

export class ReportesVentasRepository {
  static async obtenerMetricas(periodo: string): Promise<MetricasVentas> {
    let filtro = "";

    if (periodo === "hoy") {
      filtro = "WHERE DATE(fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtro = "WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT 
        COALESCE(SUM(total), 0) AS total_vendido,
        COUNT(*) AS cantidad_ventas,
        COALESCE(AVG(total), 0) AS ticket_promedio
       FROM ventas ${filtro}`,
    );

    return (rows as MetricasVentas[])[0];
  }

  static async obtenerPorMetodo(periodo: string): Promise<VentasPorMetodo[]> {
    let filtro = "";

    if (periodo === "hoy") {
      filtro = "WHERE DATE(fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtro = "WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT 
        metodo_pago,
        COALESCE(SUM(total), 0) AS total,
        COUNT(*) AS cantidad
       FROM ventas ${filtro}
       GROUP BY metodo_pago`,
    );

    return rows as VentasPorMetodo[];
  }

  static async obtenerHistorial(periodo: string): Promise<any[]> {
    let filtro = "";

    if (periodo === "hoy") {
      filtro = "WHERE DATE(v.fecha) = CURDATE()";
    } else if (periodo === "7dias") {
      filtro = "WHERE v.fecha >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
    }

    const [rows] = await pool.execute(
      `SELECT v.id, v.fecha, v.total, v.metodo_pago, v.id_caja,
        COUNT(dv.id) AS cantidad_productos
       FROM ventas v
       LEFT JOIN detalle_venta dv ON v.id = dv.id_venta
       ${filtro}
       GROUP BY v.id
       ORDER BY v.fecha DESC`,
    );

    return rows as any[];
  }
}
