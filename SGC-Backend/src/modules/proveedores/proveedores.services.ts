import { pool } from "../../config/db";
import { ProveedoresRepository } from "./proveedores.repository";
import { Proveedores, ProveedoresCompletos } from "./proveedores.types";

export class ProveedoresServices {
  static async MostrarProveedoresService(): Promise<Proveedores[]> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
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
      await conexion.beginTransaction();
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
  static async ProveedoresCrearService(
    Datos: Proveedores,
  ): Promise<Proveedores> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
      const idProveedorCreado = await ProveedoresRepository.CrearProveedores(
        conexion,
        Datos,
      );
      const ProveedorCreado = await ProveedoresRepository.BuscarProveedorxid(
        conexion,
        idProveedorCreado,
      );
      await conexion.commit();
      return ProveedorCreado;
    } catch (error) {
      await conexion.rollback();
      throw error;
    } finally {
      conexion.release();
    }
  }
  static async ProveedoresEditarService(
    Datos: Proveedores,
  ): Promise<ProveedoresCompletos> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
      const idProveedorEditado = await ProveedoresRepository.EditarProveedor(
        conexion,
        Datos,
      );
      const Productos = await ProveedoresRepository.Productos(conexion);
      const ProveedorEditado = await ProveedoresRepository.BuscarProveedorxid(
        conexion,
        idProveedorEditado,
      );
      const Filtrado: ProveedoresCompletos = {
        ...ProveedorEditado,
        Productos: Productos.filter(
          (p) => p.id_proveedor === ProveedorEditado.id,
        ),
      };
      await conexion.commit();
      return Filtrado;
    } catch (error) {
      await conexion.rollback();
      throw error;
    } finally {
      conexion.release();
    }
  }
}
