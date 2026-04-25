import { CajaRepository } from "../caja/caja.repository";
import { VentasRepository } from "./ventas.repository";
import { CrearVenta, DetalleVenta, Venta } from "./ventas.types";
import { pool } from "../../config/db";

export class VentasService {
  static async crearVenta(datos: CrearVenta): Promise<Venta> {
    // 1. Verificar que la caja existe y está abierta
    const caja = await CajaRepository.obtenerCajaPorId(datos.id_caja);
    if (!caja) {
      throw new Error("La caja no existe");
    }
    if (caja.estado === "cerrada") {
      throw new Error("La caja está cerrada, no se pueden registrar ventas");
    }

    // 2. Verificar que hay productos
    if (datos.productos.length === 0) {
      throw new Error("La venta debe tener al menos un producto");
    }

    // 3. Calcular el total
    const total = datos.productos.reduce((suma, producto) => {
      return suma + producto.cantidad * producto.precio_unitario;
    }, 0);

    // 4. Ejecutar la transaccion
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();

      const venta = await VentasRepository.crearVenta(datos, total);
      await VentasRepository.crearDetalleVenta(venta.id, datos);
      await VentasRepository.descontarStock(datos);

      await conexion.commit();
      return venta;
    } catch (error) {
      await conexion.rollback();
      throw new Error("Error al registrar la venta");
    } finally {
      conexion.release();
    }
  }

  static async obtenerVentasPorCaja(id_caja: number): Promise<Venta[]> {
    const caja = await CajaRepository.obtenerCajaPorId(id_caja);

    if (!caja) {
      throw new Error("La caja no existe");
    }

    return await VentasRepository.obtenerVentasPorCaja(id_caja);
  }

  static async obtenerDetalleVenta(id_venta: number): Promise<DetalleVenta[]> {
    const [rows] = await pool.execute(`SELECT * FROM ventas WHERE id = ?`, [
      id_venta,
    ]);
    const venta = (rows as Venta[])[0];

    if (!venta) {
      throw new Error("La venta no existe");
    }

    return await VentasRepository.obtenerDetalleVenta(id_venta);
  }
}
