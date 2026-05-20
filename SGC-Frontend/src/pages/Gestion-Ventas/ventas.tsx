import { useState, useEffect } from "react";
import type { Producto } from "../interfaces/Producto";
import type { DetalleVentaInput, Venta } from "../interfaces/venta";
import type { Caja } from "../interfaces/caja";
import AbrirCaja from "./components/abrircaja";
import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";
import { VentasServices } from "../../services/Gestion-VentasServices";
import { ProductosServices } from "../../services/Gestion-ProductosServices";

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
        const [productosData, cajaData, ventasData] = await Promise.all([
          ProductosServices.ObtenerTodos(),
          VentasServices.obtenerEstadoCaja(idCaja),
          VentasServices.obtenerVentasPorCaja(idCaja),
        ]);

        setProductos(productosData);
        setCaja(cajaData);
        setCambioDisponible(Number(cajaData.monto_apertura));
        setVentas(ventasData);
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
      await VentasServices.cerrarCaja({ id_caja: idCaja!, monto_cierre: 0 });
      localStorage.removeItem("id_caja");
      setIdCaja(null);
      setCaja(null);
      setCarrito([]);
      setVentas([]);
      setCambioDisponible(0);
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
      const nuevaVenta = await VentasServices.crearVenta({
        id_caja: idCaja!,
        id_cliente: null,
        metodo_pago,
        productos: carrito,
      });

      setVentas((prev) => [...prev, nuevaVenta]);

      if (metodo_pago === "Efectivo" && vuelto > 0) {
        setCambioDisponible((prev) => prev - vuelto);
      }

      setCarrito([]);
      mostrarNotificacion("✅ Venta registrada correctamente");

      const productosActualizados = await ProductosServices.ObtenerTodos();
      setProductos(productosActualizados);
    } catch (error) {
      console.log(error);
    }
  };

  const ganancia = ventas.reduce((suma, v) => suma + Number(v.total), 0);

  if (!idCaja) {
    return <AbrirCaja onCajaAbierta={handleCajaAbierta} />;
  }

  return (
    <section className="sgc-page">
      {notificacion && (
        <div className="fixed right-6 top-6 z-50 rounded-lg bg-green-500 px-6 py-3 font-bold text-white shadow-lg">
          {notificacion}
        </div>
      )}

      <div className="sgc-shell">
        <div className="sgc-container">
        <div className="sgc-page-header">
          <div>
            <p className="sgc-kicker">Punto de venta</p>
            <h1 className="sgc-title">Gestión de ventas</h1>
            {caja && (
              <p className="sgc-subtitle">
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
            className="sgc-button-danger"
          >
            Cerrar Caja
          </button>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {cargando ? (
            <div className="sgc-panel flex-1 p-8 font-bold text-slate-500">
              Cargando productos...
            </div>
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
      </div>
    </section>
  );
}
