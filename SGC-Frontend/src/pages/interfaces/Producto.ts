interface Proveedores {
  id_proveedor: number;
  proveedor_cuit: string;
  proveedor_nombre: string;
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

export interface Producto extends Proveedores, Ubicacion {
  id: number;
  nombre: string;
  precio_costo: number;
  precio_venta: number;
  unidad_medida: string;
  stock_total: number;
  stock_minimo: number;
  qr_code: string;
  id_categoria: number;
  categoria_nombre: string;
}

export interface TablaProducto {
  datos: Producto[];
  onEditar: (producto: Producto) => void;
  onEliminar: (id: number) => void;
}
export interface AgregarProducto {
  onAgregar: (producto: Producto) => void;
}
export interface EditarProducto {
  Producto: Producto;
  onActualizar: (producto: Producto) => void;
  onClose: () => void;
}
