import type { EditarInterface, Proveedor } from "../../interfaces/Proveedores";

// Asumo que EditarInterface tiene { Proveedor, onEdit, onClose }
const EditarProveedoresComponents = ({
  Proveedor,
  onEdit,
  onClose,
}: EditarInterface) => {
  const ManejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const valores = Object.fromEntries(data.entries());

    // Combinamos el ID del proveedor original con los nuevos valores del form
    const proveedorActualizado = {
      ...valores,
      id: Proveedor.id, // IMPORTANTE para el query UPDATE en el backend
    } as Proveedor;

    onEdit(proveedorActualizado);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 z-50 backdrop-blur-sm animate-in fade-in duration-300 flex justify-center items-center p-4">
      <form
        className="p-8 border-2 border-gray-800/10 w-full lg:max-w-120 max-w-80 max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col bg-white gap-4 "
        onSubmit={ManejarEnvio}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black underline text-slate-900">
            Editar Proveedor
          </h1>
          <button
            type="button" // Evita que dispare el submit
            className="text-blue-500 hover:scale-110 transition-transform"
            onClick={onClose}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="flex flex-col min-w-0">
            <label className="text-slate-900 text-[15px] font-black">
              Razón Social
            </label>
            <input
              type="text"
              name="razon_social"
              defaultValue={Proveedor.razon_social}
              className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-blue-500 capitalize  "
              required
            />
          </div>
          <div className="flex flex-col min-w-0">
            <label className="text-slate-900 text-[15px] font-black">
              Cuit
            </label>
            <input
              type="text"
              name="cuit"
              defaultValue={Proveedor.cuit}
              className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-blue-500 capitalize  "
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-slate-900 text-[15px] font-black text-center">
            Representante
          </label>
          <input
            type="text"
            name="nombre_contacto"
            defaultValue={Proveedor.nombre_contacto}
            className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-blue-500 capitalize  "
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-slate-900 text-[15px] font-black text-center">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              defaultValue={Proveedor.telefono}
              className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-blue-500 capitalize  "
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-slate-900 text-[15px] font-black text-center">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={Proveedor.email}
              className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-blue-500 capitalize  "
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-slate-900 text-[15px] font-black text-center">
            Día Visita
          </label>
          <input
            type="text"
            name="dia_visita"
            defaultValue={Proveedor.dia_visita}
            className="p-2 bg-gray-100 border border-gray-300 rounded focus:outline-blue-500 capitalize  "
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 py-2 px-2 rounded text-white font-bold text-[14px] transition-colors"
            type="submit"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 py-2 px-2 rounded text-gray-800 font-bold text-[14px] transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProveedoresComponents;
