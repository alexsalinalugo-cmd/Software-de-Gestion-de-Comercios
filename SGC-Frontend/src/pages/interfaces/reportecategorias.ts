export interface MetricasCategorias {
  total_categorias: number;
  productos_asociados: number;
  stock_total: number;
  total_vendido: number;
}

export interface CategoriaResumen {
  id: number;
  nombre: string;
  cantidad_productos: number;
  stock_total: number;
  productos_criticos: number;
  valor_inventario: number;
}

export interface VentaPorCategoria {
  id: number;
  nombre: string;
  cantidad_vendida: number;
  total_vendido: number;
}

export interface ReporteCategorias {
  metricas: MetricasCategorias;
  categorias: CategoriaResumen[];
  ventas_por_categoria: VentaPorCategoria[];
}
