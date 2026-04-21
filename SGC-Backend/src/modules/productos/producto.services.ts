import { ProductoRepository } from "./producto.repository";
import { Producto } from "./producto.types";

export class ProductoService {
  static async obtenerProductos(): Promise<Producto[]> {
    const productos = await ProductoRepository.getAll();

    return productos;
  }
}
