import { useState } from "react";
import type { ProveedoresCardsInterface } from "../../interfaces/Proveedores";
import TablaProveedores from "./TablaProveedores";
const ProveedoresCards = ({
  ProveedoresProp,
  ProveedorElegido,
}: ProveedoresCardsInterface) => {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<
    number | null
  >(null);

  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 space-x-1 ">
      {ProveedoresProp.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="p-5 bg-gray-50 border-b border-gray-100">
            <div className="flex justify-between  items-start">
              <div className="flex gap-4">
                {/* Avatar/Logo temporal */}
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold">
                  {p.razon_social.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg capitalize ">
                    {p.razon_social}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-slate-600 capitalize">
                      Representante: {p.nombre_contacto}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-slate-600">
                      {" "}
                      Cuit: {p.cuit}
                    </span>
                  </p>
                </div>
              </div>

              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                Activo
              </span>
            </div>
            <div className="mt-4 text-sm text-gray-600 space-y-2">
              {/* Contenedor de Contacto */}
              <div className="flex flex-col gap-2">
                {/* Teléfono */}
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500" // Color azul para el teléfono
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="font-black">
                    Teléfono: <span className="font-medium">{p.telefono}</span>
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500" // Color rojizo para el email
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="font-black">
                    Email: <span className="font-medium">{p.email}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-500" // Color purpura para que resalte diferente al tel/email
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <span className="font-black">
                  Dia de visita:{" "}
                  <span className="font-medium capitalize">{p.dia_visita}</span>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2">
                Productos Asociados
              </h4>

              {/* CONTENEDOR CON SCROLL: Definimos un alto máximo (h-32) y overflow-y-auto */}
              <div className="overflow-y-auto h-32 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white z-10">
                    {/* Sticky para que el encabezado no se pierda al bajar */}
                    <tr className="text-[10px] text-slate-500 border-b border-slate-200">
                      <th className="pb-2 font-bold uppercase">Producto</th>
                      <th className="pb-2 font-bold uppercase text-center">
                        Stock
                      </th>
                      <th className="pb-2 font-bold uppercase text-right">
                        Costo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {p.Productos && p.Productos.length > 0 ? (
                      p.Productos.map((prod: any) => (
                        <tr
                          key={prod.id_producto}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-2 text-xs">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-700">
                                {prod.nombre}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {prod.marca}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 text-xs text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold ${
                                prod.stock_total < 10
                                  ? "bg-red-100 text-red-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {prod.stock_total}
                            </span>
                          </td>
                          <td className="py-2 text-xs text-right font-mono font-bold text-slate-600">
                            ${prod.precio_costo}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 text-center text-xs text-slate-400 italic"
                        >
                          Sin productos asignados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <button
                className="w-full mt-3 py-2 border-t border-dashed border-slate-200 text-center text-[11px] text-blue-600 font-bold hover:bg-blue-50 transition-colors rounded-b-lg"
                onClick={() => setProveedorSeleccionado(p.id)}
              >
                VER CATÁLOGO COMPLETO
              </button>
              <button
                className="w-full mt-3 py-2 border-t border-dashed border-slate-200 text-center text-[11px] text-blue-600 font-bold hover:bg-blue-50 transition-colors rounded-b-lg"
                onClick={() => ProveedorElegido(p)}
              >
                Editar
              </button>
            </div>
          </div>
          {proveedorSeleccionado === p.id && (
            <TablaProveedores
              ProductosRelacionados={p.Productos}
              onClose={() => setProveedorSeleccionado(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProveedoresCards;
