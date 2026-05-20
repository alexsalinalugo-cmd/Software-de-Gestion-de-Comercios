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
    <div className="sgc-panel flex flex-1 flex-col gap-4 p-4">
      {/* Categorias */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoriaActiva(null)}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
            categoriaActiva === null
              ? "bg-orange-500 text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700"
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
                ? "bg-orange-500 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700"
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
        className="w-full"
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
              className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50/60"
            >
              <div className="flex flex-col">
                <p className="text-sm font-bold text-slate-900">
                  {producto.nombre}
                </p>
                <p className="text-gray-500 text-xs">
                  {producto.categoria_nombre}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-black text-orange-700">
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
