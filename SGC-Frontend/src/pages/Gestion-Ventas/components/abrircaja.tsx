import { useState } from "react";
import type { AbrirCajaInput } from "../../interfaces/caja";

interface Props {
  onCajaAbierta: (id_caja: number) => void;
}

export default function AbrirCaja({ onCajaAbierta }: Props) {
  const [monto, setMonto] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAbrir = async () => {
    if (!monto || Number(monto) <= 0) {
      setError("El monto debe ser mayor a cero");
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const datos: AbrirCajaInput = {
        monto_apertura: Number(monto),
      };

      const res = await fetch("http://localhost:3000/api/caja/abrir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (res.ok) {
        const caja = await res.json();
        onCajaAbierta(caja.id);
      } else {
        const err = await res.json();
        setError(err.mensaje);
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2a2d3a]">
      <div className="bg-[#1e2130] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-white text-3xl font-black mb-6">ABRIR CAJA</h2>

        <label className="text-gray-400 text-sm mb-2 block">
          Monto inicial
        </label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ej: 5000"
          className="w-full p-3 rounded-lg bg-[#2a2d3a] text-white border border-gray-600 focus:outline-none focus:border-blue-500 mb-4"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleAbrir}
          disabled={cargando}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {cargando ? "Abriendo..." : "Abrir Caja"}
        </button>
      </div>
    </div>
  );
}
