import { CajaRepository } from "./caja.repository";
import { AbrirCaja, Caja } from "./caja.types";

export class CajaService {
  static async abrirCaja(datos: AbrirCaja): Promise<Caja> {
    if (datos.monto_apertura <= 0) {
      throw new Error("El monto de apertura debe ser mayor a cero");
    }

    const caja = await CajaRepository.abrirCaja(datos);
    return caja;
  }
}
