import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Gestion-Dashboard/Dashboard";
import Productos from "../src/pages/Gestion-Productos/Productos";
import Silebar from "../src/components/layouts/Silebar";
import Ventas from "../src/pages/Gestion-Ventas/ventas";
function App() {
  return (
    <div>
      <Silebar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/GestionProductos" element={<Productos />}></Route>
        <Route path="/GestionVentas" element={<Ventas />}></Route>
      </Routes>
    </div>
  );
}

export default App;
