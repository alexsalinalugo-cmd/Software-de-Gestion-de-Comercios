import { useState } from "react";
import QRScanner from "../../../components/Escaner.tsx";
import type { Producto, EditarProducto } from "../../interfaces/Producto.ts";

const EditarComponent = ({
  Producto,
  onActualizar,
  onClose,
  CategoriasProp,
  ProveedorProp,
  MarcasProp,
}: EditarProducto) => {
  const [Escaner, setEscaner] = useState<boolean>(false);
  const [QrResultado, setQrResultado] = useState(Producto.codigo_barra || "");

  const ManejarEdicion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Evita que el navegador recargue la página al hacer clic en el botón de enviar (submit) que es algo que hacen los submit".
    const data = new FormData(e.currentTarget); // e target son los eventos que se producten en el formulario,
    //  y FormData es una función que nos permite crear un objeto con los datos del formulario para poder manipularlos mas facilmente
    // y los objetos se va creando con los valores de lo inputs los cuales tengan el atributo name que es el estandaer para identificar los datos del formulario
    // Esto es mejor que guardarlos en estados de react usesState porque no tenemos que estar actualizando el estado cada vez que el usuario escriba algo
    // en el formulario, sino que solo cuando el usuario envie el formulario, lo cual es mas eficiente y menos propenso a errores.
    const valores = Object.fromEntries(data.entries());

    const productoFinal = {
      ...valores,
      id: Producto.id,

      precio_costo: Number(valores.precio_costo),
      precio_venta: Number(valores.precio_venta),
      stock_total: Number(valores.stock_total),
      stock_minimo: Number(valores.stock_minimo),
      id_categoria: Number(valores.id_categoria),
      id_proveedor: Number(valores.id_proveedor),
      id_ubicacion: Producto.id_ubicacion,
    } as Producto;

    onActualizar(productoFinal);
  };
  //funcion que usamos para actualizar el estado de qr que contiene el qr escaneado y a la vez si hay exito cerramos el escaneador
  const QrEscaneado = (Qr: string) => {
    setQrResultado(Qr);
    setEscaner(!Escaner);
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto grid place-items-center py-10 p-4">
        {/* fixed inset-0: Hace que el div ocupe toda la ventana del navegador y se quede quieto aunque hagas scroll.
            backdrop-blur-sm: (Opcional pero muy pro) Aplica un efecto de desenfoque al fondo (como en iOS o Windows), lo que da mucha elegancia.
            z-50: Asegura que el formulario esté "al frente" de cualquier otro elemento (Sidebar, Tabla, etc.).
             required obliga a que el usuario complete esos campos antes de enviar el formulario, lo cual es importante para asegurarnos de que tenemos toda la información
              necesaria para crear un nuevo producto.
          */}
        <form
          onSubmit={ManejarEdicion}
          className="bg-[#1a1c23] p-8 rounded-2xl shadow-2xl w-full  max-w-85 lg:max-w-2xl md:max-w-150   border border-gray-800 flex flex-col gap-6 "
        >
          <h1 className="text-2xl text-center font-black text-white">
            {" "}
            Producto Nuevo
          </h1>

          <div className="flex gap-2 w-full ">
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-gray-400 text-[15px] font-black  ">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre Producto"
                name="nombre"
                className="p-2 bg-gray-800/30 rounded  text-white"
                defaultValue={Producto.nombre}
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-gray-400 text-[15px] font-black">
                Marca
              </label>
              <select
                name="id_marca"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Producto.id_marca}
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
                    {mr.nombre} {mr.id === Producto.id_marca ? " (Actual)" : ""}
                  </option>
                ))}
              </select>
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
                className="p-2 bg-gray-800/30 rounded mt-2 text-white"
                defaultValue={Producto.precio_costo}
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
                className="p-2 bg-gray-800/30 rounded mt-2 text-white"
                defaultValue={Producto.precio_venta}
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
                className="bg-gray-800/30 rounded p-2 w-full text-white"
                defaultValue={Producto.unidad_medida}
              >
                <option
                  value="unidad"
                  className="bg-gray-800 hover:bg-gray-900"
                >
                  Unidad{" "}
                </option>
                <option value="metro" className="bg-gray-800 hover:bg-gray-900">
                  Metro
                </option>
                <option value="litro" className="bg-gray-800 hover:bg-gray-900">
                  Litro
                </option>
                <option value="kilo" className="bg-gray-800 hover:bg-gray-900">
                  Kilogramo
                </option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className="flex flex-col flex-1 min-w-0 ">
              <label className="text-gray-400 text-[15px] font-black ">
                Stock Minimo
              </label>
              <input
                type="text"
                placeholder="Stock-minimo"
                name="stock_minimo"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Number(Producto.stock_minimo).toLocaleString(
                  "es-AR",
                  { maximumFractionDigits: 0 },
                )}
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
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Number(Producto.stock_total).toLocaleString(
                  "es-AR",
                  {
                    maximumFractionDigits: 0,
                  },
                )}
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1 min-w-0 gap-2 ">
              <label className="text-gray-400 text-[15px] font-black text-center ">
                ¿Donde esta?
              </label>
              <input
                type="text"
                placeholder="Sector ejemplo(Pasillo 'A')"
                name="ubicacion_sector"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Producto.sector}
              />
              <input
                type="text"
                placeholder="Estanteria ejemplo(Estante 3)"
                name="ubicacion_estanteria"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Producto.estanteria}
              />
              <input
                type="text"
                placeholder="Posicion ejemplo(Arribe a ala izquierda)"
                name="ubicacion_posicion"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Producto.posicion}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col flex-1 min-w-0 text-center">
              <label className="text-gray-400 text-[15px] font-black ">
                Elegi categoria
              </label>

              <select
                name="id_categoria"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Producto.id_categoria}
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
                    {cat.id === Producto.id_categoria ? " (Actual)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col flex-1 min-w-0 text-center">
              <label className="text-gray-400 text-[15px] font-black ">
                Elegi Proveedor
              </label>
              <select
                name="id_proveedor"
                className="p-2 bg-gray-800/30 rounded text-white"
                defaultValue={Producto.id_proveedor}
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
                    {pr.nombre}
                    {pr.id === Producto.id_proveedor ? " (Actual)" : ""}
                  </option>
                ))}
              </select>
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
              className="p-2 bg-gray-800/30 rounded text-white"
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
              onClick={onClose}
            >
              {" "}
              Cerrar
            </button>
          </div>
        </form>
      </div>
      {/* 
      <BotonAgregar // le pasamos el texto y la funcion para mostrar el formulario al hacer clic en el boton
        texto="Agregar Producto"
        onclick={() => setFormulario(!Formulario)}
      /> */}
    </div>
  );
};

export default EditarComponent;
