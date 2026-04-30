export interface Proveedores {
  id: number;
  cuit: number;
  nombre: string;
  medio_contacto: string;
  nombre_contacto: string;
  dia_visita: string;
}
export interface Productos {
  id_proveedor: number;
  nombre: string;
  precio_costo: number;
  stock_total: number;
  stock_minimo: number;
  unidad_medida: string;
}

export interface ProveedoresCompletos extends Proveedores {
  Productos: Productos[];
}
