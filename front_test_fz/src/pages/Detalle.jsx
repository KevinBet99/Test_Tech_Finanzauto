import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicleById } from "../features/crudvehiculos/services/vehicles";
import { getImageVehicleById } from "../features/crudvehiculos/services/imagesVehicles";

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const v = await getVehicleById(id);
      setVehicle(v);
      const imgs = await getImageVehicleById(id);
      setImages(imgs.map(img => img.imageUrl));
    };
    fetchData();
  }, [id]);

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-green-700 text-xl font-semibold">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 pb-16">
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8">
        <button
          className="mb-6 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-80 h-56 flex-shrink-0">
            {images.length > 0 ? (
              <>
                <img
                  src={images[current]}
                  alt={`Imagen vehículo ${vehicle.plate}`}
                  className="w-full h-full object-cover rounded-xl border border-green-200"
                />
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700"
                  onClick={() => setCurrent(current > 0 ? current - 1 : current)}
                  disabled={current === 0}
                  aria-label="Anterior"
                >
                  &#8592;
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700"
                  onClick={() => setCurrent(current < images.length - 1 ? current + 1 : current)}
                  disabled={current === images.length - 1}
                  aria-label="Siguiente"
                >
                  &#8594;
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-3 h-3 rounded-full ${i === current ? "bg-green-600" : "bg-green-200"}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <span className="text-gray-400">Sin imágenes</span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-green-800 mb-2">{vehicle.brand} {vehicle.model}</h2>
            <div className="mb-2 text-lg text-green-700 font-semibold">{vehicle.plate}</div>
            <div className="mb-2 text-gray-600">
              <span className="font-semibold">Año:</span> {vehicle.year} &nbsp;|&nbsp;
              <span className="font-semibold">Color:</span> {vehicle.color}
            </div>
            <div className="mb-2 text-gray-600">
              <span className="font-semibold">Kilometraje:</span> {vehicle.km} km
            </div>
            <div className="mb-2 text-gray-600">
              <span className="font-semibold">Valor:</span> ${vehicle.value}
            </div>
            <div className="mb-2 text-gray-600">
              <span className="font-semibold">Estado:</span> {vehicle.stage || "N/A"}
            </div>
            <div className="mt-4 text-gray-700">
              <span className="font-semibold">Observaciones:</span>
              <div className="mt-1 bg-green-50 rounded p-3 text-gray-800">{vehicle.observations || "Sin observaciones"}</div>
            </div>
             <button
      className="mt-6 px-6 py-2 rounded-lg bg-green-700 text-white font-bold shadow hover:bg-green-800 transition"
      onClick={() => navigate(`/reserva/${vehicle.id}`)}
    >
      Reservar
    </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Detalle;