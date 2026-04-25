export interface Caja {
  id: number;
  monto_apertura: number;
  monto_cierre: number | null;
  fecha_apertura: string;
  fecha_cierre: string | null;
  estado: "abierta" | "cerrada";
}

export interface AbrirCajaInput {
  monto_apertura: number;
}
