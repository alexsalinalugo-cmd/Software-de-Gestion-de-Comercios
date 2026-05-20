import { useState } from "react";
import BotonAgregar from "../../../components/BotonAgregar";
import type React from "react";
import type {
  AgregarProveedores,
  Proveedor,
} from "../../interfaces/Proveedores";

const AgregarProveedoresComponents = ({ onAgregar }: AgregarProveedores) => {
  const [Formulario, setFormulario] = useState<boolean>(false);
  const NuevoProveedor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Evita que el navegador recargue la página al hacer clic en el botón de enviar (submit) que es algo que hacen los submit".
    const data = new FormData(e.currentTarget);
    const valores = Object.fromEntries(data.entries()) as unknown as Proveedor;

    onAgregar(valores);
    setFormulario(!Formulario);
  };
  return (
    <div>
      {Formulario ? (
        <div className="sgc-modal-backdrop">
          <form
            className="sgc-modal-card flex w-full max-w-xl flex-col gap-4 p-6"
            onSubmit={NuevoProveedor}
          >
            <div className="flex justify-between">
              <h1 className="text-2xl text-center font-black underline">
                Proveedor Nuevo
              </h1>
              <button
                className="p-2 text-orange-600"
                onClick={() => setFormulario(!Formulario)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </button>
            </div>

            <div>
              <div className=" flex  w-full gap-4 ">
                <div className="flex flex-col min-w-0  ">
                  <label className="text-left text-slate-900 text-[15px] font-black ">
                    Razon Social
                  </label>
                  <input
                    type="text"
                    placeholder="ejem(Distribuidora Juan)"
                    className="bg-gray-50"
                    name="razon_social"
                    required
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <label className="text-left text-slate-900 text-[15px] font-black ">
                    Cuit
                  </label>
                  <input
                    type="text"
                    placeholder="ejem(1233433)"
                    className="bg-gray-50"
                    name="cuit"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <label className="text-center text-slate-900 text-[15px] font-black ">
                Representante
              </label>
              <input
                type="text"
                placeholder="ejem(Pablo)"
                className="bg-gray-50"
                name="nombre_contacto"
                required
              />
            </div>
            <div className=" flex w-full gap-4">
              <div className="flex flex-col min-w-0">
                <label className="text-center text-slate-900 text-[15px] font-black ">
                  Telefono
                </label>

                <input
                  type="text"
                  placeholder="eje(1132546798)"
                  className="bg-gray-50"
                  name="telefono"
                  required
                />
              </div>
              <div className="flex flex-col  min-w-0">
                <label className="text-center text-slate-900 text-[15px] font-black ">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="eje(juan1243@gmail.com)"
                  className="bg-gray-50"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className=" flex w-full">
              <div className="flex flex-col w-full">
                <label className="text-center text-slate-900 text-[15px] font-black ">
                  Dia Visita
                </label>

                <input
                  type="text"
                  placeholder="eje(Jueves)"
                  className="bg-gray-50"
                  name="dia_visita"
                  required
                />
              </div>
            </div>
            <div className="flex-col flex gap-2">
              <button
                className="sgc-button-primary text-[13px]"
                type="submit"
              >
                Agregar
              </button>
              <button
                type="button"
                className="sgc-button-secondary text-[14px]"
                onClick={() => setFormulario(!Formulario)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <BotonAgregar
          texto="Agregar Proveedores"
          onclick={() => setFormulario(!Formulario)}
          bg="bg-orange-500"
        />
      )}
    </div>
  );
};

export default AgregarProveedoresComponents;
