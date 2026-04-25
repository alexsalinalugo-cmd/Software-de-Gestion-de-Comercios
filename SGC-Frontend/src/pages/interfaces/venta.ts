export interface DetalleVentaInput {
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}

export interface CrearVentaInput {
  id_caja: number;
  id_cliente: number | null;
  metodo_pago: "efectivo" | "tarjeta" | "transferencia";
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
