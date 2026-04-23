import { ProductoRepository } from "./producto.repository";
import { Producto } from "./producto.types";

export class ProductoService {
  static async obtenerProductos(): Promise<Producto[]> {
    const productos = await ProductoRepository.getAll();

    return productos;
  }
  static async AgregarProductos(Datos: Producto): Promise<Producto> {
    const res = await ProductoRepository.create(Datos);
    return res;
  }
  static async EditarProductos(Datos: Producto): Promise<Producto> {
    const res = await ProductoRepository.edit(Datos);
    return res;
  }
  static async EliminarProductos(id: number): Promise<boolean> {
    const res = await ProductoRepository.delete(id);
    return res;
  }
}
