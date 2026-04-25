import { useState, useEffect } from "react";
import type { Producto } from "../interfaces/Producto";
import type { DetalleVentaInput } from "../interfaces/venta";
import AbrirCaja from "./components/abrircaja";
import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";

export default function GestionVentas() {
  const [idCaja, setIdCaja] = useState<number | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<DetalleVentaInput[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    const cajaGuardada = localStorage.getItem("id_caja");
    if (cajaGuardada) {
      setIdCaja(Number(cajaGuardada));
    }
  }, []);

  useEffect(() => {
    if (!idCaja) return;
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const res = await fetch("http://localhost:3000/api/productos/mostrar");
        if (res.ok) {
          const data = await res.json();
          setProductos(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, [idCaja]);

  const handleCajaAbierta = (id: number) => {
    localStorage.setItem("id_caja", String(id));
    setIdCaja(id);
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
    metodo_pago: "efectivo" | "tarjeta" | "transferencia",
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
        setCarrito([]);
        alert("Venta registrada correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!idCaja) {
    return <AbrirCaja onCajaAbierta={handleCajaAbierta} />;
  }

  return (
    <section className="bg-[#2a2d3a] w-full min-h-screen flex flex-col">
      <div className="md:pl-60 p-6 mt-10 md:mt-20 text-white">
        <div className="font-black text-4xl mb-6">GESTION DE VENTAS</div>
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
            onQuitar={quitarDelCarrito}
            onConfirmar={confirmarVenta}
          />
        </div>
      </div>
    </section>
  );
}
