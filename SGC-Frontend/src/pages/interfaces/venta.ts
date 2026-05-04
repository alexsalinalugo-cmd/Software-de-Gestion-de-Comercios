export interface DetalleVentaInput {
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}
export interface CrearVentaInput {
  id_caja: number;
  id_cliente: number | null;
  metodo_pago:
    | "Efectivo"
    | "Tarjeta Debito"
    | "Tarjeta Credito"
    | "Transferencia"
    | "Mercado Pago";
  productos: DetalleVentaInput[];
}

export interface Venta {
  id: number;
  id_caja: number;
  id_cliente: number | null;
  total: number;
  fecha: string;
  metodo_pago: string;
}

export interface ModificarDetalleVenta {
  id_detalle: number;
  cantidad_nueva: number;
  cantidad_anterior: number;
  id_producto: number;
  precio_unitario: number;
  id_venta: number;
}
