export interface MetricasProveedores {
  total_proveedores: number;
  productos_asociados: number;
  stock_total: number;
  valor_inventario: number;
}

export interface ProveedorResumen {
  id: number;
  nombre: string;
  medio_contacto: string | null;
  nombre_contacto: string | null;
  dia_visita: string | null;
  cantidad_productos: number;
  stock_total: number;
  productos_criticos: number;
  valor_inventario: number;
}

export interface VentaPorProveedor {
  id: number;
  nombre: string;
  cantidad_vendida: number;
  total_vendido: number;
}

export interface ProductoCriticoProveedor {
  id: number;
  nombre: string;
  proveedor_nombre: string | null;
  stock_total: number;
  stock_minimo: number;
}

export interface ReporteProveedores {
  metricas: MetricasProveedores;
  proveedores: ProveedorResumen[];
  ventas_por_proveedor: VentaPorProveedor[];
  productos_criticos: ProductoCriticoProveedor[];
}
