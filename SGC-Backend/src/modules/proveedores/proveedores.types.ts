export interface Proveedores {
  id: number;
  cuit: number;
  razon_social: string;
  telefono: number;
  email: string;
  nombre_contacto: string;
  dia_visita: string;
}
export interface Productos {
  id_proveedor: number;
  nombre: string;
  precio_costo: number;
  stock_total: number;
}

export interface ProveedoresCompletos extends Proveedores {
  Productos: Productos[];
}
