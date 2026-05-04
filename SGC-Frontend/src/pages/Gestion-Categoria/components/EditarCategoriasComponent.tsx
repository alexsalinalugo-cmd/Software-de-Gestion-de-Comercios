import type {
  categoriasInterface,
  EditarCategorias,
} from "../../interfaces/categorias";

const EditarCategoriasComponent = ({
  categoria,
  onClose,
  onEdit,
}: EditarCategorias) => {
  const ManejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const CategoriaActualizado = {
      id: categoria.id,
      nombre: data.get("nombre")?.toString() || "",
    } as categoriasInterface;

    onEdit(CategoriaActualizado);
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
            Editar Categoria
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
        <div className="flex flex-col gap-2">
          <label className="font-bold text-slate-700">
            Nombre de la Categoría
          </label>
          <input
            type="text"
            name="nombre" // <--- CLAVE: Tiene que coincidir con data.get("nombre")
            defaultValue={categoria.nombre} // Llenamos el campo con el valor actual
            className="p-2 border rounded-lg focus:outline-blue-500 bg-gray-50"
            placeholder="Ej: Bebidas, Lácteos..."
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCategoriasComponent;
