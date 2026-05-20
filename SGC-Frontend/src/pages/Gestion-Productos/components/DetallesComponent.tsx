import { useEffect } from "react";
import type { Detalles } from "../../interfaces/Producto";

const DetallesComponent = ({ producto, onClose }: Detalles) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end capitalize">
      {/* Fondo oscuro traslúcido con Blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade animate-duration-300"
        onClick={onClose}
      />

      {/* Panel lateral */}
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-orange-100 bg-white shadow-2xl animate-fade-left animate-duration-300">
        {/* CABECERA: Botón de cierre siempre visible */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
            Detalles del Producto
          </h2>
          <button
            onClick={onClose}
            className="sgc-button-ghost min-h-0 p-2 text-xs"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* CUERPO: Aquí es donde sucede el scroll interno */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-orange-200">
          {/* Título y Marca */}
          <div className="flex flex-col rounded-r-lg border-l-4 border-orange-500 bg-orange-50/70 py-2 pl-4 text-2xl font-bold capitalize text-slate-900">
            <span className="text-3xl tracking-tight">{producto.nombre}</span>
            <span className="text-sm font-bold text-orange-700">
              {producto.marca_nombre}
            </span>
          </div>

          {/* Grilla de Stocks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-orange-50/40">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-widest">
                Stock Mínimo
              </p>
              <p className="text-slate-900 text-xl font-semibold">
                {producto.stock_minimo}
              </p>
            </div>
            <div
              className={`rounded-lg border p-4 transition-colors ${producto.stock_total <= producto.stock_minimo ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"}`}
            >
              <p
                className={`text-[10px] uppercase font-bold mb-1 tracking-widest ${producto.stock_total <= producto.stock_minimo ? "text-red-400" : "text-green-400"}`}
              >
                Stock Actual
              </p>
              <p
                className={`text-xl font-semibold ${producto.stock_total <= producto.stock_minimo ? "text-red-400" : "text-green-400"}`}
              >
                {producto.stock_total}
              </p>
            </div>
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-r border-slate-200 p-4">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-widest">
                Precio Costo
              </p>
              <p className="text-slate-900 text-lg font-medium">
                ${producto.precio_costo}
              </p>
            </div>
            <div className="bg-orange-50/50 p-4">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-widest">
                Precio Venta
              </p>
              <p className="text-orange-700 text-xl font-bold">
                ${producto.precio_venta}
              </p>
            </div>
          </div>

          {/* Info Adicional (Categoría y Proveedor) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group">
              <p className="text-gray-500 text-xs uppercase font-bold">
                Unidad de medida
              </p>
              <p className="rounded-md bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
                {producto.unidad_medida}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                  Categoría
                </p>
                <p className="text-slate-900 text-sm font-medium">
                  {producto.categoria_nombre}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                  Proveedor
                </p>
                <p className="truncate text-sm font-medium text-slate-900">
                  {producto.proveedor_razon_social}
                </p>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="rounded-lg border border-dashed border-orange-200 bg-orange-50/40 p-5">
            <h1 className="text-gray-500 text-[10px] uppercase font-bold text-center mb-4 tracking-[0.2em]">
              Ubicación en Depósito
            </h1>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-orange-100 bg-white p-3 text-center shadow-inner">
                <p className="text-orange-700 text-[9px] uppercase font-bold">
                  Sector
                </p>
                <p className="text-slate-900 font-bold">{producto.sector}</p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-3 text-center shadow-inner">
                <p className="text-orange-700 text-[9px] uppercase font-bold">
                  Estante
                </p>
                <p className="text-slate-900 font-bold">{producto.estanteria}</p>
              </div>
              <div className="rounded-lg border border-orange-100 bg-white p-3 text-center shadow-inner">
                <p className="text-orange-700 text-[9px] uppercase font-bold">
                  Posición
                </p>
                <p className="text-slate-900 font-bold">{producto.posicion}</p>
              </div>
            </div>
          </div>

          {/* Código de Barras al final */}
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
              Código de Barras
            </p>
            <p className="text-slate-900 font-mono text-lg tracking-widest">
              {producto.codigo_barra}
            </p>
            <div className="h-1 w-full bg-linear-to-r from-transparent via-orange-200 to-transparent"></div>
          </div>
        </div>

        {/* PIE DE PÁGINA: Opcional, para dar un cierre visual */}
        <div className="border-t border-slate-200 bg-orange-50/50 p-4 text-center text-[10px] uppercase tracking-widest text-slate-500">
          SGC - Gestión de Inventario
        </div>
      </div>
    </div>
  );
};

export default DetallesComponent;
