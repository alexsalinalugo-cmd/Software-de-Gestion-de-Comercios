import { pool } from "../../config/db";
import { AbrirCaja, CerrarCaja, Caja } from "./caja.types";

export class CajaRepository {
  static async abrirCaja(datos: AbrirCaja): Promise<Caja> {
    const [result] = await pool.execute(
      `INSERT INTO cajas (monto_apertura, fecha_apertura, estado) 
       VALUES (?, NOW(), 'abierta')`,
      [datos.monto_apertura],
    );
    const id = (result as any).insertId;
    const caja = await this.obtenerCajaPorId(id);
    return caja!;
  }

  static async obtenerCajaPorId(id: number): Promise<Caja | null> {
    const [rows] = await pool.execute(`SELECT * FROM cajas WHERE id = ?`, [id]);
    const cajas = rows as Caja[];
    return cajas[0] || null;
  }

  static async cerrarCaja(datos: CerrarCaja): Promise<Caja | null> {
    await pool.execute(
      `UPDATE cajas SET monto_cierre = ?, fecha_cierre = NOW(), estado = 'cerrada' 
       WHERE id = ?`,
      [datos.monto_cierre, datos.id_caja],
    );
    return this.obtenerCajaPorId(datos.id_caja);
  }

  static async obtenerEstadoCaja(id: number): Promise<Caja | null> {
    const [rows] = await pool.execute(`SELECT * FROM cajas WHERE id = ?`, [id]);
    const cajas = rows as Caja[];
    return cajas[0] || null;
  }
}
