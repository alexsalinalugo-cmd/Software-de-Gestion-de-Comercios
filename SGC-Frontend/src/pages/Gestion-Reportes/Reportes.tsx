import { useNavigate } from "react-router-dom";

export default function Reportes() {
  const navigate = useNavigate();

  const reportes = [
    {
      titulo: "Reporte de Ventas",
      descripcion:
        "Total vendido, métodos de pago, historial de ventas por turno",
      icono: "💰",
      ruta: "/Reportes/Ventas",
      color: "border-yellow-400",
    },
    {
      titulo: "Reporte de Productos",
      descripcion: "Stock actual, productos críticos, más vendidos",
      icono: "📦",
      ruta: "/Reportes/Productos",
      color: "border-blue-400",
    },
    {
      titulo: "Reporte de Categorías",
      descripcion: "Ventas por categoría, stock por categoría",
      icono: "🏷️",
      ruta: "/Reportes/Categorias",
      color: "border-purple-400",
    },
    {
      titulo: "Reporte de Proveedores",
      descripcion: "Productos por proveedor, historial de compras",
      icono: "🚚",
      ruta: "/Reportes/Proveedores",
      color: "border-green-400",
    },
  ];

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white">
        <h1 className="font-black text-4xl mb-8">REPORTES</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportes.map((reporte) => (
            <div
              key={reporte.titulo}
              onClick={() => navigate(reporte.ruta)}
              className={`bg-[#1e2130] border-l-4 ${reporte.color} rounded-xl p-6 cursor-pointer hover:bg-[#252840] transition flex gap-4 items-start`}
            >
              <span className="text-4xl">{reporte.icono}</span>
              <div>
                <h2 className="text-white font-black text-xl mb-1">
                  {reporte.titulo}
                </h2>
                <p className="text-gray-400 text-sm">{reporte.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
