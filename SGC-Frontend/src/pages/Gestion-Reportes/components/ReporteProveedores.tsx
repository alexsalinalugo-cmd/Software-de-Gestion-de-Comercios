import { useEffect, useState } from "react";
import type { ReporteProveedores } from "../../interfaces/reporteproveedores";
import { ReporteProveedoresService } from "../../../services/Gestion-ReportesServices/ReporteProveedoresService";

export default function ReporteProveedores() {
  const [reporte, setReporte] = useState<ReporteProveedores | null>(null);
  const [periodo, setPeriodo] = useState<string>("todo");
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerReporte = async () => {
      setCargando(true);
      try {
        const data = await ReporteProveedoresService.ObtenerReporte(periodo);
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

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="font-black text-4xl">REPORTE DE PROVEEDORES</h1>
          <div className="flex gap-2">
            {["hoy", "7dias", "todo"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                  periodo === p
                    ? "bg-green-400 text-black"
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">PROVEEDORES</p>
                <p className="text-white font-black text-3xl">
                  {reporte.metricas.total_proveedores}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">PRODUCTOS</p>
                <p className="text-green-400 font-black text-3xl">
                  {reporte.metricas.productos_asociados}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">STOCK TOTAL</p>
                <p className="text-blue-400 font-black text-3xl">
                  {Number(reporte.metricas.stock_total).toLocaleString("es-AR")}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">VALOR INVENTARIO</p>
                <p className="text-yellow-400 font-black text-3xl">
                  {Number(reporte.metricas.valor_inventario).toLocaleString(
                    "es-AR",
                    { style: "currency", currency: "ARS" },
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1e2130] rounded-xl p-6">
                <h2 className="text-white font-black text-xl mb-4">
                  VENTAS POR PROVEEDOR
                </h2>
                <div className="flex flex-col gap-3">
                  {reporte.ventas_por_proveedor.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      Sin ventas en este período
                    </p>
                  ) : (
                    reporte.ventas_por_proveedor.map((proveedor) => (
                      <div
                        key={proveedor.id}
                        className="flex justify-between items-center border-b border-gray-700 pb-3 gap-4"
                      >
                        <div>
                          <p className="text-white font-bold">
                            {proveedor.nombre}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {Number(proveedor.cantidad_vendida)} unidades
                          </p>
                        </div>
                        <span className="text-green-400 font-black whitespace-nowrap">
                          {Number(proveedor.total_vendido).toLocaleString(
                            "es-AR",
                            { style: "currency", currency: "ARS" },
                          )}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-[#1e2130] rounded-xl p-6">
                <h2 className="text-white font-black text-xl mb-4">
                  STOCK CRÍTICO POR PROVEEDOR
                </h2>
                <div className="flex flex-col gap-3">
                  {reporte.productos_criticos.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No hay productos críticos con proveedor
                    </p>
                  ) : (
                    reporte.productos_criticos.map((producto) => (
                      <div
                        key={producto.id}
                        className="flex justify-between items-center border-b border-gray-700 pb-3 gap-4"
                      >
                        <div>
                          <p className="text-white font-bold">
                            {producto.nombre}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {producto.proveedor_nombre || "Sin proveedor"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-red-400 font-black">
                            {Number(producto.stock_total)}
                          </p>
                          <p className="text-gray-500 text-xs">
                            mínimo {Number(producto.stock_minimo)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#1e2130] rounded-xl p-6">
              <h2 className="text-white font-black text-xl mb-4">
                DETALLE DE PROVEEDORES
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="text-gray-400 text-sm text-left border-b border-gray-700">
                      <th className="pb-3">PROVEEDOR</th>
                      <th className="pb-3">CONTACTO</th>
                      <th className="pb-3">PRODUCTOS</th>
                      <th className="pb-3">STOCK</th>
                      <th className="pb-3">CRÍTICOS</th>
                      <th className="pb-3">VALOR INVENTARIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.proveedores.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-gray-500 text-sm text-center py-4"
                        >
                          Sin proveedores cargados
                        </td>
                      </tr>
                    ) : (
                      reporte.proveedores.map((proveedor) => (
                        <tr
                          key={proveedor.id}
                          className="border-b border-gray-700 hover:bg-[#252840]"
                        >
                          <td className="py-3 font-bold">
                            {proveedor.nombre}
                          </td>
                          <td className="py-3 text-sm text-gray-400">
                            {proveedor.nombre_contacto ||
                              proveedor.medio_contacto ||
                              "Sin contacto"}
                          </td>
                          <td className="py-3 text-sm">
                            {proveedor.cantidad_productos}
                          </td>
                          <td className="py-3 text-blue-400 font-black">
                            {Number(proveedor.stock_total).toLocaleString(
                              "es-AR",
                            )}
                          </td>
                          <td className="py-3 text-red-400 font-black">
                            {proveedor.productos_criticos}
                          </td>
                          <td className="py-3 text-yellow-400 font-black">
                            {Number(proveedor.valor_inventario).toLocaleString(
                              "es-AR",
                              { style: "currency", currency: "ARS" },
                            )}
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
          <p className="text-gray-500">No se pudo cargar el reporte</p>
        )}
      </div>
    </section>
  );
}
