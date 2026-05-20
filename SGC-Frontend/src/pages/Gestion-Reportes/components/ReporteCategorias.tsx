import { useEffect, useState } from "react";
import type { ReporteCategorias } from "../../interfaces/reportecategorias";
import { ReporteCategoriasService } from "../../../services/Gestion-ReportesServices/ReporteCategoriasService";

export default function ReporteCategorias() {
  const [reporte, setReporte] = useState<ReporteCategorias | null>(null);
  const [periodo, setPeriodo] = useState<string>("todo");
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerReporte = async () => {
      setCargando(true);
      try {
        const data = await ReporteCategoriasService.ObtenerReporte(periodo);
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
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
        <div className="sgc-page-header">
          <div>
            <p className="sgc-kicker">Rendimiento por rubro</p>
            <h1 className="sgc-title">Reporte de categorías</h1>
            <p className="sgc-subtitle">Rendimiento comercial y stock agrupado por categoría.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">CATEGORÍAS</p>
                <p className="text-slate-900 font-black text-3xl">
                  {reporte.metricas.total_categorias}
                </p>
              </div>
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">PRODUCTOS</p>
                <p className="text-orange-700 font-black text-3xl">
                  {reporte.metricas.productos_asociados}
                </p>
              </div>
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">STOCK TOTAL</p>
                <p className="text-orange-700 font-black text-3xl">
                  {Number(reporte.metricas.stock_total).toLocaleString("es-AR")}
                </p>
              </div>
              <div className="sgc-panel p-6">
                <p className="text-gray-400 text-sm mb-2">TOTAL VENDIDO</p>
                <p className="text-green-400 font-black text-3xl">
                  {Number(reporte.metricas.total_vendido).toLocaleString(
                    "es-AR",
                    { style: "currency", currency: "ARS" },
                  )}
                </p>
              </div>
            </div>

            <div className="sgc-panel p-6 mb-8">
              <h2 className="text-slate-900 font-black text-xl mb-4">
                VENTAS POR CATEGORÍA
              </h2>
              <div className="flex flex-col gap-3">
                {reporte.ventas_por_categoria.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Sin ventas en este período
                  </p>
                ) : (
                  reporte.ventas_por_categoria.map((categoria) => (
                    <div
                      key={categoria.id}
                      className="flex justify-between items-center border-b border-slate-200 pb-3 gap-4"
                    >
                      <div>
                        <p className="text-slate-900 font-bold">
                          {categoria.nombre}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {Number(categoria.cantidad_vendida)} unidades
                        </p>
                      </div>
                      <span className="text-green-400 font-black whitespace-nowrap">
                        {Number(categoria.total_vendido).toLocaleString(
                          "es-AR",
                          { style: "currency", currency: "ARS" },
                        )}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="sgc-panel p-6">
              <h2 className="text-slate-900 font-black text-xl mb-4">
                DETALLE DE CATEGORÍAS
              </h2>
              <div className="overflow-x-auto">
                <table className="sgc-table">
                  <thead>
                    <tr>
                      <th className="pb-3">CATEGORÍA</th>
                      <th className="pb-3">PRODUCTOS</th>
                      <th className="pb-3">STOCK</th>
                      <th className="pb-3">CRÍTICOS</th>
                      <th className="pb-3">VALOR INVENTARIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.categorias.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-gray-500 text-sm text-center py-4"
                        >
                          Sin categorías cargadas
                        </td>
                      </tr>
                    ) : (
                      reporte.categorias.map((categoria) => (
                        <tr
                          key={categoria.id}
                          className="border-b border-slate-100"
                        >
                          <td className="py-3 font-bold">
                            {categoria.nombre}
                          </td>
                          <td className="py-3 text-sm">
                            {categoria.cantidad_productos}
                          </td>
                          <td className="py-3 text-orange-700 font-black">
                            {Number(categoria.stock_total).toLocaleString(
                              "es-AR",
                            )}
                          </td>
                          <td className="py-3 text-red-400 font-black">
                            {categoria.productos_criticos}
                          </td>
                          <td className="py-3 text-green-400 font-black">
                            {Number(categoria.valor_inventario).toLocaleString(
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
          <div className="sgc-panel p-8 font-bold text-slate-500">No se pudo cargar el reporte</div>
        )}
        </div>
      </div>
    </section>
  );
}
