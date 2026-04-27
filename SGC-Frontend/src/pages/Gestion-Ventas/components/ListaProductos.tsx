import { useState } from "react";
import type { Producto } from "../../interfaces/Producto";

interface Props {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
}

export default function ListaProductos({ productos, onAgregar }: Props) {
  const [busqueda, setBusqueda] = useState<string>("");
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  const categorias = [...new Set(productos.map((p) => p.categoria_nombre))];

  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva
      ? p.categoria_nombre === categoriaActiva
      : true;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Categorias */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoriaActiva(null)}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
            categoriaActiva === null
              ? "bg-yellow-400 text-black"
              : "bg-[#1e2130] text-gray-400 hover:bg-[#252840]"
          }`}
        >
          Todos
        </button>
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              categoriaActiva === categoria
                ? "bg-yellow-400 text-black"
                : "bg-[#1e2130] text-gray-400 hover:bg-[#252840]"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#1e2130] text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
      />

      {/* Lista */}
      <div className="flex flex-col gap-1 overflow-y-auto max-h-[60vh]">
        {productosFiltrados.length === 0 ? (
          <p className="text-gray-500 text-sm">No se encontraron productos</p>
        ) : (
          productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              onClick={() => onAgregar(producto)}
              className="flex justify-between items-center bg-[#1e2130] hover:bg-[#252840] cursor-pointer px-4 py-3 rounded-lg transition"
            >
              <div className="flex flex-col">
                <p className="text-white font-bold text-sm">
                  {producto.nombre}
                </p>
                <p className="text-gray-500 text-xs">
                  {producto.categoria_nombre}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-yellow-400 font-black text-sm">
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
