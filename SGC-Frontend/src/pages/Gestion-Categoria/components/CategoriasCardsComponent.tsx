import { useState } from "react";
import type { CategoriasCards } from "../../interfaces/categorias";
import TablaCategorias from "./TablaCategorias";

const CategoriasCardsComponent = ({
  CategoriasProp,
  CategoriaAEditar,
}: CategoriasCards) => {
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState<
    number | null
  >(null);
  return (
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 space-x-1 ">
      {CategoriasProp.map((p) => (
        <div
          key={p.id}
          className="bg-blue-500 rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="p-5 bg-gray-50 border-b border-gray-100 flex flex-col">
            <div className="flex justify-between  items-start">
              <div className="flex gap-4">
                {/* Avatar/Logo temporal */}
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold">
                  {p.nombre.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg capitalize ">
                    {p.nombre}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-slate-600 capitalize">
                      <span>
                        Productos Asociados: {p.Productos?.length || 0}
                      </span>
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-slate-600">
                      Valor inventario:{" "}
                      {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(
                        p.Productos?.reduce(
                          (acc, prod) =>
                            acc + prod.stock_total * prod.precio_costo,
                          0,
                        ) || 0,
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                Activo
              </span>
            </div>
            <div>
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
                  onClick={() => setCategoriaSeleccionado(p.id)}
                >
                  VER CATÁLOGO COMPLETO
                </button>
                <button
                  className="w-full mt-3 py-2 border-t border-dashed border-slate-200 text-center text-[11px] text-blue-600 font-bold hover:bg-blue-50 transition-colors rounded-b-lg"
                  onClick={() => CategoriaAEditar(p)}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
          {categoriaSeleccionado === p.id && (
            <TablaCategorias
              ProductosRelacionados={p.Productos}
              onClose={() => setCategoriaSeleccionado(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriasCardsComponent;
