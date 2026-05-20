import { useState } from "react";
import BotonAgregar from "../../../components/BotonAgregar";
import type {
  CrearCategoria,
  CrearCategoriasResponse,
} from "../../interfaces/categorias";
const AgregarCategoriasComponent = ({ onAgregar }: CrearCategoria) => {
  const [Formulario, setFormulario] = useState(false);
  const ManejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const CategoriaActualizado: CrearCategoriasResponse = {
      nombre: data.get("nombre")?.toString() || "",
    };

    onAgregar(CategoriaActualizado);
    setFormulario(!Formulario);
  };
  return (
    <div>
      {Formulario ? (
        <div className="sgc-modal-backdrop">
          <form
            className="sgc-modal-card flex w-full max-w-md flex-col gap-4 p-6"
            onSubmit={ManejarEnvio}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-black underline text-slate-900">
                Editar Categoria
              </h1>
              <button
                type="button" // Evita que dispare el submit
                className="text-orange-600 hover:scale-110 transition-transform"
                onClick={() => setFormulario(!Formulario)}
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
                // Llenamos el campo con el valor actual
                className="bg-gray-50"
                placeholder="Ej: Carpinteria, Construccion..."
                required
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                type="submit"
                className="sgc-button-primary"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setFormulario(!Formulario)}
                className="sgc-button-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <BotonAgregar // le pasamos el texto y la funcion para mostrar el formulario al hacer clic en el boton
            texto="Agregar Categorias"
            onclick={() => setFormulario(!Formulario)}
            bg="bg-orange-500"
          />
        </div>
      )}
    </div>
  );
};

export default AgregarCategoriasComponent;
