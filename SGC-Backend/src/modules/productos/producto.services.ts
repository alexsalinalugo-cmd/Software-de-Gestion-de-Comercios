import { pool } from "../../config/db";
import { ProductoRepository } from "./producto.repository";
import { CrearProducto, Producto } from "./producto.types";

export class ProductoService {
  static async obtenerProductos(): Promise<Producto[]> {
    const productos = await ProductoRepository.getAll();

    return productos;
  }

  static async AgregarProductos(Datos: CrearProducto): Promise<Producto> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
      let IdUbicacion: number | null = null;
      let IdCategoria = Datos.id_categoria;
      let IdProveedor = Datos.id_proveedor;
      if (Datos.categoria_nombre) {
        IdCategoria = await ProductoRepository.CrearCategoria(
          conexion,
          Datos.categoria_nombre,
        );
      }
      if (Datos.proveedor_nombre) {
        IdProveedor = await ProductoRepository.CrearProveedores(
          conexion,
          Datos.proveedor_nombre,
        );
      }
      if (Datos.ubicacion_sector) {
        IdUbicacion = await ProductoRepository.CrearUbicacion(
          conexion,
          Datos.ubicacion_sector,
          Datos.ubicacion_estanteria,
          Datos.ubicacion_posicion,
        );
      }
      const IdProducto = await ProductoRepository.create(conexion, {
        ...Datos,
        id_categoria: IdCategoria,
        id_proveedor: IdProveedor,
        id_ubicacion: IdUbicacion,
      });
      await ProductoRepository.insertarStock(
        conexion,
        IdProducto,
        Datos.stock_total,
      );
      const NuevoProductos = await ProductoRepository.getbyid(
        conexion,
        IdProducto,
      );
      await conexion.commit();

      return NuevoProductos;
    } catch (error) {
      await conexion.rollback();
      console.error("DEBUG ERROR:", error); // Esto te va a decir la verdad en la consola
      throw error;
    } finally {
      conexion.release();
    }
  }

  static async EditarProductos(Datos: Producto): Promise<Producto> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
      let IdUbicacion = Datos.id_ubicacion;
      if (Datos.ubicacion_sector && !Datos.id_ubicacion) {
        IdUbicacion = await ProductoRepository.CrearUbicacion(
          conexion,
          Datos.ubicacion_sector,
          Datos.ubicacion_estanteria,
          Datos.ubicacion_posicion,
        );
      } else if (IdUbicacion) {
        IdUbicacion = await ProductoRepository.ActualizarUbicacion(
          conexion,
          IdUbicacion,
          Datos.ubicacion_sector,
          Datos.ubicacion_estanteria,
          Datos.ubicacion_posicion,
        );
      }
      const IdProducto = await ProductoRepository.edit(conexion, {
        ...Datos,
        id_ubicacion: IdUbicacion,
      });
      await ProductoRepository.ActualizarStock(
        conexion,
        IdProducto,
        Datos.stock_total,
      );

      const NuevoProductos = await ProductoRepository.getbyid(
        conexion,
        IdProducto,
      );
      await conexion.commit();

      return NuevoProductos;
    } catch (error) {
      await conexion.rollback();
      console.error("DEBUG ERROR:", error); // Esto te va a decir la verdad en la consola
      throw error;
    } finally {
      conexion.release();
    }
  }

  static async DesactivarProductos(id: number): Promise<boolean> {
    const res = await ProductoRepository.Desactivar(id);
    return res;
  }
}
