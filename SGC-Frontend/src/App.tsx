import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Gestion-Dashboard/Dashboard";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
