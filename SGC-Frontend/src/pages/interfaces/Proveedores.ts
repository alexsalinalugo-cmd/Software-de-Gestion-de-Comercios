interface Producto {
  id_proveedor: number;
  id_producto: number;
  nombre: string;
  precio_costo: number;
  stock_total: number;
  marca: string;
}

export interface ProveedoresInterface {
  id: number;
  cuit: string;
  razon_social: string;
  telefono: string;
  email: string;
  nombre_contacto: string;
  dia_visita: string;
  Productos: Producto[];
}

export interface ProveedoresCardsInterface {
  ProveedoresProp: ProveedoresInterface[];
  ProveedorElegido: (proveedor: Proveedor) => void;
}

export interface TablaProductosRelacionados {
  ProductosRelacionados: Producto[];
  onClose: () => void;
}
export interface Proveedor {
  id: number;
  cuit: string;
  razon_social: string;
  telefono: string;
  email: string;
  nombre_contacto: string;
  dia_visita: string;
}

export interface AgregarProveedores {
  onAgregar: (proveedor: Proveedor) => void;
}
export interface EditarInterface {
  onEdit: (proveedor: Proveedor) => void;
  Proveedor: Proveedor;
  onClose: () => void;
}
