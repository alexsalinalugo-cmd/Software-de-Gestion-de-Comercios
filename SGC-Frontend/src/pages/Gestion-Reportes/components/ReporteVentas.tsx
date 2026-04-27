import { useState, useEffect } from "react";
import type {
  ReporteVentas,
  VentaHistorial,
} from "../../interfaces/reporteventas";

export default function ReporteVentas() {
  const [reporte, setReporte] = useState<ReporteVentas | null>(null);
  const [periodo, setPeriodo] = useState<string>("hoy");
  const [cargando, setCargando] = useState<boolean>(true);
  const [ventaSeleccionada, setVentaSeleccionada] =
    useState<VentaHistorial | null>(null);
  const [detalle, setDetalle] = useState<any[]>([]);

  useEffect(() => {
    const obtenerReporte = async () => {
      setCargando(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/reportes/ventas?periodo=${periodo}`,
        );
        if (res.ok) {
          const data = await res.json();
          setReporte(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerReporte();
  }, [periodo]);

  const verDetalle = async (venta: VentaHistorial) => {
    setVentaSeleccionada(venta);
    try {
      const res = await fetch(
        `http://localhost:3000/api/ventas/${venta.id}/detalle`,
      );
      if (res.ok) {
        const data = await res.json();
        setDetalle(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="font-black text-4xl">REPORTE DE VENTAS</h1>
          <div className="flex gap-2">
            {["hoy", "7dias", "todo"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                  periodo === p
                    ? "bg-yellow-400 text-black"
                    : "bg-[#1e2130] text-gray-400 hover:bg-[#252840]"
                }`}
              >
                {p === "hoy" ? "Hoy" : p === "7dias" ? "7 días" : "Todo"}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <p className="text-gray-400">Cargando reporte...</p>
        ) : reporte ? (
          <>
            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">TOTAL VENDIDO</p>
                <p className="text-yellow-400 font-black text-3xl">
                  {Number(reporte.metricas.total_vendido).toLocaleString(
                    "es-AR",
                    { style: "currency", currency: "ARS" },
                  )}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">VENTAS REALIZADAS</p>
                <p className="text-white font-black text-3xl">
                  {reporte.metricas.cantidad_ventas}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
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
            <div className="bg-[#1e2130] rounded-xl p-6 mb-8">
              <h2 className="text-white font-black text-xl mb-4">
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
                      className="flex justify-between items-center border-b border-gray-700 pb-3"
                    >
                      <span className="text-white font-bold">
                        {item.metodo_pago}
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-yellow-400 font-black">
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
            <div className="bg-[#1e2130] rounded-xl p-6">
              <h2 className="text-white font-black text-xl mb-4">
                HISTORIAL DE VENTAS
              </h2>
              <table className="w-full text-white">
                <thead>
                  <tr className="text-gray-400 text-sm text-left border-b border-gray-700">
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
                        className="border-b border-gray-700 hover:bg-[#252840]"
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
                        <td className="py-3 text-yellow-400 font-black">
                          {Number(venta.total).toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => verDetalle(venta)}
                            className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs hover:bg-blue-500/40 transition"
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
          </>
        ) : (
          <p className="text-gray-500">No se pudo cargar el reporte</p>
        )}
      </div>

      {/* Modal detalle */}
      {ventaSeleccionada && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-black text-xl">
                Venta #{ventaSeleccionada.id}
              </h2>
              <button
                onClick={() => {
                  setVentaSeleccionada(null);
                  setDetalle([]);
                }}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {detalle.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-3"
                >
                  <div>
                    <p className="text-white text-sm font-bold">
                      Producto #{item.id_producto}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {Number(item.cantidad)} x{" "}
                      {Number(item.precio_unitario).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </p>
                  </div>
                  <p className="text-yellow-400 font-black">
                    {(
                      Number(item.cantidad) * Number(item.precio_unitario)
                    ).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-gray-700 pt-4">
              <span className="text-gray-400 font-bold">TOTAL</span>
              <span className="text-white font-black text-xl">
                {Number(ventaSeleccionada.total).toLocaleString("es-AR", {
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
