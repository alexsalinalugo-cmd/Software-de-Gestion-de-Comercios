import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Gestion-Dashboard/Dashboard";
import Productos from "../src/pages/Gestion-Productos/Productos";
import Silebar from "../src/components/layouts/Silebar";
import Ventas from "../src/pages/Gestion-Ventas/ventas";
import Reportes from "../src/pages/Gestion-Reportes/Reportes";
import ReporteVentas from "../src/pages/Gestion-Reportes/components/ReporteVentas";
function App() {
  return (
    <div>
      <Silebar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/GestionProductos" element={<Productos />}></Route>
        <Route path="/GestionVentas" element={<Ventas />}></Route>
        <Route path="/Reportes" element={<Reportes />}></Route>
        <Route path="/Reportes/Ventas" element={<ReporteVentas />}></Route>
      </Routes>
    </div>
  );
}

export default App;
