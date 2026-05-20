import type { TablaProducto, Producto } from "../../interfaces/Producto";
import Detalles from "./DetallesComponent";
import { useState } from "react";

const TablaProductos = ({
  datos,
  onEditar,
  onEliminar,
  CategoriasProp,
  ProveedorProp,
  MarcasProp,
}: TablaProducto) => {
  const [ProductoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [Buscador, setBuscador] = useState<string>("");
  const [Categoria, setCategoria] = useState<string>("");
  const [Proveedor, setProveedor] = useState<string>("");
  const [Marca, setMarca] = useState<string>("");
  const [stock, setStock] = useState<boolean>(false);
  const datosFiltrados = datos.filter((p) => {
    let termino = Buscador.toLowerCase();

    const cumpleTexto =
      p.nombre.toLowerCase().includes(termino) ||
      p.marca_nombre?.toLowerCase().includes(termino) ||
      p.categoria_nombre?.toLowerCase().includes(termino) ||
      p.proveedor_razon_social?.toLowerCase().includes(termino);
    const cumpleCategoria =
      Categoria === "" || p.categoria_nombre === Categoria;
    const cumpleMarca = Marca === "" || p.marca_nombre === Marca;
    const cumpleProveedor =
      Proveedor === "" || p.proveedor_razon_social === Proveedor;
    const cumpleStock = stock === false || p.stock_total < p.stock_minimo;
    return (
      cumpleTexto &&
      cumpleCategoria &&
      cumpleProveedor &&
      cumpleMarca &&
      cumpleStock
    );
  });
  let Resultado = datosFiltrados.length;

  return (
    <div>
      <div className="sgc-filterbar capitalize">
        <div className="flex w-full max-w-xl gap-2">
          <input
            type="text"
            placeholder=" Buscar por nombre, marca, categoría..."
            className="w-full"
            value={Buscador}
            onChange={(e) => setBuscador(e.target.value)}
          />
          {Buscador && (
            <button
              onClick={() => setBuscador("")}
              className="sgc-button-secondary min-h-0 px-3 py-2 text-xs"
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <select
            className={`text-xs capitalize ${
              Categoria !== ""
                ? "border-orange-500 bg-orange-50 text-orange-800"
                : ""
            }`}
            value={Categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {CategoriasProp.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <select
            className={`text-xs capitalize ${
              Marca !== ""
                ? "border-orange-500 bg-orange-50 text-orange-800"
                : ""
            }`}
            value={Marca}
            onChange={(e) => setMarca(e.target.value)}
          >
            <option value="">Todas las Marcas</option>
            {MarcasProp.map((mr) => (
              <option key={mr.id} value={mr.nombre}>
                {mr.nombre}
              </option>
            ))}
          </select>
          <select
            className={`text-xs capitalize ${
              Proveedor !== ""
                ? "border-orange-500 bg-orange-50 text-orange-800"
                : ""
            }`}
            value={Proveedor}
            onChange={(e) => setProveedor(e.target.value)}
          >
            <option value="">Todas los Proveedores</option>
            {ProveedorProp.map((pr) => (
              <option key={pr.id} value={pr.razon_social}>
                {pr.razon_social}
              </option>
            ))}
          </select>
          <button
            className={`min-h-10 rounded-md border px-3 text-xs font-extrabold transition capitalize ${
              stock !== false
                ? "border-orange-500 bg-orange-50 text-orange-800"
                : "border-slate-200 bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700"
            }`}
            type="button"
            onClick={() => setStock(!stock)}
          >
            Stock Critico
          </button>
          <span className="text-gray-500 font-bold text-[13px] ">
            {Resultado} Resultados
          </span>
        </div>
      </div>
      {/* Espacio para el sidebar */}
      <div className="sgc-table-wrap">
      <table className="sgc-table">
        <thead>
          <tr>
            <th className="p-3 w-50">Producto</th>
            <th className="p-3 w-50">Atributo</th>
            <th className="p-3">Precio-Costo</th>
            <th className="p-3">Precio-Venta</th>
            <th className="p-3">Unidad-Medida</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Categoría</th>
            <th className="p-3">
              <span>Estado</span>
              <span>Stock</span>{" "}
            </th>
            <th className="p-3">Proveedor</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-[15px]">
          {datosFiltrados.map((producto) => {
            const stockActual = Number(producto.stock_total);
            const stockMin = Number(producto.stock_minimo);
            const EstadoStock = stockActual < stockMin;
            return (
              <tr
                key={producto.id}
                className="border-b border-slate-100"
              >
                <td className="p-3 font-bold capitalize flex flex-col">
                  <span> {producto.nombre}</span>
                  <span className="text-[10px] ">{producto.marca_nombre}</span>
                </td>
                <td className="p-3 font-bold capitalize">(en proceso)</td>
                <td className="p-3">
                  {Number(producto.precio_costo).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td className="p-3">
                  {Number(producto.precio_venta).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </td>
                <td className="p-3 font-bold">{producto.unidad_medida}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 font-black ${EstadoStock ? "text-red-600" : "text-green-700"}`}
                  >
                    {Number(producto.stock_total).toLocaleString("es-AR", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </td>
                <td className="p-3">
                  <span className="sgc-pill capitalize">
                    {producto.categoria_nombre}
                  </span>
                </td>
                <td className="p-3">
                  {" "}
                  <span
                    className={`rounded px-2 py-1 text-xs font-black ${EstadoStock ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}
                  >
                    {EstadoStock ? "Crítico" : "Normal"}
                  </span>
                </td>
                <td className="p-3 capitalize">
                  {producto.proveedor_razon_social}
                </td>
                <td className="p-3 flex gap-2">
                  <div className="flex flex-col ">
                    <button
                      className="sgc-button-secondary min-h-0 px-2 py-1 text-xs mb-1"
                      onClick={() => onEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="sgc-button-ghost min-h-0 px-2 py-1 text-xs"
                      onClick={() => setProductoSeleccionado(producto)}
                    >
                      + Detalles
                    </button>
                  </div>

                  <button
                    className="sgc-button-danger min-h-0 px-2 py-1"
                    onClick={() => onEliminar(producto.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      {ProductoSeleccionado && (
        <Detalles
          producto={ProductoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default TablaProductos;
