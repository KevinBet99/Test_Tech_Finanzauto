// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <main style={{ minHeight: "100vh"}}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
