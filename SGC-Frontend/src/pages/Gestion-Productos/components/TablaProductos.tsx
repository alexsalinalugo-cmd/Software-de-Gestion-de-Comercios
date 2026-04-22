import type { TablaProducto } from "../../interfaces/Producto";

const TablaProductos = ({ datos, onEditar }: TablaProducto) => {
  return (
    <div className="ml-50 p-5  overflow-x-auto ">
      {" "}
      {/* Espacio para el sidebar */}
      <table className="w-full text-white border-collapse  bg-gray-900/20 rounded-xl ">
        <thead>
          <tr className="bg-[#1a1c23] text-left text-[17px] font-black text-gray-400">
            <th className="p-3 w-100">Producto</th>
            <th className="p-3">Precio-Costo</th>
            <th className="p-3">Precio-Venta</th>
            <th className="p-3">Unidad-Medida</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Categoría</th>
            <th className="p-3 flex flex-col">
              <span>Estado</span>
              <span>Stock</span>{" "}
            </th>
            <th className="p-3">Proveedor</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-[15px] ">
          {datos.map((producto) => {
            const stockActual = Number(producto.stock_total);
            const stockMin = Number(producto.stock_minimo);
            const EstadoStock = stockActual < stockMin;
            return (
              <tr
                key={producto.id}
                className="border-b border-gray-700 hover:bg-gray-800/50"
              >
                <td className="p-3 font-bold ">{producto.nombre}</td>
                <td className="p-3">
                  {Number(producto.precio_costo).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="p-3">
                  {Number(producto.precio_venta).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </td>
                <td className="p-3 font-bold">{producto.unidad_medida}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1  ${EstadoStock ? " text-red-400" : " text-green-300"}`}
                  >
                    {Number(producto.stock_total).toLocaleString("es-AR", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </td>
                <td className="p-3">
                  <span className="bg-gray-700/40 text-gray-200 px-2 py-1 rounded text-xs ">
                    {producto.categoria_nombre}
                  </span>
                </td>
                <td className="p-3">
                  {" "}
                  <span
                    className={`px-2 py-1 rounded text-xs ${EstadoStock ? "bg-red-400/20 text-red-400" : "bg-green-300/20 text-green-300"}`}
                  >
                    {EstadoStock ? "Crítico" : "Normal"}
                  </span>
                </td>
                <td className="p-3 ">{producto.proveedor_nombre}</td>
                <td className="p-3 flex flex-col">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs mb-1"
                    onClick={() => onEditar(producto)}
                  >
                    Editar
                  </button>
                  <button className="bg-yellow-300/20 text-yellow-300 px-2 py-1 rounded text-xs">
                    + Detalles
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
