import { CajaRepository } from "./caja.repository";
import { AbrirCaja, CerrarCaja, Caja } from "./caja.types";

export class CajaService {
  static async abrirCaja(datos: AbrirCaja): Promise<Caja> {
    if (datos.monto_apertura <= 0) {
      throw new Error("El monto de apertura debe ser mayor a cero");
    }

    const caja = await CajaRepository.abrirCaja(datos);
    return caja;
  }

  static async cerrarCaja(datos: CerrarCaja): Promise<Caja | null> {
    if (datos.monto_cierre < 0) {
      throw new Error("El monto de cierre no puede ser negativo");
    }

    const caja = await CajaRepository.obtenerCajaPorId(datos.id_caja);

    if (!caja) {
      throw new Error("La caja no existe");
    }

    if (caja.estado === "cerrada") {
      throw new Error("La caja ya está cerrada");
    }

    return await CajaRepository.cerrarCaja(datos);
  }

  static async obtenerEstadoCaja(id: number): Promise<Caja | null> {
    const caja = await CajaRepository.obtenerEstadoCaja(id);

    if (!caja) {
      throw new Error("La caja no existe");
    }

    return caja;
  }
}
