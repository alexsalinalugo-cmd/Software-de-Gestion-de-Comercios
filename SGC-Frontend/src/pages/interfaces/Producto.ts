import type { categoriasInterface } from "./categorias";
import type { MarcasInterface } from "./marca";
import type { ProveedoresInterface } from "./Proveedores";
import type { UbicacionesInterface } from "./ubicaciones";
interface Proveedores {
  id_proveedor: number;
  proveedor_cuit: string;
  proveedor_razon_social: string;
  proveedor_MedioContacto: string;
  proveedor_NombreContacto: string;
  proveedor_DiaVisita: string;
}
interface Ubicacion {
  id_ubicacion: number;
  sector: string;
  estanteria: string;
  posicion: string;
}
interface Marca {
  id_marca: number;
  marca_nombre: string;
}

export interface Producto extends Proveedores, Ubicacion, Marca {
  id: number;
  nombre: string;
  precio_costo: number;
  precio_venta: number;
  unidad_medida: string;
  stock_total: number;
  stock_minimo: number;
  codigo_barra: string;
  id_categoria: number;
  categoria_nombre: string;
  nombre_atributo: string;
  valor_atributo: string;
}

export interface TablaProducto {
  datos: Producto[];
  onEditar: (producto: Producto) => void;
  onEliminar: (id: number) => void;
  CategoriasProp: categoriasInterface[];
  ProveedorProp: ProveedoresInterface[];
  MarcasProp: MarcasInterface[];
}
export interface AgregarProducto {
  onAgregar: (producto: Producto) => void;
  CategoriasProp: categoriasInterface[];
  ProveedorProp: ProveedoresInterface[];
  MarcasProp: MarcasInterface[];
  UbicacionesProp: UbicacionesInterface[];
}
export interface EditarProducto {
  Producto: Producto;
  onActualizar: (producto: Producto) => void;
  onClose: () => void;
  CategoriasProp: categoriasInterface[];
  ProveedorProp: ProveedoresInterface[];
  MarcasProp: MarcasInterface[];
  UbicacionesProp: UbicacionesInterface[];
}
export interface Detalles {
  producto: Producto;
  onClose: () => void;
}
