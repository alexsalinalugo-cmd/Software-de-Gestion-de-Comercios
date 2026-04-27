// Tipo 1 - Un item del detalle de la venta
export interface DetalleVentaInput {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

// Tipo 2 - Para crear una venta completa
export interface CrearVenta {
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

// Tipo 3 - El detalle completo de la base de datos
export interface DetalleVenta {
  id: number;
  id_venta: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

// Tipo 4 - La venta completa de la base de datos
export interface Venta {
  id: number;
  id_caja: number;
  id_cliente: number | null;
  total: number;
  fecha: Date;
  metodo_pago: "efectivo" | "tarjeta" | "transferencia";
}
