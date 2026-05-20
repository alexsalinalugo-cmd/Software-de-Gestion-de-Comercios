import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ReporteProveedores } from "../../interfaces/reporteproveedores";
import { ReporteProveedoresService } from "../../../services/Gestion-ReportesServices/ReporteProveedoresService";

const money = (value: number | string) =>
  Number(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

const number = (value: number | string) =>
  Number(value).toLocaleString("es-AR", { maximumFractionDigits: 0 });

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
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
          <ReportHeader
            title="Reporte de proveedores"
            subtitle="Vista ejecutiva de proveedores, productos asociados, stock y contribucion comercial."
            periodo={periodo}
            onPeriodo={setPeriodo}
          />

          {cargando ? (
            <StateBox text="Cargando reporte de proveedores..." />
          ) : reporte ? (
            <>
              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric title="Proveedores" value={reporte.metricas.total_proveedores} />
                <Metric title="Productos asociados" value={reporte.metricas.productos_asociados} tone="green" />
                <Metric title="Stock total" value={number(reporte.metricas.stock_total)} tone="amber" />
                <Metric title="Valor inventario" value={money(reporte.metricas.valor_inventario)} tone="amber" />
              </div>

              <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <Panel title="Ventas por proveedor">
                  <div className="space-y-3">
                    {reporte.ventas_por_proveedor.length === 0 ? (
                      <Empty text="Sin ventas en este periodo" />
                    ) : (
                      reporte.ventas_por_proveedor.map((proveedor) => (
                        <ListRow
                          key={proveedor.id}
                          title={proveedor.nombre}
                          subtitle={`${number(proveedor.cantidad_vendida)} unidades vendidas`}
                          value={money(proveedor.total_vendido)}
                        />
                      ))
                    )}
                  </div>
                </Panel>

                <Panel title="Stock critico por proveedor">
                  <div className="space-y-3">
                    {reporte.productos_criticos.length === 0 ? (
                      <Empty text="No hay productos criticos con proveedor" />
                    ) : (
                      reporte.productos_criticos.map((producto) => (
                        <ListRow
                          key={producto.id}
                          title={producto.nombre}
                          subtitle={producto.proveedor_nombre || "Sin proveedor"}
                          value={`${number(producto.stock_total)} / min. ${number(producto.stock_minimo)}`}
                          valueTone="red"
                        />
                      ))
                    )}
                  </div>
                </Panel>
              </div>

              <Panel title="Detalle de proveedores">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-black uppercase text-slate-500">
                        <th className="pb-3">Proveedor</th>
                        <th className="pb-3">Contacto</th>
                        <th className="pb-3">Productos</th>
                        <th className="pb-3">Stock</th>
                        <th className="pb-3">Criticos</th>
                        <th className="pb-3">Valor inventario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporte.proveedores.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-6 text-center font-bold text-slate-400">
                            Sin proveedores cargados
                          </td>
                        </tr>
                      ) : (
                        reporte.proveedores.map((proveedor) => (
                          <tr key={proveedor.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 font-black text-slate-900">{proveedor.nombre}</td>
                            <td className="py-3 font-medium text-slate-500">
                              {proveedor.nombre_contacto || proveedor.medio_contacto || "Sin contacto"}
                            </td>
                            <td className="py-3 font-bold text-slate-700">{number(proveedor.cantidad_productos)}</td>
                            <td className="py-3 font-black text-orange-700">{number(proveedor.stock_total)}</td>
                            <td className="py-3 font-black text-red-600">{number(proveedor.productos_criticos)}</td>
                            <td className="py-3 font-black text-emerald-700">{money(proveedor.valor_inventario)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Panel>
            </>
          ) : (
            <StateBox text="No se pudo cargar el reporte de proveedores" />
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
        <p className="sgc-kicker">Gestion de abastecimiento</p>
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

function Metric({
  title,
  value,
  tone = "slate",
}: {
  title: string;
  value: number | string;
  tone?: "slate" | "amber" | "red" | "green";
}) {
  const colors = {
    slate: "text-slate-950",
    red: "text-red-600",
    green: "text-emerald-700",
    amber: "text-orange-700",
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
  title,
  subtitle,
  value,
  valueTone = "green",
}: {
  title: string;
  subtitle: string;
  value: string;
  valueTone?: "green" | "red";
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <div className="min-w-0">
        <p className="truncate font-black text-slate-900">{title}</p>
        <p className="text-xs font-bold text-slate-400">{subtitle}</p>
      </div>
      <span className={`shrink-0 font-black ${valueTone === "red" ? "text-red-600" : "text-emerald-700"}`}>
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
