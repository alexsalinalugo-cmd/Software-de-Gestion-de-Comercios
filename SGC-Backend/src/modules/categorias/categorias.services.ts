import { pool } from "../../config/db";
import { CategoriasRepository } from "./categorias.repository";
import {
  CategoriasResponseCompleta,
  CategoriasResponse,
  CategoriaCrear,
} from "./categorias.types";

export class CategoriasServices {
  static async MostrarRelaServices(): Promise<CategoriasResponseCompleta[]> {
    const conexion = await pool.getConnection();
    try {
      // beginTransaction (no hace falta para lectura)
      const Categorias = await CategoriasRepository.getAll(conexion);
      const Productos = await CategoriasRepository.Productos(conexion);

      const Filtrado: CategoriasResponseCompleta[] = Categorias.map((cat) => ({
        ...cat,
        Productos: Productos.filter((p) => p.id_categoria === cat.id),
      }));

      return Filtrado;
    } catch (error) {
      throw error;
    } finally {
      conexion.release();
    }
  }
  static async MostrarCategoriasServices(): Promise<CategoriasResponse[]> {
    const conexion = await pool.getConnection();
    try {
      // beginTransaction (no hace falta para lectura)
      const Categorias = await CategoriasRepository.getAll(conexion);

      return Categorias;
    } catch (error) {
      throw error;
    } finally {
      conexion.release();
    }
  }
  static async CrearCategoriasService(
    Data: CategoriaCrear,
  ): Promise<CategoriasResponse> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
      const idCreadoCategoria = await CategoriasRepository.CrearCategoria(
        conexion,
        Data,
      );
      const Categoria = await CategoriasRepository.buscarCategoriaPorId(
        conexion,
        idCreadoCategoria,
      );
      await conexion.commit();
      return Categoria;
    } catch (error) {
      await conexion.rollback();
      throw error;
    } finally {
      conexion.release();
    }
  }
  static async CategoriasEditarService(
    Datos: CategoriasResponse,
  ): Promise<CategoriasResponseCompleta> {
    const conexion = await pool.getConnection();
    try {
      await conexion.beginTransaction();
      const idPCategoriaEditado = await CategoriasRepository.EditarCategoria(
        conexion,
        Datos,
      );
      const Productos = await CategoriasRepository.Productos(conexion);
      const CategoriaEditado = await CategoriasRepository.buscarCategoriaPorId(
        conexion,
        idPCategoriaEditado,
      );

      const Filtrado: CategoriasResponseCompleta = {
        ...CategoriaEditado,
        Productos: Productos.filter(
          (p) => p.id_categoria === CategoriaEditado.id,
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
