import { useState, useEffect } from "react";
import { proveedoresServices } from "../../services/Gestion-ProveedoresServices";
import type {
  Proveedor,
  ProveedoresInterface,
} from "../interfaces/Proveedores";
import ProveedoresCards from "./components/ProveedoresCards";
import AgregarProveedoresComponents from "./components/AgregarProveedoresComponents";
import EditarProveedoresComponents from "./components/EditarProveedoresComponents";
export default function Proveedores() {
  const [Proveedores, setProveedores] = useState<ProveedoresInterface[]>([]);
  const [FormularioEditar, setFomularioEditar] = useState<Proveedor | null>(
    null,
  );

  useEffect(() => {
    const ObtenerProveedores = async () => {
      try {
        const data = await proveedoresServices.TraerTodos();
        setProveedores(data);
      } catch (error) {
        console.error(error);
      }
    };
    ObtenerProveedores();
  }, []);
  const AgregarProveedores = async (Proveedor: Proveedor) => {
    try {
      const NuevoProveedores =
        await proveedoresServices.CrearProveedores(Proveedor);

      setProveedores((prev) => [...prev, NuevoProveedores]);
    } catch (error) {
      console.log(error);
    }
  };
  const EditarProveedores = async (ProveedorAeditar: Proveedor) => {
    try {
      const ProveedoresEditados =
        await proveedoresServices.EditarProveedores(ProveedorAeditar);

      setProveedores((prev) =>
        prev.map((p) =>
          p.id === ProveedoresEditados.id ? ProveedoresEditados : p,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const FuncionEditar = (ProveedorElegido: Proveedor) => {
    setFomularioEditar(ProveedorElegido);
  };
  return (
    <div className=" w-full min-h-screen flex flex-col">
      <div className="pl-60 mt-10 md:mt-20 p-6 ">
        <div className="flex lg:justify-between   items-center ">
          <div className="font-black text-4xl">GESTION DE PROVEEDORES</div>
          <div>
            <AgregarProveedoresComponents onAgregar={AgregarProveedores} />
          </div>
        </div>

        <ProveedoresCards
          ProveedoresProp={Proveedores}
          ProveedorElegido={FuncionEditar}
        />
        {FormularioEditar && (
          <EditarProveedoresComponents
            Proveedor={FormularioEditar}
            onEdit={EditarProveedores}
            onClose={() => setFomularioEditar(null)}
          />
        )}
      </div>
    </div>
  );
}
