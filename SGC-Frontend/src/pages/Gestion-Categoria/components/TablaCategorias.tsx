import type { CategoriaTabla } from "../../interfaces/categorias";

const TablaCategorias = ({
  ProductosRelacionados,
  onClose,
}: CategoriaTabla) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="text-xl font-black text-slate-800">
              Catálogo Completo
            </h2>
            <p className="text-sm text-slate-500">
              Lista detallada de productos suministrados
            </p>
          </div>

          <button
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-auto p-6 bg-slate-50/50">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest">
                <th className="px-4 py-2 text-left font-black">
                  Detalle del Producto
                </th>
                <th className="px-4 py-2 text-left font-black">Marca</th>
                <th className="px-4 py-2 text-center font-black">
                  Stock Actual
                </th>
                <th className="px-4 py-2 text-right font-black">
                  Precio Costo
                </th>
                <th className="px-4 py-2 text-right font-black">
                  Margen Sugerido
                </th>
              </tr>
            </thead>
            <tbody>
              {ProductosRelacionados.map((prod) => (
                <tr
                  key={prod.id_producto}
                  className="bg-white shadow-sm group hover:ring-2 hover:ring-blue-400 transition-all"
                >
                  <td className="px-4 py-4 rounded-l-xl border-y border-l border-gray-50">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">
                        {prod.nombre}
                      </span>
                      <span className="text-[10px] text-blue-500 font-mono">
                        #{prod.id_producto}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-y border-gray-50 text-slate-600 font-medium">
                    {prod.marca}
                  </td>
                  <td className="px-4 py-4 border-y border-gray-50 text-center">
                    <span
                      className={`inline-block w-16 py-1 rounded-lg font-black text-xs ${
                        prod.stock_total < 5
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {prod.stock_total}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-y border-gray-50 text-right font-mono font-bold text-slate-700">
                    ${prod.precio_costo}
                  </td>
                  <td className="px-4 py-4 rounded-r-xl border-y border-r border-gray-50 text-right">
                    <span className="text-green-600 font-bold text-sm">
                      +{(prod.precio_costo * 0.3).toFixed(2)}{" "}
                      {/* Ejemplo de margen 30% */}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200">
            Exportar a PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablaCategorias;
