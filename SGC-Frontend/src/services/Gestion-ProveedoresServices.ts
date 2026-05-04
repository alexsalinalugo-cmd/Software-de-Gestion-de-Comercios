import type { Proveedor } from "../pages/interfaces/Proveedores";

const API_URL = "http://localhost:3000/api/proveedores";

export class proveedoresServices {
  static async TraerTodos() {
    const res = await fetch(`${API_URL}/proveedoresCompletas`);
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    return data;
  }
  static async CrearProveedores(Proveedor: Proveedor) {
    const res = await fetch(`${API_URL}/crearProveedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Proveedor),
    });
    if (!res.ok) throw new Error("Error al agregar proveedores");
    const data = await res.json();
    return data;
  }
  static async EditarProveedores(Proveedor: Proveedor) {
    const res = await fetch(`${API_URL}/editarProveedores`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Proveedor),
    });
    if (!res.ok) throw new Error("Error al editar proveedores");
    const data = await res.json();
    return data;
  }
}
