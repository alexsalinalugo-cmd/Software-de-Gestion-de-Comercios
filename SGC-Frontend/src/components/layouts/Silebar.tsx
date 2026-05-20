import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

const enlaces = [
  { to: "/", label: "Dashboard" },
  { to: "/GestionProductos", label: "Productos" },
  { to: "/GestionVentas", label: "Ventas" },
  { to: "/Categorias", label: "Categorias" },
  { to: "/Proveedores", label: "Proveedores" },
  { to: "/Reportes", label: "Reportes" },
];

export default function Silebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-extrabold transition ${
      isActive
        ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
        : "text-slate-600 hover:bg-orange-50 hover:text-orange-700"
    }`;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-orange-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-4">
          <img src={Logo} alt="logo" className="h-9 w-auto" />
          <nav className="sgc-mobile-nav flex max-w-[calc(100vw-5rem)] gap-2 overflow-x-auto">
            {enlaces.map((enlace) => (
              <NavLink key={enlace.to} to={enlace.to} className={linkClass}>
                {enlace.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 border-r border-orange-100 bg-white md:flex">
        <div className="flex w-full flex-col p-6">
          <div className="rounded-lg border border-orange-100 bg-orange-50/70 p-4">
            <img src={Logo} alt="logo" className="h-16 w-auto" />
            <p className="mt-4 text-xs font-black uppercase text-orange-700">
              Sistema de gestion
            </p>
            <p className="text-sm font-bold text-slate-800">Comercios</p>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            {enlaces.map((enlace) => (
              <NavLink key={enlace.to} to={enlace.to} className={linkClass}>
                {enlace.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
