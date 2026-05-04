import { useEffect, useMemo, useState } from "react";
import { DashboardServices } from "../../services/Gestion-DashboardServices";
import type { ReporteVentas } from "../interfaces/reporteventas";
import type { ReporteProductos } from "../interfaces/reporteproductos";
import type { ReporteCategorias } from "../interfaces/reportecategorias";
import type { ReporteProveedores } from "../interfaces/reporteproveedores";

interface DashboardData {
  ventasHoy: ReporteVentas;
  ventasSemana: ReporteVentas;
  productos: ReporteProductos;
  categorias: ReporteCategorias;
  proveedores: ReporteProveedores;
}

const money = (value: number | string) =>
  Number(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

const numberFormat = (value: number | string) =>
  Number(value).toLocaleString("es-AR", { maximumFractionDigits: 0 });

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerDashboard = async () => {
      setCargando(true);
      try {
        const dashboard = await DashboardServices.ObtenerDashboard();
        setData(dashboard);
      } catch (error) {
        console.log(error);
        setData(null);
      } finally {
        setCargando(false);
      }
    };

    obtenerDashboard();
  }, []);

  const metricas = useMemo(() => {
    if (!data) return null;

    const totalProductos = Number(data.productos.metricas.total_productos);
    const stockCritico = Number(data.productos.metricas.productos_criticos);
    const stockTotal = Number(data.productos.metricas.stock_total);
    const ventasHoy = Number(data.ventasHoy.metricas.total_vendido);
    const ventasSemana = Number(data.ventasSemana.metricas.total_vendido);
    const saludStock =
      totalProductos === 0 ? 100 : clamp(100 - (stockCritico / totalProductos) * 100);
    const avanceDia = ventasSemana === 0 ? 0 : clamp((ventasHoy / ventasSemana) * 100);
    const coberturaStock =
      stockTotal === 0
        ? 0
        : clamp((stockTotal / Math.max(stockTotal + stockCritico * 10, 1)) * 100);

    return {
      saludStock,
      avanceDia,
      coberturaStock,
      ventasHoy,
      ventasSemana,
    };
  }, [data]);

  const tendenciaVentas = useMemo(() => {
    if (!data) return [];

    const historial = [...data.ventasSemana.historial].slice(0, 7).reverse();
    if (historial.length === 0) return [0, 0, 0, 0, 0, 0, 0];

    return historial.map((venta) => Number(venta.total));
  }, [data]);

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen">
      <div className="md:pl-56 p-4 md:p-8 min-h-screen">
        <div className="bg-[#f7f9fc] text-[#1e2a3a] rounded-2xl shadow-2xl min-h-[calc(100vh-4rem)] p-4 md:p-6">
          <div className="flex justify-between items-center mb-5 gap-4 flex-wrap">
            <div>
              <p className="text-gray-400 text-xs font-black uppercase">
                Gestión comercial
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-[#1d2a3d]">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block bg-white border border-[#e6edf7] rounded-xl px-4 py-2 min-w-64">
                <p className="text-gray-400 text-xs font-bold">Resumen</p>
                <p className="text-[#2563eb] text-sm font-black">
                  Ventas, stock y operación
                </p>
              </div>
              <span className="bg-[#e9f8ef] text-[#16a34a] px-4 py-2 rounded-xl text-xs font-black">
                ACTIVO
              </span>
            </div>
          </div>

          {cargando ? (
            <div className="bg-white border border-[#e6edf7] rounded-2xl p-8 text-gray-400 font-bold">
              Cargando dashboard...
            </div>
          ) : data && metricas ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 auto-rows-min">
              <div className="xl:col-span-9 grid grid-cols-1 md:grid-cols-4 gap-4">
                <CompactMetric
                  title="Ventas hoy"
                  value={money(data.ventasHoy.metricas.total_vendido)}
                  subtitle={`${data.ventasHoy.metricas.cantidad_ventas} ventas`}
                  percent={metricas.avanceDia}
                  color="#2563eb"
                />
                <CompactMetric
                  title="Ventas semana"
                  value={money(data.ventasSemana.metricas.total_vendido)}
                  subtitle={`Ticket ${money(data.ventasSemana.metricas.ticket_promedio)}`}
                  percent={72}
                  color="#0ea5e9"
                />
                <CompactMetric
                  title="Inventario"
                  value={numberFormat(data.productos.metricas.stock_total)}
                  subtitle={`${data.productos.metricas.total_productos} productos`}
                  percent={metricas.coberturaStock}
                  color="#16a34a"
                />
                <CompactMetric
                  title="Salud stock"
                  value={`${metricas.saludStock}%`}
                  subtitle={`${data.productos.metricas.productos_criticos} críticos`}
                  percent={metricas.saludStock}
                  color="#7c3aed"
                />
              </div>

              <div className="xl:col-span-3 bg-white border border-[#e6edf7] rounded-2xl p-5">
                <PanelTitle title="Daily chart" />
                <VerticalBars
                  items={[
                    { label: "Hoy", value: metricas.ventasHoy },
                    { label: "7 días", value: metricas.ventasSemana },
                    {
                      label: "Stock",
                      value: Number(data.productos.metricas.valor_inventario),
                    },
                  ]}
                  color="bg-[#22c55e]"
                  compact
                />
              </div>

              <div className="xl:col-span-9 bg-white border border-[#e6edf7] rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
                  <div>
                    <p className="text-gray-400 text-xs font-black uppercase">
                      Analysis
                    </p>
                    <h2 className="text-[#1d2a3d] font-black text-lg">
                      Evolución de ventas
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-3 h-3 rounded-full bg-[#2563eb]" />
                    <span className="text-gray-500">Últimos movimientos</span>
                  </div>
                </div>
                <LineChart values={tendenciaVentas} />
              </div>

              <div className="xl:col-span-3 bg-white border border-[#e6edf7] rounded-2xl p-5">
                <PanelTitle title="Top flow" />
                <RadarCard
                  stock={metricas.saludStock}
                  ventas={metricas.avanceDia}
                  cobertura={metricas.coberturaStock}
                />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#e6edf7] rounded-2xl p-5">
                <PanelTitle title="Productos más vendidos" />
                <HorizontalBars
                  items={data.productos.mas_vendidos.slice(0, 6).map((producto) => ({
                    label: producto.nombre,
                    value: Number(producto.cantidad_vendida),
                  }))}
                  color="bg-[#2563eb]"
                  emptyText="Sin ventas"
                />
              </div>

              <div className="xl:col-span-5 bg-white border border-[#e6edf7] rounded-2xl p-5">
                <PanelTitle title="Ventas por categoría" />
                <VerticalBars
                  items={data.categorias.ventas_por_categoria
                    .slice(0, 7)
                    .map((categoria) => ({
                      label: categoria.nombre,
                      value: Number(categoria.total_vendido),
                    }))}
                  color="bg-[#3b82f6]"
                />
              </div>

              <div className="xl:col-span-3 bg-white border border-[#e6edf7] rounded-2xl p-5">
                <PanelTitle title="Activity" />
                <ActivityRow
                  label="Categorías"
                  value={data.categorias.metricas.total_categorias}
                  color="bg-[#2563eb]"
                />
                <ActivityRow
                  label="Proveedores"
                  value={data.proveedores.metricas.total_proveedores}
                  color="bg-[#22c55e]"
                />
                <ActivityRow
                  label="Stock crítico"
                  value={data.productos.metricas.productos_criticos}
                  color="bg-[#ef4444]"
                />
                <Gauge value={metricas.saludStock} />
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#e6edf7] rounded-2xl p-8 text-gray-400 font-bold">
              No se pudo cargar el dashboard
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PanelTitle({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[#1d2a3d] font-black text-sm">{title}</h2>
      <span className="bg-[#eaf2ff] text-[#2563eb] px-2 py-1 rounded-md text-[10px] font-black">
        LIVE
      </span>
    </div>
  );
}

function CompactMetric({
  title,
  value,
  subtitle,
  percent,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  percent: number;
  color: string;
}) {
  return (
    <div className="bg-white border border-[#e6edf7] rounded-2xl p-4 min-h-36">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <p className="text-gray-400 text-xs font-black uppercase">Analysis</p>
          <p className="text-[#1d2a3d] font-black text-xl mt-1 truncate">
            {value}
          </p>
          <p className="text-gray-400 text-xs font-bold mt-2 truncate">
            {subtitle}
          </p>
        </div>
        <CircularProgress value={percent} color={color} />
      </div>
      <div className="mt-4 h-2 bg-[#edf3fb] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${clamp(percent)}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-gray-500 text-xs font-black mt-3">{title}</p>
    </div>
  );
}

function CircularProgress({ value, color }: { value: number; color: string }) {
  const safeValue = clamp(value);

  return (
    <div
      className="w-14 h-14 rounded-full grid place-items-center shrink-0"
      style={{
        background: `conic-gradient(${color} ${safeValue * 3.6}deg, #edf3fb 0deg)`,
      }}
    >
      <div className="w-10 h-10 rounded-full bg-white grid place-items-center">
        <span className="text-[10px] font-black text-[#1d2a3d]">{safeValue}%</span>
      </div>
    </div>
  );
}

function LineChart({ values }: { values: number[] }) {
  const points = values.length > 1 ? values : [0, 0, 0, 0, 0, 0, 0];
  const max = Math.max(...points, 1);
  const width = 720;
  const height = 250;
  const step = width / Math.max(points.length - 1, 1);
  const coords = points
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / max) * 170 - 35;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${height - 20} ${coords} ${width},${height - 20}`;
  const labels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="h-72 w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-60">
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="0"
            x2={width}
            y1={45 + line * 45}
            y2={45 + line * 45}
            stroke="#e8eef7"
            strokeWidth="1"
          />
        ))}
        <polygon points={area} fill="url(#lineFill)" />
        <polyline
          points={coords}
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.split(" ").map((point) => {
          const [x, y] = point.split(",");
          return (
            <circle
              key={point}
              cx={x}
              cy={y}
              r="6"
              fill="#ffffff"
              stroke="#2563eb"
              strokeWidth="4"
            />
          );
        })}
      </svg>
      <div className="grid grid-cols-7 text-center text-gray-400 text-xs font-bold">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function HorizontalBars({
  items,
  color,
  emptyText,
}: {
  items: { label: string; value: number }[];
  color: string;
  emptyText: string;
}) {
  const max = Math.max(...items.map((item) => item.value), 0);

  if (items.length === 0) {
    return <p className="text-gray-400 text-sm font-bold">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const width = max === 0 ? 0 : clamp((item.value / max) * 100);
        return (
          <div key={item.label}>
            <div className="flex justify-between gap-3 mb-1">
              <span className="text-[#1d2a3d] text-xs font-bold truncate">
                {item.label}
              </span>
              <span className="text-gray-400 text-xs font-black">
                {numberFormat(item.value)}
              </span>
            </div>
            <div className="h-2 bg-[#edf3fb] rounded-full overflow-hidden">
              <div className={`${color} h-full rounded-full`} style={{ width: `${width}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VerticalBars({
  items,
  color,
  compact = false,
}: {
  items: { label: string; value: number }[];
  color: string;
  compact?: boolean;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);
  const visibleItems = items.length > 0 ? items : [{ label: "Sin datos", value: 0 }];

  return (
    <div className={`flex items-end gap-3 ${compact ? "h-36" : "h-48"}`}>
      {visibleItems.map((item) => {
        const height = item.value === 0 ? 8 : Math.max(12, clamp((item.value / max) * 100));
        return (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <div className="w-full bg-[#edf3fb] rounded-full flex items-end overflow-hidden h-full">
              <div className={`${color} w-full rounded-full`} style={{ height: `${height}%` }} />
            </div>
            <span className="text-gray-400 text-[10px] font-bold truncate max-w-full">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RadarCard({
  stock,
  ventas,
  cobertura,
}: {
  stock: number;
  ventas: number;
  cobertura: number;
}) {
  return (
    <div className="relative h-44 grid place-items-center">
      <div className="absolute w-36 h-36 rounded-full border border-[#dce7f5]" />
      <div className="absolute w-24 h-24 rounded-full border border-[#dce7f5]" />
      <div
        className="w-32 h-32 bg-[#93e0b8]/70 border border-[#22c55e] shadow-lg shadow-green-100"
        style={{
          clipPath: `polygon(50% ${100 - stock}%, ${ventas}% 55%, 58% ${100 - cobertura}%, 24% 76%, 18% 34%)`,
        }}
      />
      <div className="absolute bottom-0 grid grid-cols-3 gap-2 text-center text-[10px] font-black text-gray-400 w-full">
        <span>Stock</span>
        <span>Ventas</span>
        <span>Cobertura</span>
      </div>
    </div>
  );
}

function ActivityRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 mb-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`${color} w-3 h-3 rounded-full shrink-0`} />
        <span className="text-[#1d2a3d] text-sm font-bold truncate">{label}</span>
      </div>
      <span className="text-[#1d2a3d] text-sm font-black">{numberFormat(value)}</span>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const safeValue = clamp(value);

  return (
    <div className="mt-5">
      <div className="h-20 overflow-hidden">
        <div
          className="w-40 h-40 mx-auto rounded-full grid place-items-center"
          style={{
            background: `conic-gradient(from 270deg, #22c55e ${safeValue * 1.8}deg, #edf3fb 0deg 180deg, transparent 180deg)`,
          }}
        >
          <div className="w-28 h-28 bg-white rounded-full" />
        </div>
      </div>
      <div className="text-center -mt-2">
        <p className="text-[#1d2a3d] font-black text-lg">{safeValue}%</p>
        <p className="text-gray-400 text-xs font-bold">salud general</p>
      </div>
    </div>
  );
}
