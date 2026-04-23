import { useState, useEffect } from "react";
import TablaPro from "./components/TablaProductos";
import AgregarProductosComponent from "./components/AgregarComponent";
import EditarProductoComponent from "./components/EditarComponent";
import type { Producto } from "../interfaces/Producto"; //ponemos type para que solo importe el tipo de dato y no el componente, ya que no es un componente sino una interfaz
export default function GestionProductos() {
  const [Productos, setProductos] = useState<Producto[]>([]);
  const [Cargando, setCargando] = useState<boolean>(true);

  const [ProductoEditar, setProductoEditar] = useState<Producto | null>(null);

  const FuncionEditar = (ProductoElegido: Producto) => {
    setProductoEditar(ProductoElegido);
  };
  useEffect(() => {
    const ObtenerPro = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/productos/mostrar");
        if (res.ok) {
          const data = await res.json();
          setProductos(data);
          setCargando(false);
        } else {
          console.log("Error en conectar al servidor");
        }
      } catch (error) {
        console.log(error);
      }
    };
    ObtenerPro();
  }, []);

  const AgregarPro = async (Pro: Producto) => {
    try {
      const res = await fetch("http://localhost:3000/api/productos/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Pro),
      });
      if (res.ok) {
        const NuevoProductos = await res.json();
        setProductos([...Productos, NuevoProductos]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const GuardarCambios = async (ProActualizado: Producto) => {
    try {
      const res = await fetch("http://localhost:3000/api/productos/editar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ProActualizado),
      });
      if (res.ok) {
        const ProductoEditado = await res.json();

        // ✅ BIEN: Esto busca el ID y reemplaza solo ese elemento
        setProductos(
          Productos.map((p) =>
            p.id === ProductoEditado.id ? ProductoEditado : p,
          ),
        );

        setProductoEditar(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="font-black text-4xl">GESTION DE PRODUCTOS</div>
        <div className="w-full md:w-auto">
          <AgregarProductosComponent onAgregar={AgregarPro} />
        </div>
      </div>

      <div>
        {Cargando ? (
          <p className="text-shadow-red-600">Cargando</p>
        ) : (
          //Parametros que le pasamos a la tabla para mostrar los datos de los productos
          <TablaPro datos={Productos} onEditar={FuncionEditar} />
        )}
      </div>
      {ProductoEditar && (
        <EditarProductoComponent
          Producto={ProductoEditar}
          onActualizar={GuardarCambios}
          onClose={() => setProductoEditar(null)}
        />
      )}
    </section>
  );
}
