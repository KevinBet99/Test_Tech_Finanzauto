import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVehicles } from "../features/crudvehiculos/services/vehicles";
import { getImageVehicleById } from "../features/crudvehiculos/services/imagesVehicles";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [images, setImages] = useState({});
  const [currentSlide, setCurrentSlide] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const vehiculos = await getVehicles();
      setVehicles(vehiculos);

      // Carga imágenes para cada vehículo
      const imgs = {};
      for (const v of vehiculos) {
        const res = await getImageVehicleById(v.id);
        imgs[v.id] = res.map(img => img.imageUrl);
      }
      setImages(imgs);

      // Inicializa slide en 0 para cada vehículo
      const slideInit = {};
      vehiculos.forEach(v => { slideInit[v.id] = 0; });
      setCurrentSlide(slideInit);
    };
    fetchData();
  }, []);

  const handlePrev = (id) => {
    setCurrentSlide(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : prev[id]
    }));
  };

  const handleNext = (id) => {
    setCurrentSlide(prev => ({
      ...prev,
      [id]: prev[id] < (images[id]?.length || 1) - 1 ? prev[id] + 1 : prev[id]
    }));
  };

  const handleVerMas = (vehicle) => {
    navigate(`/detalle/${vehicle.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pb-16">
      <header className="w-full py-10 bg-gradient-to-r from-green-700 via-green-500 to-green-400 shadow-lg mb-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
          <img
            src="https://img.icons8.com/ios-filled/100/ffffff/car--v1.png"
            alt="Logo"
            className="mb-4 drop-shadow-lg"
          />
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center">
            Catálogo de Autos
          </h1>
          <p className="mt-4 text-lg text-green-100 font-medium text-center max-w-xl">
            Explora nuestro catálogo de vehículos. Desliza para ver las imágenes y haz clic en "Ver más" para conocer todos los detalles de cada auto.
          </p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="relative w-80 h-52 mb-4 flex items-center justify-center">
                {images[vehicle.id] && images[vehicle.id].length > 0 ? (
                  <>
                    <img
                      src={images[vehicle.id][currentSlide[vehicle.id]]}
                      alt={`Vehículo ${vehicle.plate}`}
                      className="w-full h-full object-cover rounded-xl border border-green-200"
                    />
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700"
                      onClick={() => handlePrev(vehicle.id)}
                      disabled={currentSlide[vehicle.id] === 0}
                      aria-label="Anterior"
                    >
                      &#8592;
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700"
                      onClick={() => handleNext(vehicle.id)}
                      disabled={currentSlide[vehicle.id] === (images[vehicle.id]?.length || 1) - 1}
                      aria-label="Siguiente"
                    >
                      &#8594;
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {images[vehicle.id].map((_, i) => (
                        <span
                          key={i}
                          className={`inline-block w-3 h-3 rounded-full ${i === currentSlide[vehicle.id] ? "bg-green-600" : "bg-green-200"}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="text-gray-400">Sin imágenes</span>
                )}
              </div>
              <div className="text-center mb-4">
                <div className="font-bold text-xl text-green-800">{vehicle.plate}</div>
                <div className="text-green-700 font-semibold">{vehicle.brand} - {vehicle.model}</div>
                <div className="text-gray-500">{vehicle.year} | {vehicle.color}</div>
              </div>
              <button
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition"
                onClick={() => handleVerMas(vehicle)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      </main>
      
    </div>
  );
};

export default Home;