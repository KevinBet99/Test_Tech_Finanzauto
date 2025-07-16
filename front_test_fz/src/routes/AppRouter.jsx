// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import MainLayout from "../layouts/MainLayout";
import Menu from "../features/crudvehiculos/pages/Menu";
import Crear from "../features/crudvehiculos/pages/Crear";
import Visualizar from "../features/crudvehiculos/pages/Visualizar";
import Home from "../pages/Home";
import Detalle from "../pages/Detalle";
import Reserva from "../pages/Reserva";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/reserva/:id" element={<Reserva />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/crearvehiculo" element={<Crear />} />
          <Route path="/visualizar" element={<Visualizar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
