import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ReporteProductos } from "../../interfaces/reporteproductos";
import { ReporteProductosService } from "../../../services/Gestion-ReportesServices/ReporteProductosService";

const money = (value: number | string) =>
  Number(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

const number = (value: number | string) =>
  Number(value).toLocaleString("es-AR", { maximumFractionDigits: 0 });

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
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
          <ReportHeader
            title="Reporte de productos"
            subtitle="Inventario disponible, valor de stock y productos que necesitan reposicion."
            periodo={periodo}
            onPeriodo={setPeriodo}
          />

          {cargando ? (
            <StateBox text="Cargando reporte de productos..." />
          ) : reporte ? (
            <>
              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric title="Productos activos" value={reporte.metricas.total_productos} />
                <Metric title="Stock total" value={number(reporte.metricas.stock_total)} tone="amber" />
                <Metric title="Stock critico" value={reporte.metricas.productos_criticos} tone="red" />
                <Metric title="Valor inventario" value={money(reporte.metricas.valor_inventario)} tone="green" />
              </div>

              <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <Panel title="Productos mas vendidos">
                  <div className="space-y-3">
                    {reporte.mas_vendidos.length === 0 ? (
                      <Empty text="Sin ventas en este periodo" />
                    ) : (
                      reporte.mas_vendidos.map((producto, index) => (
                        <ListRow
                          key={producto.id}
                          badge={index + 1}
                          title={producto.nombre}
                          subtitle={`${number(producto.cantidad_vendida)} unidades`}
                          value={money(producto.total_vendido)}
                        />
                      ))
                    )}
                  </div>
                </Panel>

                <Panel title="Stock por categoria">
                  <div className="space-y-3">
                    {reporte.stock_por_categoria.length === 0 ? (
                      <Empty text="Sin productos cargados" />
                    ) : (
                      reporte.stock_por_categoria.map((categoria) => (
                        <ListRow
                          key={categoria.categoria_nombre}
                          title={categoria.categoria_nombre}
                          subtitle={`${number(categoria.cantidad_productos)} productos`}
                          value={number(categoria.stock_total)}
                          valueTone="amber"
                        />
                      ))
                    )}
                  </div>
                </Panel>
              </div>

              <Panel title="Productos con stock critico">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                        <th className="pb-3">Producto</th>
                        <th className="pb-3">Categoria</th>
                        <th className="pb-3">Proveedor</th>
                        <th className="pb-3">Stock</th>
                        <th className="pb-3">Minimo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporte.productos_criticos.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-6 text-center font-bold text-slate-400">
                            No hay productos con stock critico
                          </td>
                        </tr>
                      ) : (
                        reporte.productos_criticos.map((producto) => (
                          <tr key={producto.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 font-black text-slate-900">{producto.nombre}</td>
                            <td className="py-3 font-medium text-slate-500">{producto.categoria_nombre || "Sin categoria"}</td>
                            <td className="py-3 font-medium text-slate-500">{producto.proveedor_nombre || "Sin proveedor"}</td>
                            <td className="py-3 font-black text-red-600">{number(producto.stock_total)}</td>
                            <td className="py-3 font-bold text-slate-700">{number(producto.stock_minimo)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </>
          ) : (
            <StateBox text="No se pudo cargar el reporte de productos" />
          )}
        </div>
      </div>
    </section>
  );
}

function ReportHeader({
  title,
  subtitle,
  periodo,
  onPeriodo,
}: {
  title: string;
  subtitle: string;
  periodo: string;
  onPeriodo: (periodo: string) => void;
}) {
  return (
    <div className="sgc-page-header">
      <div>
        <p className="sgc-kicker">Control comercial</p>
        <h1 className="sgc-title">{title}</h1>
        <p className="sgc-subtitle max-w-2xl">{subtitle}</p>
      </div>
      <div className="flex rounded-lg border border-orange-100 bg-orange-50/70 p-1">
        {["hoy", "7dias", "todo"].map((p) => (
          <button
            key={p}
            onClick={() => onPeriodo(p)}
            className={`rounded-md px-3 py-2 text-sm font-black transition ${
              periodo === p ? "bg-orange-500 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-orange-700"
            }`}
          >
            {p === "hoy" ? "Hoy" : p === "7dias" ? "7 dias" : "Todo"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ title, value, tone = "slate" }: { title: string; value: number | string; tone?: "slate" | "amber" | "red" | "green" }) {
  const colors = {
    slate: "text-slate-950",
    amber: "text-orange-700",
    red: "text-red-600",
    green: "text-emerald-700",
  };

  return (
    <div className="sgc-panel p-5">
      <p className="text-xs font-black uppercase text-slate-500">{title}</p>
      <p className={`mt-3 text-2xl font-black ${colors[tone]} md:text-3xl`}>{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sgc-panel p-5">
      <h2 className="mb-4 text-base font-black text-slate-950">{title}</h2>
      {children}
    </div>
  );
}

function ListRow({
  badge,
  title,
  subtitle,
  value,
  valueTone = "green",
}: {
  badge?: number;
  title: string;
  subtitle: string;
  value: string;
  valueTone?: "green" | "amber";
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        {badge && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-sm font-black text-orange-700">
            {badge}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-black text-slate-900">{title}</p>
          <p className="text-xs font-bold text-slate-400">{subtitle}</p>
        </div>
      </div>
      <span className={`shrink-0 font-black ${valueTone === "amber" ? "text-orange-700" : "text-emerald-700"}`}>
        {value}
      </span>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-lg bg-slate-50 p-4 text-sm font-bold text-slate-400">{text}</p>;
}

function StateBox({ text }: { text: string }) {
  return <div className="sgc-panel p-8 font-bold text-slate-400">{text}</div>;
}
