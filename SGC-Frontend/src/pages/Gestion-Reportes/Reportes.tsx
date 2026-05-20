import { useNavigate } from "react-router-dom";

export default function Reportes() {
  const navigate = useNavigate();

  const reportes = [
    {
      titulo: "Reporte de ventas",
      descripcion: "Total vendido, metodos de pago e historial por caja.",
      inicial: "V",
      ruta: "/Reportes/Ventas",
      acento: "bg-orange-500",
    },
    {
      titulo: "Reporte de productos",
      descripcion: "Inventario, stock critico, valor actual y mas vendidos.",
      inicial: "P",
      ruta: "/Reportes/Productos",
      acento: "bg-orange-600",
    },
    {
      titulo: "Reporte de categorias",
      descripcion: "Rendimiento comercial y stock agrupado por categoria.",
      inicial: "C",
      ruta: "/Reportes/Categorias",
      acento: "bg-orange-700",
    },
    {
      titulo: "Reporte de proveedores",
      descripcion: "Productos asociados, inventario y ventas por proveedor.",
      inicial: "R",
      ruta: "/Reportes/Proveedores",
      acento: "bg-orange-500",
    },
  ];

  return (
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
          <div className="sgc-page-header">
            <div>
            <p className="sgc-kicker">
              Informes de gestion
            </p>
            <h1 className="sgc-title">
              Reportes comerciales
            </h1>
            <p className="sgc-subtitle">
              Métricas para revisar ventas, inventario, categorías y proveedores.
            </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {reportes.map((reporte) => (
              <button
                key={reporte.titulo}
                onClick={() => navigate(reporte.ruta)}
                className="sgc-card group flex min-h-36 w-full items-start gap-4 p-5 text-left"
              >
                <span
                  className={`${reporte.acento} grid h-12 w-12 shrink-0 place-items-center rounded-lg text-lg font-black text-white`}
                >
                  {reporte.inicial}
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-black text-slate-950">
                    {reporte.titulo}
                  </span>
                  <span className="mt-2 block text-sm font-medium leading-6 text-slate-500">
                    {reporte.descripcion}
                  </span>
                  <span className="mt-4 inline-flex text-sm font-black text-orange-700 group-hover:text-orange-900">
                    Abrir reporte
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
