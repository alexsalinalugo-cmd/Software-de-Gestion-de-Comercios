import type { TablaProducto, Producto } from "../../interfaces/Producto";
import Detalles from "./DetallesComponent";
import { useState } from "react";

const TablaProductos = ({ datos, onEditar, onEliminar }: TablaProducto) => {
  const [ProductoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  return (
    <div className="ml-50 p-5  overflow-x-auto ">
      {" "}
      {/* Espacio para el sidebar */}
      <table className="w-full text-white border-collapse  bg-gray-900/20 rounded-xl ">
        <thead>
          <tr className="bg-[#1a1c23] text-left text-[17px] font-black text-gray-400">
            <th className="p-3 w-50">Producto</th>
            <th className="p-3 w-50">Marca</th>
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
                <td className="p-3 font-bold capitalize">{producto.nombre}</td>
                <td className="p-3 font-bold capitalize">
                  {producto.marca_nombre}
                </td>
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
                  <span className="bg-gray-700/40 text-gray-200 px-2 py-1 rounded text-xs capitalize">
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
                <td className="p-3 capitalize">{producto.proveedor_nombre}</td>
                <td className="p-3 flex gap-2">
                  <div className="flex flex-col ">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs mb-1"
                      onClick={() => onEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-yellow-300/20 text-yellow-300 px-2 py-1 rounded text-xs"
                      onClick={() => setProductoSeleccionado(producto)}
                    >
                      + Detalles
                    </button>
                  </div>

                  <button
                    className="text-red-700  "
                    onClick={() => onEliminar(producto.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {ProductoSeleccionado && (
        <Detalles
          producto={ProductoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default TablaProductos;
