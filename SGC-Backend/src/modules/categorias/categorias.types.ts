export interface CategoriasResponse {
  id: number;
  nombre: string;
}
export interface CategoriaCrear {
  nombre: string;
}
export interface Productos {
  id_categoria: number;
  id_producto: number;
  nombre: string;
  precio_costo: number;
  stock_total: number;
  marca: string;
}

export interface CategoriasResponseCompleta {
  Productos: Productos[];
}
