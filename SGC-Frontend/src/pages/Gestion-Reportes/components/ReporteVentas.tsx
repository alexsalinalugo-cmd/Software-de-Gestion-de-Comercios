import { useState, useEffect } from "react";
import type {
  ReporteVentas,
  VentaHistorial,
} from "../../interfaces/reporteventas";
import {
  ReporteVentasService,
  type DetalleReporteVenta,
} from "../../../services/Gestion-ReportesServices/ReporteVentasService";

export default function ReporteVentas() {
  const [reporte, setReporte] = useState<ReporteVentas | null>(null);
  const [periodo, setPeriodo] = useState<string>("hoy");
  const [cargando, setCargando] = useState<boolean>(true);
  const [ventaSeleccionada, setVentaSeleccionada] =
    useState<VentaHistorial | null>(null);
  const [detalle, setDetalle] = useState<DetalleReporteVenta[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [cantidadNueva, setCantidadNueva] = useState<string>("");
  const [totalActual, setTotalActual] = useState<number>(0);

  useEffect(() => {
    const obtenerReporte = async () => {
      setCargando(true);
      try {
        const data = await ReporteVentasService.ObtenerReporte(periodo);
        setReporte(data);
      } catch (error) {
        console.log(error);
        setReporte(null);
      } finally {
        setCargando(false);
      }
    };
    obtenerReporte();
  }, [periodo]);

  const verDetalle = async (venta: VentaHistorial) => {
    setVentaSeleccionada(venta);
    setTotalActual(Number(venta.total));
    try {
      const data = await ReporteVentasService.ObtenerDetalleVenta(venta.id);
      setDetalle(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModificar = async (item: DetalleReporteVenta) => {
    console.log("ejecutando", item, cantidadNueva);
    if (!cantidadNueva || Number(cantidadNueva) <= 0) return;
    if (Number(cantidadNueva) >= Number(item.cantidad)) return;
    console.log("pasó las validaciones, haciendo fetch");
    try {
      await ReporteVentasService.ModificarDetalleVenta({
        id_detalle: item.id,
        cantidad_nueva: Number(cantidadNueva),
        cantidad_anterior: Number(item.cantidad),
        id_producto: item.id_producto,
        precio_unitario: Number(item.precio_unitario),
        id_venta: Number(ventaSeleccionada?.id),
      });

      const detalleActualizado = detalle.map((d) =>
        d.id === item.id ? { ...d, cantidad: Number(cantidadNueva) } : d,
      );
      setDetalle(detalleActualizado);

      const nuevoTotal = detalleActualizado.reduce(
        (suma, d) => suma + Number(d.cantidad) * Number(d.precio_unitario),
        0,
      );
      setTotalActual(nuevoTotal);

      setEditando(null);
      setCantidadNueva("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
        {/* Header */}
        <div className="sgc-page-header">
          <div>
            <p className="sgc-kicker">Control de caja</p>
            <h1 className="sgc-title">Reporte de ventas</h1>
            <p className="sgc-subtitle">Total vendido, métodos de pago e historial por período.</p>
          </div>
          <div className="flex gap-2 rounded-lg border border-orange-100 bg-orange-50/70 p-1">
            {["hoy", "7dias", "todo"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`rounded-md px-4 py-2 font-bold text-sm transition ${
                  periodo === p
                    ? "bg-orange-500 text-white"
                    : "text-slate-500 hover:bg-white hover:text-orange-700"
                }`}
              >
                {p === "hoy" ? "Hoy" : p === "7dias" ? "7 días" : "Todo"}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <div className="sgc-panel p-8 font-bold text-slate-500">Cargando reporte...</div>
        ) : reporte ? (
          <>
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">TOTAL VENDIDO</p>
                <p className="text-orange-700 font-black text-3xl">
                  {Number(reporte.metricas.total_vendido).toLocaleString(
                    "es-AR",
                    { style: "currency", currency: "ARS" },
                  )}
                </p>
              </div>
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">VENTAS REALIZADAS</p>
                <p className="text-slate-900 font-black text-3xl">
                  {reporte.metricas.cantidad_ventas}
                </p>
              </div>
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">TICKET PROMEDIO</p>
                <p className="text-green-400 font-black text-3xl">
                  {Number(reporte.metricas.ticket_promedio).toLocaleString(
                    "es-AR",
                    { style: "currency", currency: "ARS" },
                  )}
                </p>
              </div>
            </div>

            {/* Por método de pago */}
            <div className="sgc-panel p-6 mb-8">
              <h2 className="text-slate-900 font-black text-xl mb-4">
                POR MÉTODO DE PAGO
              </h2>
              <div className="flex flex-col gap-3">
                {reporte.por_metodo.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Sin ventas en este período
                  </p>
                ) : (
                  reporte.por_metodo.map((item) => (
                    <div
                      key={item.metodo_pago}
                    className="flex justify-between items-center border-b border-slate-200 pb-3"
                    >
                      <span className="text-slate-900 font-bold">
                        {item.metodo_pago}
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-orange-700 font-black">
                          {Number(item.total).toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {item.cantidad} ventas
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Historial */}
            <div className="sgc-panel p-6">
              <h2 className="text-slate-900 font-black text-xl mb-4">
                HISTORIAL DE VENTAS
              </h2>
              <div className="overflow-x-auto">
              <table className="sgc-table">
                <thead>
                  <tr>
                    <th className="pb-3">N°</th>
                    <th className="pb-3">FECHA</th>
                    <th className="pb-3">CAJA</th>
                    <th className="pb-3">PRODUCTOS</th>
                    <th className="pb-3">MÉTODO</th>
                    <th className="pb-3">TOTAL</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {reporte.historial.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-gray-500 text-sm text-center py-4"
                      >
                        Sin ventas en este período
                      </td>
                    </tr>
                  ) : (
                    reporte.historial.map((venta) => (
                      <tr
                        key={venta.id}
                        className="border-b border-slate-100"
                      >
                        <td className="py-3">#{venta.id}</td>
                        <td className="py-3 text-sm text-gray-400">
                          {new Date(venta.fecha).toLocaleString("es-AR")}
                        </td>
                        <td className="py-3 text-sm">Caja #{venta.id_caja}</td>
                        <td className="py-3 text-sm">
                          {venta.cantidad_productos} productos
                        </td>
                        <td className="py-3 text-sm">{venta.metodo_pago}</td>
                        <td className="py-3 text-orange-700 font-black">
                          {Number(venta.total).toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => verDetalle(venta)}
                            className="sgc-button-secondary min-h-0 px-3 py-1 text-xs"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </>
        ) : (
          <div className="sgc-panel p-8 font-bold text-slate-500">No se pudo cargar el reporte</div>
        )}
        </div>
      </div>

      {/* Modal detalle */}
      {ventaSeleccionada && (
        <div className="sgc-modal-backdrop">
          <div className="sgc-modal-card w-full max-w-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-slate-900 font-black text-xl">
                Venta #{ventaSeleccionada.id}
              </h2>
              <button
                onClick={() => {
                  setVentaSeleccionada(null);
                  setDetalle([]);
                  setEditando(null);
                }}
                className="text-gray-400 hover:text-orange-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {detalle.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-slate-200 pb-3"
                >
                  <div className="flex-1">
                    <p className="text-slate-900 text-sm font-bold">
                      {item.nombre}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {Number(item.cantidad)} x{" "}
                      {Number(item.precio_unitario).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </p>
                  </div>

                  {editando === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={cantidadNueva}
                        onChange={(e) => setCantidadNueva(e.target.value)}
                        placeholder="Nueva cant."
                        className="w-24 text-xs"
                        autoFocus
                      />
                      <button
                        onClick={() => handleModificar(item)}
                        className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs hover:bg-green-500/40"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setEditando(null);
                          setCantidadNueva("");
                        }}
                        className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs hover:bg-red-500/40"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <p className="text-orange-700 font-black">
                        {(
                          Number(item.cantidad) * Number(item.precio_unitario)
                        ).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </p>
                      <button
                        onClick={() => {
                          setEditando(item.id);
                          setCantidadNueva("");
                        }}
                        className="sgc-button-secondary min-h-0 px-2 py-1 text-xs"
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-slate-200 pt-4">
              <span className="text-gray-400 font-bold">TOTAL</span>
              <span className="text-slate-900 font-black text-xl">
                {totalActual.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
