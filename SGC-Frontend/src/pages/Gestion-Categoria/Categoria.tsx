import { useState, useEffect } from "react";
import AgregarCategoriasComponent from "./components/AgregarCategoriasComponent";
import EditarCategoriasComponent from "./components/EditarCategoriasComponent";
import CategoriasCards from "./components/CategoriasCardsComponent";
import type {
  categoriasInterface,
  CrearCategoria,
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
    <div className="h-full w-full flex flex-col ">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 ">
        <div className="flex justify-between ">
          <h1 className="font-black text-4xl">CATEGORIAS</h1>
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
  );
}
