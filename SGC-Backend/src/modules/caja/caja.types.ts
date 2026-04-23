//Para abrir la caja
export interface AbrirCaja {
  monto_apertura: number;
}
// Para cerrar la caja
export interface CerrarCaja {
  id_caja: number;
  monto_cierre: number;
}

//  La caja completa
export interface Caja {
  id: number;
  monto_apertura: number;
  monto_cierre: number | null;
  fecha_apertura: Date;
  fecha_cierre: Date | null;
  estado: "abierta" | "cerrada";
}
