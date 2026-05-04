export interface ProductosRelacionados {
  id_categoria: number;
  id_producto: number;
  nombre: string;
  precio_costo: number;
  stock_total: number;
  marca: string;
}

export interface categoriasInterface {
  id: number;
  nombre: string;
  Productos: ProductosRelacionados[];
}
export interface CrearCategoriasResponse {
  nombre: string;
}

export interface CategoriasCards {
  CategoriasProp: categoriasInterface[];
  CategoriaAEditar: (categoria: categoriasInterface) => void;
}
export interface CategoriaTabla {
  ProductosRelacionados: ProductosRelacionados[];
  onClose: () => void;
}
export interface EditarCategorias {
  categoria: categoriasInterface;
  onClose: () => void;
  onEdit: (categoria: categoriasInterface) => void;
}

export interface CrearCategoria {
  onAgregar: (categoria: CrearCategoriasResponse) => void;
}
