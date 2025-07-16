import { useEffect } from "react";
import CardMenu from "../../../components/CardMenu";
import Header from "../../../components/Header";

// Puedes usar imágenes libres de Unsplash o SVGs para los íconos
const icons = {
  vehiculos: "https://img.icons8.com/ios-filled/100/4ade80/car--v1.png",
  visualizar: "https://img.icons8.com/ios-filled/100/4ade80/visible--v1.png", // ojo
  editar: "https://img.icons8.com/ios-filled/100/4ade80/pencil--v1.png",    // lápiz
};

const Menu = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-green-50 to-gray-100 relative">
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="40" height="40" fill="none" />
              <rect x="0" y="0" width="40" height="40" fill="#f3f4f6" />
              <rect
                x="0"
                y="0"
                width="39"
                height="39"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
        <Header />
      <main className="flex-1 flex flex-col items-center justify-center z-10">
        <h2 className="text-2xl font-bold mb-8 text-green-900 drop-shadow-lg">
          Selecciona una opción
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CardMenu
            title="Ver Inventario"
            description="Visualizacion Inventario"
            onClick={() => (window.location.href = "/visualizar")}
            icon={
              <img
                src={icons.visualizar}
                alt="Visualizar"
                className="w-16 h-16 mx-auto mb-2"
              />
            }
          />
          <CardMenu
            title="Cargar Vehículo"
            description="Agregar nuevos vehículos"
            onClick={() => (window.location.href = "/crearvehiculo")}
            icon={
              <img
                src={icons.vehiculos}
                alt="Ver inventario"
                className="w-16 h-16 mx-auto mb-2"
              />
            }
          />
         
        </div>
      </main>
    </div>
  );
};

export default Menu;