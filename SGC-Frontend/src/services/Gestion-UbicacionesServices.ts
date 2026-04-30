const API_URL = "http://localhost:3000/api/ubicaciones";

export class UbicacionesServices {
  static async MostrarUbicaciones() {
    const res = await fetch(`${API_URL}/mostrar`);
    if (!res) throw new Error("Error al obtener marcas");
    const data = await res.json();
    return data;
  }
}
