// Métricas generales
export interface MetricasVentas {
  total_vendido: number;
  cantidad_ventas: number;
  ticket_promedio: number;
}

// Por método de pago
export interface VentasPorMetodo {
  metodo_pago: string;
  total: number;
  cantidad: number;
}

// Reporte completo
export interface ReporteVentas {
  metricas: MetricasVentas;
  por_metodo: VentasPorMetodo[];
}

export interface VentaHistorial {
  id: number;
  fecha: string;
  total: number;
  metodo_pago: string;
  id_caja: number;
  cantidad_productos: number;
}

export interface ReporteVentas {
  metricas: MetricasVentas;
  por_metodo: VentasPorMetodo[];
  historial: VentaHistorial[];
}
