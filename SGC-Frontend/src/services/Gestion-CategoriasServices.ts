import type {
  categoriasInterface,
  CrearCategoriasResponse,
} from "../pages/interfaces/categorias";

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
  static async CrearCategorias(Categorias: CrearCategoriasResponse) {
    const res = await fetch(`${API_URL}/categoriasCrear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Categorias),
    });
    console.log(res);
    if (!res.ok) throw new Error("Error al agregar Categorias");
    const data = await res.json();
    return data;
  }

  static async EditarCategoria(Categoria: categoriasInterface) {
    const res = await fetch(`${API_URL}/editar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Categoria),
    });
    if (!res.ok) throw new Error("Error al editar categoria");
    const data = await res.json();
    return data;
  }
}
