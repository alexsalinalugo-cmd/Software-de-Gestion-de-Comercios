import { useState, useEffect } from "react";
import AgregarCategoriasComponent from "./components/AgregarCategoriasComponent";
import EditarCategoriasComponent from "./components/EditarCategoriasComponent";
import CategoriasCards from "./components/CategoriasCardsComponent";
import type {
  categoriasInterface,
  CrearCategoriasResponse,
} from "../interfaces/categorias";
import { CategoriasServices } from "../../services/Gestion-CategoriasServices";

export default function Categoria() {
  const [categorias, setCategorias] = useState<categoriasInterface[]>([]);
  const [categoriaAEditar, setCategoriaAEditar] =
    useState<categoriasInterface | null>(null);

  useEffect(() => {
    const ObtenerCategorias = async () => {
      try {
        const data = await CategoriasServices.ObtenerConProductos();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    };
    ObtenerCategorias();
  }, []);
  const FuncionCategoriaAEditar = (Categoria: categoriasInterface) => {
    setCategoriaAEditar(Categoria);
  };
  const EditarCategorias = async (Categoriaeditar: categoriasInterface) => {
    try {
      const CategoriasEditados =
        await CategoriasServices.EditarCategoria(Categoriaeditar);

      setCategorias((prev) =>
        prev.map((p) =>
          p.id === CategoriasEditados.id ? CategoriasEditados : p,
        ),
      );
      setCategoriaAEditar(null);
    } catch (error) {
      console.log(error);
    }
  };
  const AgregarCategorias = async (Categoria: CrearCategoriasResponse) => {
    try {
      const NuevoCategoria =
        await CategoriasServices.CrearCategorias(Categoria);

      setCategorias((prev) => [...prev, NuevoCategoria]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="sgc-page">
      <div className="sgc-shell">
        <div className="sgc-container">
          <div className="sgc-page-header">
            <div>
              <p className="sgc-kicker">Organización del catálogo</p>
              <h1 className="sgc-title">Categorías</h1>
              <p className="sgc-subtitle">
                Agrupación de productos, stock asociado y valor de inventario.
              </p>
            </div>
          <AgregarCategoriasComponent onAgregar={AgregarCategorias} />
          </div>
        <CategoriasCards
          CategoriasProp={categorias}
          CategoriaAEditar={FuncionCategoriaAEditar}
        />
        {categoriaAEditar && (
          <EditarCategoriasComponent
            categoria={categoriaAEditar}
            onClose={() => setCategoriaAEditar(null)}
            onEdit={EditarCategorias}
          />
        )}
      </div>
      </div>
    </section>
  );
}
