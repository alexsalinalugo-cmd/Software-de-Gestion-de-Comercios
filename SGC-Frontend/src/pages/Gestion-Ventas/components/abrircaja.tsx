import { useState } from "react";
import type { AbrirCajaInput, Caja } from "../../interfaces/caja";

interface Props {
  onCajaAbierta: (id_caja: number, caja: Caja) => void;
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
        onCajaAbierta(caja.id, caja);
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
    <section className="sgc-page">
      <div className="flex min-h-screen items-center justify-center px-4 py-8 md:pl-60">
      <div className="sgc-panel w-full max-w-md p-8">
        <p className="sgc-kicker">Inicio de jornada</p>
        <h2 className="sgc-title mb-6">Abrir caja</h2>

        <label className="text-gray-400 text-sm mb-2 block">
          Monto inicial
        </label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Ej: 5000"
          className="mb-4 w-full"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleAbrir}
          disabled={cargando}
          className="sgc-button-primary w-full disabled:opacity-50"
        >
          {cargando ? "Abriendo..." : "Abrir Caja"}
        </button>
      </div>
      </div>
    </section>
  );
}
