import { pool } from "../../config/db";
import { AbrirCaja, Caja } from "./caja.types";

export class CajaRepository {
  static async abrirCaja(datos: AbrirCaja): Promise<Caja> {
    const [result] = await pool.execute(
      `INSERT INTO caja (monto_apertura, fecha_apertura, estado) 
       VALUES (?, NOW(), 'abierta')`,
      [datos.monto_apertura],
    );
    const id = (result as any).insertId;
    const caja = await this.obtenerCajaPorId(id);
    return caja!;
  }

  static async obtenerCajaPorId(id: number): Promise<Caja | null> {
    const [rows] = await pool.execute(`SELECT * FROM caja WHERE id = ?`, [id]);
    const cajas = rows as Caja[];
    return cajas[0] || null;
  }
}
