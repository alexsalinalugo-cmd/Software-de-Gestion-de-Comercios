import { useState } from "react";
import type { DetalleVentaInput } from "../../interfaces/venta";

interface Props {
  carrito: DetalleVentaInput[];
  onQuitar: (id_producto: number) => void;
  onConfirmar: (metodo_pago: "efectivo" | "tarjeta" | "transferencia") => void;
}

export default function Carrito({ carrito, onQuitar, onConfirmar }: Props) {
  const [metodoPago, setMetodoPago] = useState<
    "efectivo" | "tarjeta" | "transferencia"
  >("efectivo");

  const total = carrito.reduce(
    (suma, p) => suma + p.cantidad * p.precio_unitario,
    0,
  );

  return (
    <div className="bg-[#1e2130] rounded-xl p-4 w-80 flex flex-col gap-4 h-fit sticky top-6">
      <h2 className="text-white font-black text-xl">CARRITO</h2>

      {carrito.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay productos agregados</p>
      ) : (
        <div className="flex flex-col gap-2">
          {carrito.map((item) => (
            <div
              key={item.id_producto}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
            >
              <div>
                <p className="text-white text-sm font-bold">{item.nombre}</p>
                <p className="text-gray-400 text-xs">
                  {item.cantidad} x{" "}
                  {Number(item.precio_unitario).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </p>
              </div>
              <button
                onClick={() => onQuitar(item.id_producto)}
                className="text-red-400 text-xs hover:text-red-300"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-700 pt-2">
        <p className="text-white font-black text-lg">
          Total:{" "}
          {total.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-400 text-sm">Método de pago</label>
        <select
          value={metodoPago}
          onChange={(e) =>
            setMetodoPago(
              e.target.value as "efectivo" | "tarjeta" | "transferencia",
            )
          }
          className="bg-[#2a2d3a] text-white p-2 rounded-lg border border-gray-600"
        >
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>

      <button
        onClick={() => onConfirmar(metodoPago)}
        disabled={carrito.length === 0}
        className="bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
      >
        Confirmar Venta
      </button>
    </div>
  );
}
