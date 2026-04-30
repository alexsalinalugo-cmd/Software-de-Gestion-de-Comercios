import type { Producto } from "../pages/interfaces/Producto";

const API_URL = "http://localhost:3000/api/productos";

export class ProductosServices {
  static async ObtenerTodos() {
    const res = await fetch(`${API_URL}/mostrar`);
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    return data;
  }

  static async AgregarProducto(Pro: Producto) {
    const res = await fetch(`${API_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Pro),
    });
    if (!res.ok) throw new Error("Error al agregar productos");
    const data = await res.json();
    return data;
  }

  static async EditarProductos(ProActualizado: Producto) {
    const res = await fetch(`${API_URL}/editar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProActualizado),
    });
    if (!res.ok) throw new Error("Error al editar productos");
    const data = await res.json();
    return data;
  }

  static async DesactivarProducto(id: number) {
    const res = await fetch(`${API_URL}/desactivar?id=${id}`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Error al agregar productos");
    const data = await res.json();
    return data;
  }
}
