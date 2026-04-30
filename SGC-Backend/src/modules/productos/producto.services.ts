import { pool } from "../../config/db";
import { NormalizarTexto } from "../../shared/utils/Normalizar";
import { CategoriasRepository } from "../categorias/categorias.repository";
import { MarcasRepository } from "../marcas/marca.repository";
import { ProveedoresRepository } from "../proveedores/proveedores.repository";
import { UbicacionesRepository } from "../ubicaciones/ubicaciones.repository";
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
      let IdUbicacion = Datos.id_ubicacion;
      let IdCategoria = Datos.id_categoria;
      let IdProveedor = Datos.id_proveedor;
      let IdMarca = Datos.id_marca;

      if (Datos.marca_nombre) {
        const NombreMarca = NormalizarTexto(Datos.marca_nombre);
        const idexistente = await MarcasRepository.BuscarMarcasXNombres(
          conexion,
          NombreMarca,
        );
        if (idexistente) {
          IdMarca = idexistente;
        } else {
          IdMarca = await MarcasRepository.CrearMarcasRepository(
            conexion,
            NombreMarca,
          );
        }
      }

      if (Datos.categoria_nombre) {
        const NombreDCategoria = NormalizarTexto(Datos.categoria_nombre);
        const idExistente = await CategoriasRepository.buscarCategoriaPorNombre(
          conexion,
          NombreDCategoria,
        );
        if (idExistente) {
          IdCategoria = idExistente;
        } else {
          IdCategoria = await CategoriasRepository.CrearCategoria(
            conexion,
            NombreDCategoria,
          );
        }
      }
      if (Datos.proveedor_nombre) {
        const NombreProveedor = NormalizarTexto(Datos.proveedor_nombre);
        const idExistente = await ProveedoresRepository.BuscarProveedor(
          conexion,
          NombreProveedor,
        );
        if (idExistente) {
          IdProveedor = idExistente;
        } else {
          IdProveedor = await ProveedoresRepository.CrearProveedores(
            conexion,
            NombreProveedor,
          );
        }
      }
      if (Datos.ubicacion_sector) {
        const Sector = NormalizarTexto(Datos.ubicacion_sector);
        const Estanteria = Datos.ubicacion_estanteria
          ? NormalizarTexto(Datos.ubicacion_estanteria)
          : "";
        const Posicion = Datos.ubicacion_posicion
          ? NormalizarTexto(Datos.ubicacion_posicion)
          : "";
        const idExistente = await UbicacionesRepository.BuscarUbicaciones(
          conexion,
          Sector,
          Estanteria,
          Posicion,
        );
        if (idExistente) {
          IdUbicacion = idExistente;
        } else {
          IdUbicacion = await UbicacionesRepository.CrearUbicacion(
            conexion,
            Datos.ubicacion_sector,
            Datos.ubicacion_estanteria,
            Datos.ubicacion_posicion,
          );
        }
      }
      const IdProducto = await ProductoRepository.create(conexion, {
        ...Datos,
        id_categoria: IdCategoria,
        id_proveedor: IdProveedor,
        id_ubicacion: IdUbicacion,
        id_marca: IdMarca,
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
        const Sector = NormalizarTexto(Datos.ubicacion_sector);
        const Estanteria = Datos.ubicacion_estanteria
          ? NormalizarTexto(Datos.ubicacion_estanteria)
          : "";
        const Posicion = Datos.ubicacion_posicion
          ? NormalizarTexto(Datos.ubicacion_posicion)
          : "";
        const idExistente = await UbicacionesRepository.BuscarUbicaciones(
          conexion,
          Sector,
          Estanteria,
          Posicion,
        );
        if (idExistente) {
          IdUbicacion = idExistente;
        } else {
          IdUbicacion = await UbicacionesRepository.CrearUbicacion(
            conexion,
            Datos.ubicacion_sector,
            Datos.ubicacion_estanteria,
            Datos.ubicacion_posicion,
          );
        }
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
