export interface MetricasProductos {
  total_productos: number;
  stock_total: number;
  productos_criticos: number;
  valor_inventario: number;
}

export interface ProductoCritico {
  id: number;
  nombre: string;
  stock_total: number;
  stock_minimo: number;
  categoria_nombre: string | null;
  proveedor_nombre: string | null;
}

export interface ProductoMasVendido {
  id: number;
  nombre: string;
  cantidad_vendida: number;
  total_vendido: number;
}

export interface StockPorCategoria {
  categoria_nombre: string;
  cantidad_productos: number;
  stock_total: number;
}

export interface ReporteProductos {
  metricas: MetricasProductos;
  productos_criticos: ProductoCritico[];
  mas_vendidos: ProductoMasVendido[];
  stock_por_categoria: StockPorCategoria[];
}
