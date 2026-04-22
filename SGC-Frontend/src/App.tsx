import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Gestion-Dashboard/Dashboard";
import Productos from "../src/pages/Gestion-Productos/Productos";
import Silebar from "../src/components/layouts/Silebar";
function App() {
  return (
    <div>
      <Silebar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/GestionProductos" element={<Productos />}></Route>
        <Route path="/GesionVentas"></Route>
      </Routes>
    </div>
  );
}

export default App;
