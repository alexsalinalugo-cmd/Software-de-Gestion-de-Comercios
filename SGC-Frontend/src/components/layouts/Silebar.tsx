import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function Silebar() {
  return (
    <div className="hidden md:flex h-screen justify-start   items-start bg-[#1a1c23] fixed top-0 left-0 w-50  ">
      <div className="Flex flex-col p-10 items-center ">
        <div>
          <img src={Logo} alt="logo" className="md:w-20 h-auto w-35   " />
        </div>
        <nav className="mt-10 text-gray-400 font-bold  gap-5 flex flex-col justify-center items-start">
          <div>
            <Link to="/">Dashboard</Link>
          </div>
          <div>
            <Link to="/GestionProductos">Productos</Link>
          </div>

          <div>
            <Link to="/GesionVentas">Ventas</Link>
          </div>
          <div>
            <Link to="/Categorias">Categorias</Link>
          </div>

          <div>
            <Link to="/Proveedores">Proveedores</Link>
          </div>

          <div>
            <Link to="/Reportes">Reportes</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
