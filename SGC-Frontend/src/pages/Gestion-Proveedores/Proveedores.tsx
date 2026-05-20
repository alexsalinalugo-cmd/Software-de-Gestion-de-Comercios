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
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
          <div className="sgc-page-header">
            <div>
              <p className="sgc-kicker">Abastecimiento</p>
              <h1 className="sgc-title">Gestión de proveedores</h1>
              <p className="sgc-subtitle">
                Contactos, visitas y productos vinculados a cada proveedor.
              </p>
            </div>
            <AgregarProveedoresComponents onAgregar={AgregarProveedores} />
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
    </section>
  );
}
