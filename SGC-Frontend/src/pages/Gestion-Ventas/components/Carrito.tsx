import { useState } from "react";
import type { DetalleVentaInput } from "../../interfaces/venta";
import type { Caja } from "../../interfaces/caja";

type MetodoPago =
  | "Efectivo"
  | "Tarjeta Debito"
  | "Tarjeta Credito"
  | "Transferencia"
  | "Mercado Pago";

interface Props {
  carrito: DetalleVentaInput[];
  caja: Caja | null;
  ganancia: number;
  cambioDisponible: number;
  onQuitar: (id_producto: number) => void;
  onConfirmar: (metodo_pago: MetodoPago, vuelto: number) => void;
}

export default function Carrito({
  carrito,
  caja,
  ganancia,
  cambioDisponible,
  onQuitar,
  onConfirmar,
}: Props) {
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("Efectivo");
  const [montoPagado, setMontoPagado] = useState<string>("");
  const [mostrarPago, setMostrarPago] = useState<boolean>(false);

  const total = carrito.reduce(
    (suma, p) => suma + p.cantidad * p.precio_unitario,
    0,
  );
  const vuelto = montoPagado ? Number(montoPagado) - total : null;

  const handleConfirmar = () => {
    if (metodoPago === "Efectivo") {
      setMostrarPago(true);
    } else {
      onConfirmar(metodoPago, 0);
    }
  };

  const handlePagoEfectivo = () => {
    if (!montoPagado || Number(montoPagado) < total) return;
    onConfirmar(metodoPago, vuelto ?? 0);
    setMostrarPago(false);
    setMontoPagado("");
  };

  return (
    <>
      {/* Modal pago en efectivo */}
      {mostrarPago && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e2130] rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-white font-black text-2xl mb-6">
              COBRO EN EFECTIVO
            </h2>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total a cobrar</span>
              <span className="text-yellow-400 font-black text-xl">
                {total.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </div>

            {caja && (
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400">Cambio disponible</span>
                <span className="text-green-400 font-bold">
                  {cambioDisponible.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
              </div>
            )}

            <label className="text-gray-400 text-sm mb-2 block">
              ¿Cuánto paga el cliente?
            </label>
            <input
              type="number"
              value={montoPagado}
              onChange={(e) => setMontoPagado(e.target.value)}
              placeholder="Ej: 5000"
              className="w-full p-3 rounded-lg bg-[#2a2d3a] text-white border border-gray-600 focus:outline-none focus:border-yellow-400 mb-4"
              autoFocus
            />

            {vuelto !== null && vuelto >= 0 && (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4">
                <p className="text-green-400 font-black text-lg text-center">
                  Vuelto:{" "}
                  {vuelto.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </p>
              </div>
            )}

            {vuelto !== null && vuelto < 0 && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                <p className="text-red-400 font-bold text-center">
                  El monto ingresado es menor al total
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMostrarPago(false);
                  setMontoPagado("");
                }}
                className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handlePagoEfectivo}
                disabled={!montoPagado || Number(montoPagado) < total}
                className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carrito */}
      <div className="bg-[#1e2130] rounded-xl p-6 w-96 flex flex-col gap-4 sticky top-6 h-fit">
        <h2 className="text-white font-black text-2xl">CARRITO</h2>

        {/* Ganancia y cambio */}
        <div className="flex flex-col gap-2 bg-[#2a2d3a] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Ganancia de caja</span>
            <span className="text-green-400 font-black">
              {ganancia.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Cambio disponible</span>
            <span className="text-blue-400 font-black">
              {cambioDisponible.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </div>
        </div>

        {carrito.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay productos agregados</p>
        ) : (
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[35vh]">
            {carrito.map((item) => (
              <div
                key={item.id_producto}
                className="flex justify-between items-center border-b border-gray-700 pb-3"
              >
                <div className="flex flex-col flex-1">
                  <p className="text-white text-sm font-bold">{item.nombre}</p>
                  <p className="text-gray-400 text-xs">
                    {item.cantidad} x{" "}
                    {Number(item.precio_unitario).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-yellow-400 font-bold text-sm">
                    {(item.cantidad * item.precio_unitario).toLocaleString(
                      "es-AR",
                      { style: "currency", currency: "ARS" },
                    )}
                  </p>
                  <button
                    onClick={() => onQuitar(item.id_producto)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-bold">TOTAL</span>
            <span className="text-white font-black text-2xl">
              {total.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">Método de pago</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value as MetodoPago)}
            className="bg-[#2a2d3a] text-white p-2 rounded-lg border border-gray-600"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta Debito">Tarjeta Débito</option>
            <option value="Tarjeta Credito">Tarjeta Crédito</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Mercado Pago">Mercado Pago</option>
          </select>
        </div>

        <button
          onClick={handleConfirmar}
          disabled={carrito.length === 0}
          className="bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50 text-lg"
        >
          Confirmar Venta
        </button>
      </div>
    </>
  );
}
