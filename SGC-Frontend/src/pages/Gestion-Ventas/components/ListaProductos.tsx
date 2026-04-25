import type { Producto } from "../../interfaces/Producto";

interface Props {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
}

export default function ListaProductos({ productos, onAgregar }: Props) {
  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-[#1e2130] rounded-xl p-4 flex flex-col gap-2"
        >
          <p className="text-white font-bold text-sm">{producto.nombre}</p>
          <p className="text-gray-400 text-xs">{producto.categoria_nombre}</p>
          <p className="text-yellow-400 font-black text-lg">
            {Number(producto.precio_venta).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </p>
          <p className="text-gray-500 text-xs">
            Stock:{" "}
            {Number(producto.stock_total).toLocaleString("es-AR", {
              maximumFractionDigits: 0,
            })}
          </p>
          <button
            onClick={() => onAgregar(producto)}
            className="bg-yellow-400 text-black font-bold py-1 rounded-lg hover:bg-yellow-300 transition text-sm mt-auto"
          >
            + Agregar
          </button>
        </div>
      ))}
    </div>
  );
}
