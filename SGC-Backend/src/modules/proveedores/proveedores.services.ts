import { pool } from "../../config/db";
import { ProveedoresRepository } from "./proveedores.repository";
import { Proveedores, ProveedoresCompletos } from "./proveedores.types";

export class ProveedoresServices {
  static async MostrarProveedoresService(): Promise<Proveedores[]> {
    const conexion = await pool.getConnection();
    try {
      const Proveedores =
        await ProveedoresRepository.MostrarProveedores(conexion);
      return Proveedores;
    } catch (error) {
      throw error;
    } finally {
      conexion.release();
    }
  }
  static async ProveedoresCompletoService(): Promise<ProveedoresCompletos[]> {
    const conexion = await pool.getConnection();
    try {
      const Productos = await ProveedoresRepository.Productos(conexion);
      const Proveedores =
        await ProveedoresRepository.MostrarProveedores(conexion);
      const Filtrado: ProveedoresCompletos[] = Proveedores.map((pr) => ({
        ...pr,
        Productos: Productos.filter((p) => p.id_proveedor === pr.id),
      }));

      return Filtrado;
    } catch (error) {
      throw error;
    } finally {
      conexion.release();
    }
  }
}
