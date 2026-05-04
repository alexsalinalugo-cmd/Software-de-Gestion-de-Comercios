import React, { useState, useEffect } from "react";
import type { AgregarProducto } from "../../interfaces/Producto";
import type { Producto } from "../../interfaces/Producto";
import QRScanner from "../../../components/Escaner.tsx";
import BotonAgregar from "../../../components/BotonAgregar.tsx";

export default function AgregarComponent({
  onAgregar,
  CategoriasProp,
  ProveedorProp,
  MarcasProp,
  UbicacionesProp,
}: AgregarProducto) {
  const [Formulario, setFormulario] = useState<boolean>(false);
  const [Escaner, setEscaner] = useState<boolean>(false);
  const [EsNuevaCategoria, setEsNuevaCategoria] = useState<boolean>(false);
  const [EsNuevoProveedor, setEsnuevoProveedor] = useState<boolean>(false);
  const [EsNuevoMarca, setEsnuevoMarca] = useState<boolean>(false);
  const [EsnuevaUbicacion, setEsnuevaUbicacion] = useState<boolean>(false);
  const [QrResultado, setQrResultado] = useState<string>("");

  const NuevoProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Evita que el navegador recargue la página al hacer clic en el botón de enviar (submit) que es algo que hacen los submit".
    const data = new FormData(e.currentTarget);

    const valores = Object.fromEntries(data.entries());

    const productoFinal = {
      ...valores,
      precio_costo: Number(valores.precio_costo),
      precio_venta: Number(valores.precio_venta),
      stock_total: Number(valores.stock_total),
      stock_minimo: Number(valores.stock_minimo),
      id_marca: Number(valores.id_marca),
      id_categoria: Number(valores.id_categoria),
      id_proveedor: Number(valores.id_proveedor),
      id_ubicacion: Number(valores.id_ubicacion),
    } as Producto;

    onAgregar(productoFinal);
    setFormulario(false);
  };
  //funcion que usamos para actualizar el estado de qr que contiene el qr escaneado y a la vez si hay exito cerramos el escaneador
  const QrEscaneado = (Qr: string) => {
    setQrResultado(Qr);
    setEscaner(!Escaner);
  };
  useEffect(() => {
    if (Formulario) {
      // Bloquea el scroll y evita el salto visual de la barra lateral
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--removed-body-scroll-bar-size)";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [Formulario]);
  return (
    <div>
      {Formulario ? (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto grid place-items-center py-10 p-4">
          {/* fixed inset-0: Hace que el div ocupe toda la ventana del navegador y se quede quieto aunque hagas scroll.
            backdrop-blur-sm: (Opcional pero muy pro) Aplica un efecto de desenfoque al fondo (como en iOS o Windows), lo que da mucha elegancia.
            z-50: Asegura que el formulario esté "al frente" de cualquier otro elemento (Sidebar, Tabla, etc.).
             required obliga a que el usuario complete esos campos antes de enviar el formulario, lo cual es importante para asegurarnos de que tenemos toda la información
              necesaria para crear un nuevo producto.
          */}
          <form
            onSubmit={NuevoProducto}
            className="bg-[#1a1c23] p-8 rounded-2xl shadow-2xl w-full  max-w-85 lg:max-w-2xl md:max-w-150   border border-gray-800 flex flex-col gap-6 "
          >
            <h1 className="text-2xl text-center font-black"> Producto Nuevo</h1>

            <div className="flex gap-2 w-full ">
              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-gray-400 text-[15px] font-black  ">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre Producto"
                  name="nombre"
                  className="p-2 bg-gray-800/30 rounded "
                  required
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center ">
                  <label className="text-gray-400 text-[15px] font-black">
                    Marca
                  </label>
                  <button
                    type="button"
                    onClick={() => setEsnuevoMarca(!EsNuevoMarca)}
                    className=" lg:text-[15px] text-[12px]  text-blue-400 underline"
                  >
                    {EsNuevoMarca ? "Elegir Marca" : "+ Nueva Marca"}
                  </button>
                </div>
                {EsNuevoMarca ? (
                  <input
                    type="text"
                    placeholder="Eje(Calchaqui)"
                    name="marca_nombre"
                    className="p-2 bg-gray-800/30 rounded"
                  />
                ) : (
                  <select
                    name="id_marca"
                    className="p-2 bg-gray-800/30 rounded text-white"
                    required
                  >
                    <option value="" className="bg-gray-800 hover:bg-gray-900">
                      Seleccionar...
                    </option>
                    {MarcasProp.map((mr) => (
                      <option
                        key={mr.id}
                        value={mr.id}
                        className="bg-gray-800 hover:bg-gray-900"
                      >
                        {mr.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <div className="flex flex-col flex-1 min-w-0">
                {" "}
                {/* La clave responsive aca es el min-w-0*/}
                <label className="text-gray-400 text-[15px] font-black">
                  Precio Costo
                </label>
                <input
                  type="text"
                  placeholder="Precio Costo"
                  name="precio_costo"
                  className="p-2 bg-gray-800/30 rounded mt-2"
                  required
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-gray-400 text-[15px] font-black">
                  Precio Venta
                </label>
                <input
                  type="text"
                  placeholder="Precio Venta"
                  name="precio_venta"
                  className="p-2 bg-gray-800/30 rounded mt-2"
                  required
                />
              </div>
            </div>

            <div className="flex-col justify-center items-center">
              <div>
                <label
                  htmlFor="Opciones"
                  className="text-gray-400 text-[15px] font-black"
                >
                  Elige Unidad de medida
                </label>
              </div>
              <div className="">
                <select
                  id="Opciones"
                  name="unidad_medida"
                  className="bg-gray-800/30 rounded p-2 w-full"
                >
                  <option
                    value="unidad"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Unidad{" "}
                  </option>
                  <option
                    value="metro"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Metro
                  </option>
                  <option
                    value="litro"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Litro
                  </option>
                  <option
                    value="kilo"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Kilogramo
                  </option>
                </select>
              </div>
            </div>
            {/* <div className="flex gap-2 justify-center items-center">
              <div className="flex flex-col  flex-1  min-w-0">
                <label
                  htmlFor="Opciones"
                  className="text-gray-400 text-[15px] font-black"
                >
                  Elige Atributos
                </label>

                <select
                  id="Opciones"
                  name="nombre_atributo"
                  className="bg-gray-800/30 rounded p-2 w-full"
                >
                  <option
                    value="color"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Color
                  </option>
                  <option
                    value="potencia"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Potencia
                  </option>
                  <option
                    value="grosor"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Grosor
                  </option>
                  <option
                    value="angulo"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Angulo
                  </option>
                  <option
                    value="pulgada"
                    className="bg-gray-800 hover:bg-gray-900"
                  >
                    Pulgada
                  </option>
                </select>
              </div>
              <div className="flex flex-col flex-1 min-w-0 ">
                <label className="text-gray-400 text-[15px] font-black ">
                  Valor
                </label>
                <input
                  type="text"
                  placeholder="Color=Rojo"
                  name="valor_atributo"
                  className="p-2 bg-gray-800/30 rounded"
                  required
                />
              </div>
            </div> */}
            <div className="flex gap-2 justify-center items-center">
              <div className="flex flex-col flex-1 min-w-0 ">
                <label className="text-gray-400 text-[15px] font-black ">
                  Stock Minimo
                </label>
                <input
                  type="text"
                  placeholder="Stock-minimo"
                  name="stock_minimo"
                  className="p-2 bg-gray-800/30 rounded"
                  required
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-gray-400 text-[15px] font-black ">
                  Stock Total
                </label>
                <input
                  type="text"
                  placeholder="Stock-Total"
                  name="stock_total"
                  className="p-2 bg-gray-800/30 rounded"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1 min-w-0 gap-2 ">
                <div className="flex justify-between items-center my-2">
                  <label className="text-gray-400 text-[15px] font-black text-center ">
                    ¿Donde esta?
                  </label>
                  <button
                    type="button"
                    onClick={() => setEsnuevaUbicacion(!EsnuevaUbicacion)}
                    className="text-[15px] text-blue-400 underline"
                  >
                    {EsnuevaUbicacion
                      ? "Elegir Ubicacion"
                      : "+ Nueva Ubicacion"}
                  </button>
                </div>
                {EsnuevaUbicacion ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Sector ejemplo(Pasillo 'A')"
                      name="ubicacion_sector"
                      className="p-2 bg-gray-800/30 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Estanteria ejemplo(Estante 3)"
                      name="ubicacion_estanteria"
                      className="p-2 bg-gray-800/30 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Posicion ejemplo(Arribe a ala izquierda)"
                      name="ubicacion_posicion"
                      className="p-2 bg-gray-800/30 rounded"
                    />
                  </div>
                ) : (
                  <select
                    name="id_ubicacion"
                    className="p-2 bg-gray-800/30 rounded text-white"
                    required
                  >
                    <option value="" className="bg-gray-800 hover:bg-gray-900">
                      Seleccionar...
                    </option>
                    {UbicacionesProp.map((ubi) => (
                      <option
                        key={ubi.id}
                        value={ubi.id}
                        className="bg-gray-800 hover:bg-gray-900"
                      >
                        {ubi.sector} {ubi.estanteria} {ubi.posicion}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1 min-w-0 text-center ">
                <div className="flex justify-between items-center my-2">
                  <label className="text-gray-400 text-[15px] font-black ">
                    Elegi/Crea categoria
                  </label>
                  <button
                    type="button"
                    onClick={() => setEsNuevaCategoria(!EsNuevaCategoria)}
                    className="text-[15px] text-blue-400 underline"
                  >
                    {EsNuevaCategoria
                      ? "Elegir Categoria"
                      : "+ Nueva Categoria"}
                  </button>
                </div>
                {EsNuevaCategoria ? (
                  <input
                    type="text"
                    placeholder="Eje(carpinteria)"
                    name="categoria_nombre"
                    className="p-2 bg-gray-800/30 rounded"
                  />
                ) : (
                  <select
                    name="id_categoria"
                    className="p-2 bg-gray-800/30 rounded text-white"
                    required
                  >
                    <option value="" className="bg-gray-800 hover:bg-gray-900">
                      Seleccionar...
                    </option>
                    {CategoriasProp.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className="bg-gray-800 hover:bg-gray-900"
                      >
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex flex-col flex-1 min-w-0 text-center">
                <div className="flex justify-between items-center my-2">
                  <label className="text-gray-400 text-[15px] font-black  ">
                    Elegi/Crea Proveedor
                  </label>
                  <button
                    type="button"
                    onClick={() => setEsnuevoProveedor(!EsNuevoProveedor)}
                    className="text-[15px] text-blue-400 underline"
                  >
                    {EsNuevoProveedor
                      ? "Elegir Proveedor"
                      : "+ Nueva Proveedor"}
                  </button>
                </div>

                {EsNuevoProveedor ? (
                  <input
                    type="text"
                    placeholder="Eje(Distribuidora 'Sol')"
                    name="proveedor_razon_social"
                    className="p-2 bg-gray-800/30 rounded"
                  />
                ) : (
                  <select
                    name="id_proveedor"
                    className="p-2 bg-gray-800/30 rounded text-white"
                    required
                  >
                    <option value="" className="bg-gray-800 hover:bg-gray-900">
                      Seleccionar...
                    </option>
                    {ProveedorProp.map((pr) => (
                      <option
                        key={pr.id}
                        value={pr.id}
                        className="bg-gray-800 hover:bg-gray-900"
                      >
                        {pr.razon_social}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* QR 
            creamos 2 estados uno que muestra el escaneador y otro para azctualizar el qr escaneado que nos manda el hijo ala funcion QrEscaneado
             y mostrarlo en el input, pusimos onchange para poder hacerlo manual tmb 
            */}

            <div className="flex flex-col">
              <label className="text-gray-400 text-[15px] font-black text-center">
                Escanear QR
              </label>
              <input
                type="text"
                placeholder="Qr............"
                name="codigo_barra"
                className="p-2 bg-gray-800/30 rounded"
                value={QrResultado}
                onChange={(e) => setQrResultado(e.target.value)}
              />

              {Escaner && <QRScanner onScanSuccess={QrEscaneado} />}
              <button
                type="button"
                onClick={() => setEscaner(!Escaner)}
                className="bg-blue-500 text-white py-1 px-2 rounded text-[13px] mt-2  min-w-0"
              >
                {Escaner ? "Cerrar Escaner" : "Abrir Escaner"}
              </button>
            </div>

            <div className="flex-col flex gap-2">
              <button
                className="bg-amber-500 py-1 px-2 rounded text-black font-bold text-[13px]"
                type="submit"
              >
                Agregar
              </button>
              <button
                className="bg-amber-500 py-1 px-2 rounded text-black font-bold text-[13px]"
                onClick={() => setFormulario(!Formulario)}
              >
                {" "}
                Cerrar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <BotonAgregar // le pasamos el texto y la funcion para mostrar el formulario al hacer clic en el boton
          texto="Agregar Producto"
          onclick={() => setFormulario(!Formulario)}
          bg="bg-amber-400"
        />
      )}
    </div>
  );
}
