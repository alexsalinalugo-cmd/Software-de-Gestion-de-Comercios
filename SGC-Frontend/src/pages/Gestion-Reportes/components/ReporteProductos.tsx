import { useEffect, useState } from "react";
import type { ReporteProductos } from "../../interfaces/reporteproductos";
import { ReporteProductosService } from "../../../services/Gestion-ReportesServices/ReporteProductosService";

export default function ReporteProductos() {
  const [reporte, setReporte] = useState<ReporteProductos | null>(null);
  const [periodo, setPeriodo] = useState<string>("todo");
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerReporte = async () => {
      setCargando(true);
      try {
        const data = await ReporteProductosService.ObtenerReporte(periodo);
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
          <h1 className="font-black text-4xl">REPORTE DE PRODUCTOS</h1>
          <div className="flex gap-2">
            {["hoy", "7dias", "todo"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                  periodo === p
                    ? "bg-blue-400 text-black"
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
                <p className="text-gray-400 text-sm mb-2">PRODUCTOS ACTIVOS</p>
                <p className="text-white font-black text-3xl">
                  {reporte.metricas.total_productos}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">STOCK TOTAL</p>
                <p className="text-blue-400 font-black text-3xl">
                  {Number(reporte.metricas.stock_total).toLocaleString("es-AR")}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">STOCK CRÍTICO</p>
                <p className="text-red-400 font-black text-3xl">
                  {reporte.metricas.productos_criticos}
                </p>
              </div>
              <div className="bg-[#1e2130] rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-2">VALOR INVENTARIO</p>
                <p className="text-green-400 font-black text-3xl">
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
                  PRODUCTOS MÁS VENDIDOS
                </h2>
                <div className="flex flex-col gap-3">
                  {reporte.mas_vendidos.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      Sin ventas en este período
                    </p>
                  ) : (
                    reporte.mas_vendidos.map((producto, index) => (
                      <div
                        key={producto.id}
                        className="flex justify-between items-center border-b border-gray-700 pb-3 gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="bg-blue-400/20 text-blue-400 font-black rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-white font-bold truncate">
                              {producto.nombre}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {Number(producto.cantidad_vendida)} unidades
                            </p>
                          </div>
                        </div>
                        <span className="text-green-400 font-black whitespace-nowrap">
                          {Number(producto.total_vendido).toLocaleString(
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
                  STOCK POR CATEGORÍA
                </h2>
                <div className="flex flex-col gap-3">
                  {reporte.stock_por_categoria.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      Sin productos cargados
                    </p>
                  ) : (
                    reporte.stock_por_categoria.map((categoria) => (
                      <div
                        key={categoria.categoria_nombre}
                        className="flex justify-between items-center border-b border-gray-700 pb-3"
                      >
                        <div>
                          <p className="text-white font-bold">
                            {categoria.categoria_nombre}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {categoria.cantidad_productos} productos
                          </p>
                        </div>
                        <span className="text-blue-400 font-black">
                          {Number(categoria.stock_total).toLocaleString(
                            "es-AR",
                          )}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#1e2130] rounded-xl p-6">
              <h2 className="text-white font-black text-xl mb-4">
                PRODUCTOS CON STOCK CRÍTICO
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="text-gray-400 text-sm text-left border-b border-gray-700">
                      <th className="pb-3">PRODUCTO</th>
                      <th className="pb-3">CATEGORÍA</th>
                      <th className="pb-3">PROVEEDOR</th>
                      <th className="pb-3">STOCK</th>
                      <th className="pb-3">MÍNIMO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.productos_criticos.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-gray-500 text-sm text-center py-4"
                        >
                          No hay productos con stock crítico
                        </td>
                      </tr>
                    ) : (
                      reporte.productos_criticos.map((producto) => (
                        <tr
                          key={producto.id}
                          className="border-b border-gray-700 hover:bg-[#252840]"
                        >
                          <td className="py-3 font-bold">{producto.nombre}</td>
                          <td className="py-3 text-sm text-gray-400">
                            {producto.categoria_nombre || "Sin categoría"}
                          </td>
                          <td className="py-3 text-sm text-gray-400">
                            {producto.proveedor_nombre || "Sin proveedor"}
                          </td>
                          <td className="py-3 text-red-400 font-black">
                            {Number(producto.stock_total)}
                          </td>
                          <td className="py-3 text-sm">
                            {Number(producto.stock_minimo)}
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
