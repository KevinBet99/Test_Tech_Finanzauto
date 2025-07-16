import { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import Modal from "../../../components/Modal";
import { createVehicle } from "../services/vehicles";
import { createImageVehicle } from "../services/imagesVehicles";

// Opciones para los selects (puedes importarlas de un archivo json si prefieres)
const opcionesColor = [
  "Blanco", "Negro", "Gris", "Rojo", "Azul", "Verde", "Amarillo", "Plata", "Dorado"
];
const opcionesMarca = [
  "Toyota", "Chevrolet", "Mazda", "Renault", "Kia", "Hyundai", "Nissan", "Ford", "Volkswagen"
];
const opcionesAnio = Array.from({ length: 25 }, (_, i) => 2025 - i);

const Crear = ({ onCancel, onCreated }) => {
  const [form, setForm] = useState({
    plate: "",
    color: "",
    brand: "",
    model: "",
    year: "",
    km: "",
    value: "",
    observations: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (idx, file) => {
    setImageFiles((prev) => {
      const files = [...prev];
      files[idx] = file;
      return files;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

 const handleConfirm = async () => {
  setLoading(true);
  try {

    // 1. Crear el vehículo
    const vehicleData = { ...form };
    delete vehicleData.images;
    const created = await createVehicle(vehicleData);

    console.log("CREATED VEHICLE:", created);

    // 2. Subir imágenes si hay
    if (imageFiles.length > 0 && created?.id) {
      const filesToUpload = imageFiles.filter(Boolean);
      if (filesToUpload.length > 0) {
        // Convierte cada imagen a base64 y arma el body
        const imagesBody = await Promise.all(
          filesToUpload.map(async (file) => ({
            vehicleId: created.id,
            imageUrl: await toBase64(file),
          }))
        );
        // Envía cada imagen individualmente o como array según tu API
        for (const img of imagesBody) {
          await createImageVehicle(img);
        }
      }
    }

    setShowModal(false);
    if (onCreated) onCreated();
    window.location.href = "/menu"; // Redirige a la vista de vehículos
  } catch (error) {
    console.error("Error creating vehicle:", error);
  }
  setLoading(false);
};
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      <form
        className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Crear Vehículo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="plate"
            value={form.plate}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Placa"
            required
          />
          <Select
            name="color"
            value={form.color}
            onChange={handleChange}
            options={opcionesColor}
            label="Color"
            className="border rounded-lg px-4 py-2"
            required
          />
          <Select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            options={opcionesMarca}
            label="Marca"
            className="border rounded-lg px-4 py-2"
            required
          />
          <Input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Modelo"
            required
          />
          <Select
            name="year"
            value={form.year}
            onChange={handleChange}
            options={opcionesAnio}
            label="Año"
            className="border rounded-lg px-4 py-2"
            required
          />
          <Input
            type="number"
            name="km"
            value={form.km}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Kilometraje"
            required
          />
          <Input
            type="number"
            name="value"
            value={form.value}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            placeholder="Valor"
            required
          />
        </div>
        <div className="mt-4">
          <TextArea
            name="observations"
            value={form.observations}
            onChange={handleChange}
            label="Observaciones"
            rows={3}
            className="border rounded-lg px-4 py-2"
            placeholder="Observaciones"
          />
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
            disabled={loading}
          >
            Guardar
          </button>
        </div>
      </form>

      {/* Cargar imágenes */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-xl">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Cargar Imágenes
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-green-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-green-50 transition">
                {imageFiles[idx] ? (
                  <img
                    src={URL.createObjectURL(imageFiles[idx])}
                    alt={`Imagen ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">Imagen {idx + 1}</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(idx, e.target.files[0])
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        text="¿Estás seguro que deseas crear este vehículo?"
      />
    </div>
  );
};

export default Crear;