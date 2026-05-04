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
      <div className="relative w-full max-w-md h-full bg-[#1a1c23] shadow-2xl border-l border-gray-700 animate-fade-left animate-duration-300 flex flex-col">
        {/* CABECERA: Botón de cierre siempre visible */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#1a1c23]">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            Detalles del Producto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-gray-800 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-200"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* CUERPO: Aquí es donde sucede el scroll interno */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
          {/* Título y Marca */}
          <div className="text-2xl font-bold text-white flex flex-col capitalize border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/5 rounded-r-lg">
            <span className="text-3xl tracking-tight">{producto.nombre}</span>
            <span className="text-blue-400 text-sm font-medium">
              {producto.marca_nombre}
            </span>
          </div>

          {/* Grilla de Stocks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-colors">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-widest">
                Stock Mínimo
              </p>
              <p className="text-white text-xl font-semibold">
                {producto.stock_minimo}
              </p>
            </div>
            <div
              className={`p-4 rounded-xl border transition-colors ${producto.stock_total <= producto.stock_minimo ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"}`}
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
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-800/30 border border-gray-700/50 overflow-hidden">
            <div className="p-4 border-r border-gray-700/50">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-widest">
                Precio Costo
              </p>
              <p className="text-white text-lg font-medium">
                ${producto.precio_costo}
              </p>
            </div>
            <div className="p-4 bg-white/5">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1 tracking-widest">
                Precio Venta
              </p>
              <p className="text-blue-400 text-xl font-bold">
                ${producto.precio_venta}
              </p>
            </div>
          </div>

          {/* Info Adicional (Categoría y Proveedor) */}
          <div className="space-y-3">
            <div className="bg-gray-800/50 p-4 rounded-xl flex justify-between items-center group">
              <p className="text-gray-500 text-xs uppercase font-bold">
                Unidad de medida
              </p>
              <p className="text-white font-medium bg-gray-700 px-3 py-1 rounded-md text-sm">
                {producto.unidad_medida}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/30">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                  Categoría
                </p>
                <p className="text-white text-sm font-medium">
                  {producto.categoria_nombre}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/30">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                  Proveedor
                </p>
                <p className="text-white text-sm font-medium truncate">
                  {producto.proveedor_razon_social}
                </p>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="bg-gray-800/20 p-5 rounded-2xl border border-dashed border-gray-700">
            <h1 className="text-gray-500 text-[10px] uppercase font-bold text-center mb-4 tracking-[0.2em]">
              Ubicación en Depósito
            </h1>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-800/80 p-3 rounded-lg text-center border border-gray-700/50 shadow-inner">
                <p className="text-blue-400 text-[9px] uppercase font-bold">
                  Sector
                </p>
                <p className="text-white font-bold">{producto.sector}</p>
              </div>
              <div className="bg-gray-800/80 p-3 rounded-lg text-center border border-gray-700/50 shadow-inner">
                <p className="text-blue-400 text-[9px] uppercase font-bold">
                  Estante
                </p>
                <p className="text-white font-bold">{producto.estanteria}</p>
              </div>
              <div className="bg-gray-800/80 p-3 rounded-lg text-center border border-gray-700/50 shadow-inner">
                <p className="text-blue-400 text-[9px] uppercase font-bold">
                  Posición
                </p>
                <p className="text-white font-bold">{producto.posicion}</p>
              </div>
            </div>
          </div>

          {/* Código de Barras al final */}
          <div className="bg-black/40 p-4 rounded-xl border border-gray-800 flex flex-col items-center justify-center space-y-2">
            <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
              Código de Barras
            </p>
            <p className="text-white font-mono text-lg tracking-widest">
              {producto.codigo_barra}
            </p>
            <div className="w-full h-1 bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>
        </div>

        {/* PIE DE PÁGINA: Opcional, para dar un cierre visual */}
        <div className="p-4 bg-gray-900/50 border-t border-gray-800 text-[10px] text-center text-gray-600 uppercase tracking-widest">
          SGC - Gestión de Inventario
        </div>
      </div>
    </div>
  );
};

export default DetallesComponent;
