import { useState, useEffect } from "react";
import { ProductosServices } from "../../services/Gestion-ProductosServices";
import TablaPro from "./components/TablaProductos";
import AgregarProductosComponent from "./components/AgregarComponent";
import EditarProductoComponent from "./components/EditarComponent";
import type { Producto } from "../interfaces/Producto"; //ponemos type para que solo importe el tipo de dato y no el componente, ya que no es un componente sino una interfaz
import type { categoriasInterface } from "../interfaces/categorias";
import type { ProveedoresInterface } from "../interfaces/Proveedores";
import { CategoriasServices } from "../../services/Gestion-CategoriasServices";
import { proveedoresServices } from "../../services/Gestion-ProveedoresServices";
import type { MarcasInterface } from "../interfaces/marca";
import { MarcasServices } from "../../services/Gestion-MarcasServices";
import type { UbicacionesInterface } from "../interfaces/ubicaciones";
import { UbicacionesServices } from "../../services/Gestion-UbicacionesServices";
export default function GestionProductos() {
  const [Productos, setProductos] = useState<Producto[]>([]);
  const [Categorias, setCategorias] = useState<categoriasInterface[]>([]);
  const [Proveedores, setProveedores] = useState<ProveedoresInterface[]>([]);
  const [Marcas, setMarcas] = useState<MarcasInterface[]>([]);
  const [Ubicaciones, setUbicaciones] = useState<UbicacionesInterface[]>([]);
  const [Cargando, setCargando] = useState<boolean>(true);

  const [ProductoEditar, setProductoEditar] = useState<Producto | null>(null);

  const FuncionEditar = (ProductoElegido: Producto) => {
    setProductoEditar(ProductoElegido);
  };
  useEffect(() => {
    const ObtenerPro = async () => {
      try {
        const data = await ProductosServices.ObtenerTodos();
        setProductos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    ObtenerPro();
  }, []);
  useEffect(() => {
    const ObtenerMarcas = async () => {
      try {
        const data = await MarcasServices.TraerMarcas();
        setMarcas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    ObtenerMarcas();
  }, []);
  useEffect(() => {
    const ObtenerCategorias = async () => {
      try {
        const data = await CategoriasServices.ObtenerSimple();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    ObtenerCategorias();
  }, []);
  useEffect(() => {
    const ObtenerProveedores = async () => {
      try {
        const data = await proveedoresServices.TraerTodos();
        setProveedores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    ObtenerProveedores();
  }, []);

  useEffect(() => {
    const ObtenerUbicaciones = async () => {
      try {
        const data = await UbicacionesServices.MostrarUbicaciones();
        setUbicaciones(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    ObtenerUbicaciones();
  }, []);

  const AgregarPro = async (Pro: Producto) => {
    try {
      const NuevoProductos = await ProductosServices.AgregarProducto(Pro);
      //setProductos([...Productos, NuevoProductos]);
      setProductos((prev) => [...prev, NuevoProductos]);
    } catch (error) {
      console.log(error);
    }
  };
  const GuardarCambios = async (ProActualizado: Producto) => {
    try {
      const ProductoEditado =
        await ProductosServices.EditarProductos(ProActualizado);

      //prev nos da exactamente lo que hay ahora en el estado (buena practica)
      setProductos((prev) =>
        prev.map((p) =>
          Number(p.id) === Number(ProductoEditado.id) ? ProductoEditado : p,
        ),
      );

      setProductoEditar(null);
    } catch (error) {
      console.log(error);
    }
  };
  const EliminarPro = async (id: number) => {
    const Confirmar = window.confirm(
      //hay una manera de hacerla mas linda con SweetAlert2
      "¿Seguro que quiere eliminar este producto?",
    );
    if (Confirmar) {
      try {
        const res = await ProductosServices.DesactivarProducto(id);
        if (res) {
          setProductos((prev) => prev.filter((p) => p.id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="font-black text-4xl">GESTION DE PRODUCTOS</div>
        <div className="w-full md:w-auto">
          <AgregarProductosComponent
            onAgregar={AgregarPro}
            CategoriasProp={Categorias}
            ProveedorProp={Proveedores}
            MarcasProp={Marcas}
            UbicacionesProp={Ubicaciones}
          />
        </div>
      </div>

      <div>
        {Cargando ? (
          <p className="text-shadow-red-600">Cargando</p>
        ) : (
          //Parametros que le pasamos a la tabla para mostrar los datos de los productos
          <TablaPro
            datos={Productos}
            onEditar={FuncionEditar}
            onEliminar={EliminarPro}
          />
        )}
      </div>
      {ProductoEditar && (
        <EditarProductoComponent
          Producto={ProductoEditar}
          onActualizar={GuardarCambios}
          onClose={() => setProductoEditar(null)}
          CategoriasProp={Categorias}
          ProveedorProp={Proveedores}
          MarcasProp={Marcas}
          UbicacionesProp={Ubicaciones}
        />
      )}
    </section>
  );
}
