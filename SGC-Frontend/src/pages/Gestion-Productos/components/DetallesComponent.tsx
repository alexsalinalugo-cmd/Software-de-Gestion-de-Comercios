import type { Detalles } from "../../interfaces/Producto";

const DetallesComponent = ({ producto, onClose }: Detalles) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro traslúcido para cerrar al hacer clic fuera */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel lateral */}
      <div className="relative w-96 h-full bg-[#1a1c23] shadow-2xl p-6 border-l border-gray-700 animate-fade-left animate-duration-300">
        <button onClick={onClose} className="text-gray-400 hover:text-white ">
          ✕ Cerrar
        </button>

        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            {producto.nombre}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-xs uppercase">Stock Mínimo</p>
              <p className="text-white font-medium">{producto.stock_minimo}</p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-xs uppercase">Stock Total</p>
              <p className="text-white font-medium">{producto.stock_total}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-800/50 ">
            <div className="p-4 ">
              <p className="text-gray-400 text-xs uppercase">Precio Costo</p>
              <p className="text-white font-medium">{producto.precio_costo}</p>
            </div>

            <div className=" p-4">
              <p className="text-gray-400 text-xs uppercase">Precio Venta</p>
              <p className="text-white font-medium">{producto.precio_venta}</p>
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-400 text-xs uppercase">Unidad de medida</p>

            <p className="text-white font-medium">{producto.unidad_medida}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-800/50 ">
            <div className=" p-4 ">
              <p className="text-gray-400 text-xs uppercase">Categoria</p>
              <p className="text-white font-medium">
                {producto.categoria_nombre}
              </p>
            </div>
            <div className=" p-4 ">
              <p className="text-gray-400 text-xs uppercase">Proveedor</p>
              <p className="text-white font-medium">
                {producto.proveedor_nombre}
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg ">
            <h1 className="text-gray-400 text-xs uppercase text-center mb-2">
              Ubicacion
            </h1>

            <div className="grid grid-cols-3 gap-4 bg-gray-700/50 rounded-lg">
              <div className=" p-4 ">
                <p className="text-gray-400 text-xs uppercase">Sector</p>
                <p className="text-white font-medium ">{producto.sector}</p>
              </div>
              <div className=" p-4 ">
                <p className="text-gray-400 text-xs uppercase">Estante</p>
                <p className="text-white font-medium">{producto.estanteria}</p>
              </div>

              <div className=" p-4 ">
                <p className="text-gray-400 text-xs uppercase">Posicion</p>
                <p className="text-white font-medium">{producto.posicion}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-400 text-xs uppercase">Codigo de Barra</p>

            <p className="text-white font-medium">{producto.codigo_barra}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesComponent;
