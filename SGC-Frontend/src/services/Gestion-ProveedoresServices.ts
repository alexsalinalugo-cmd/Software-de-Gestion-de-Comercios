const API_URL = "http://localhost:3000/api/proveedores";

export class proveedoresServices {
  static async TraerTodos() {
    const res = await fetch(`${API_URL}/mostrar`);
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    return data;
  }
}
