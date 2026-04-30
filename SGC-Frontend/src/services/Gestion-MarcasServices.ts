const API_URL = "http://localhost:3000/api/marcas";

export class MarcasServices {
  static async TraerMarcas() {
    const res = await fetch(`${API_URL}/mostrar`);
    if (!res.ok) throw new Error("Error al obtener marcas");
    const data = await res.json();
    return data;
  }
}
