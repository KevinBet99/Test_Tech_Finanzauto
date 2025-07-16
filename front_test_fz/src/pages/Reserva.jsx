import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Reserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    celular: "",
    email: "",
    vehicleId: id,
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías guardar la info en tu backend si lo necesitas
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Reserva tu vehículo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Nombre completo"
            required
          />
          <input
            type="text"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Cédula"
            required
          />
          <input
            type="text"
            name="celular"
            value={form.celular}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Celular"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Email"
            required
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 rounded-lg bg-green-700 text-white font-bold shadow hover:bg-green-800 transition"
          >
            Lo quiero
          </button>
        </form>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-8 shadow-xl text-center">
              <h3 className="text-2xl font-bold text-green-700 mb-4">¡Gracias!</h3>
              <p className="text-green-800 mb-6">Un asesor se comunicará pronto contigo.</p>
              <button
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                onClick={() => {
                  setShowModal(false);
                  navigate("/login");
                }}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserva;