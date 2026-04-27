import { useState, useEffect } from "react";
import type { Producto } from "../interfaces/Producto";
import type { DetalleVentaInput, Venta } from "../interfaces/venta";
import type { Caja } from "../interfaces/caja";
import AbrirCaja from "./components/abrircaja";
import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";

export default function GestionVentas() {
  const [idCaja, setIdCaja] = useState<number | null>(null);
  const [caja, setCaja] = useState<Caja | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<DetalleVentaInput[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cambioDisponible, setCambioDisponible] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);

  useEffect(() => {
    const cajaGuardada = localStorage.getItem("id_caja");
    if (cajaGuardada) {
      setIdCaja(Number(cajaGuardada));
    }
  }, []);

  useEffect(() => {
    if (!idCaja) return;

    const obtenerDatos = async () => {
      setCargando(true);
      try {
        const [resProductos, resCaja, resVentas] = await Promise.all([
          fetch("http://localhost:3000/api/productos/mostrar"),
          fetch(`http://localhost:3000/api/caja/estado/${idCaja}`),
          fetch(`http://localhost:3000/api/ventas/caja/${idCaja}`),
        ]);

        if (resProductos.ok) setProductos(await resProductos.json());

        if (resCaja.ok) {
          const cajaData = await resCaja.json();
          setCaja(cajaData);
          setCambioDisponible(Number(cajaData.monto_apertura));
        }

        if (resVentas.ok) setVentas(await resVentas.json());
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [idCaja]);

  const mostrarNotificacion = (mensaje: string) => {
    setNotificacion(mensaje);
    setTimeout(() => setNotificacion(null), 3000);
  };

  const handleCajaAbierta = (id: number, cajaData: Caja) => {
    localStorage.setItem("id_caja", String(id));
    setIdCaja(id);
    setCaja(cajaData);
    setCambioDisponible(Number(cajaData.monto_apertura));
  };

  const handleCerrarCaja = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/caja/cerrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_caja: idCaja, monto_cierre: 0 }),
      });
      if (res.ok) {
        localStorage.removeItem("id_caja");
        setIdCaja(null);
        setCaja(null);
        setCarrito([]);
        setVentas([]);
        setCambioDisponible(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id_producto === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id_producto === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p,
        );
      }
      return [
        ...prev,
        {
          id_producto: producto.id,
          nombre: producto.nombre,
          cantidad: 1,
          precio_unitario: Number(producto.precio_venta),
        },
      ];
    });
  };

  const quitarDelCarrito = (id_producto: number) => {
    setCarrito((prev) => prev.filter((p) => p.id_producto !== id_producto));
  };

  const confirmarVenta = async (
    metodo_pago:
      | "Efectivo"
      | "Tarjeta Debito"
      | "Tarjeta Credito"
      | "Transferencia"
      | "Mercado Pago",
    vuelto: number,
  ) => {
    try {
      const res = await fetch("http://localhost:3000/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_caja: idCaja,
          id_cliente: null,
          metodo_pago,
          productos: carrito,
        }),
      });
      if (res.ok) {
        const nuevaVenta = await res.json();
        setVentas((prev) => [...prev, nuevaVenta]);

        if (metodo_pago === "Efectivo" && vuelto > 0) {
          setCambioDisponible((prev) => prev - vuelto);
        }

        setCarrito([]);
        mostrarNotificacion("✅ Venta registrada correctamente");

        const resProductos = await fetch(
          "http://localhost:3000/api/productos/mostrar",
        );
        if (resProductos.ok) {
          setProductos(await resProductos.json());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ganancia = ventas.reduce((suma, v) => suma + Number(v.total), 0);

  if (!idCaja) {
    return <AbrirCaja onCajaAbierta={handleCajaAbierta} />;
  }

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      {notificacion && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-bold">
          {notificacion}
        </div>
      )}

      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="font-black text-4xl">GESTION DE VENTAS</h1>
            {caja && (
              <p className="text-gray-400 text-sm mt-1">
                Caja #{caja.id} — Apertura:{" "}
                {Number(caja.monto_apertura).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </p>
            )}
          </div>
          <button
            onClick={handleCerrarCaja}
            className="bg-red-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-400 transition"
          >
            Cerrar Caja
          </button>
        </div>

        <div className="flex gap-6">
          {cargando ? (
            <p className="text-white">Cargando productos...</p>
          ) : (
            <ListaProductos
              productos={productos}
              onAgregar={agregarAlCarrito}
            />
          )}
          <Carrito
            carrito={carrito}
            caja={caja}
            ganancia={ganancia}
            cambioDisponible={cambioDisponible}
            onQuitar={quitarDelCarrito}
            onConfirmar={confirmarVenta}
          />
        </div>
      </div>
    </section>
  );
}
