import type {
  CrearVentaInput,
  ModificarDetalleVenta,
} from "../pages/interfaces/venta";
import type { AbrirCajaInput, CerrarCaja } from "../pages/interfaces/caja";

const API_VENTAS = "http://localhost:3000/api/ventas";
const API_CAJA = "http://localhost:3000/api/caja";
const API_REPORTES = "http://localhost:3000/api/reportes/ventas";

export class VentasServices {
  // --- CAJA ---
  static async abrirCaja(datos: AbrirCajaInput) {
    const res = await fetch(`${API_CAJA}/abrir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al abrir la caja");
    return await res.json();
  }

  static async cerrarCaja(datos: CerrarCaja) {
    const res = await fetch(`${API_CAJA}/cerrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al cerrar la caja");
    return await res.json();
  }

  static async obtenerEstadoCaja(id: number) {
    const res = await fetch(`${API_CAJA}/estado/${id}`);
    if (!res.ok) throw new Error("Error al obtener estado de caja");
    return await res.json();
  }

  // --- VENTAS ---
  static async crearVenta(datos: CrearVentaInput) {
    const res = await fetch(`${API_VENTAS}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al crear la venta");
    return await res.json();
  }

  static async obtenerVentasPorCaja(id_caja: number) {
    const res = await fetch(`${API_VENTAS}/caja/${id_caja}`);
    if (!res.ok) throw new Error("Error al obtener ventas");
    return await res.json();
  }

  static async obtenerDetalleVenta(id_venta: number) {
    const res = await fetch(`${API_VENTAS}/${id_venta}/detalle`);
    if (!res.ok) throw new Error("Error al obtener detalle");
    return await res.json();
  }

  static async modificarDetalleVenta(datos: ModificarDetalleVenta) {
    const res = await fetch(`${API_VENTAS}/detalle/modificar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al modificar detalle");
    return await res.json();
  }

  // --- REPORTES ---
  static async obtenerReporteVentas(periodo: string) {
    const res = await fetch(`${API_REPORTES}?periodo=${periodo}`);
    if (!res.ok) throw new Error("Error al obtener reporte");
    return await res.json();
  }
}
