export interface CategoriasResponse {
  id: number;
  nombre: string;
}
export interface Productos {
  id_categoria: number;
  nombre: string;
  precio_venta: number;
}

export interface CategoriasResponseCompleta extends CategoriasResponse {
  Productos: Productos[];
}
