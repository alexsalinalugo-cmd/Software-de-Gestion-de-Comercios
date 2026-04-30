const API_URL = "http://localhost:3000/api/categorias";

export class CategoriasServices {
  static async ObtenerConProductos() {
    const res = await fetch(`${API_URL}/categoriasCompleta`);
    if (!res.ok) throw new Error("Error al obtener Categorias");
    const data = res.json();
    return data;
  }
  static async ObtenerSimple() {
    const res = await fetch(`${API_URL}/categoriasNormales`);
    if (!res.ok) throw new Error("Error al obtener Categorias");
    const data = await res.json();
    return data;
  }
}
