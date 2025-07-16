import { useState, useEffect } from "react";
import { getVehicleById, updateVehicle } from "../services/vehicles";
import { getImageVehicleById, updateImageVehicle, createImageVehicle } from "../services/imagesVehicles";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
// ...opciones...
const opcionesColor = [
  "Blanco",
  "Negro",
  "Gris",
  "Rojo",
  "Azul",
  "Verde",
  "Amarillo",
  "Plata",
  "Dorado",
];
const opcionesMarca = [
  "Toyota",
  "Chevrolet",
  "Mazda",
  "Renault",
  "Kia",
  "Hyundai",
  "Nissan",
  "Ford",
  "Volkswagen",
];
const opcionesAnio = Array.from({ length: 25 }, (_, i) => 2025 - i);

const Editar = ({ id, onCancel, onSave }) => {
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
  const [imageData, setImageData] = useState([]); // [{id, vehicleId, imageUrl}]
  const [imageFiles, setImageFiles] = useState([]); // Nuevos archivos seleccionados

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicleById(id);
      setForm(data);
      try {
        const imgs = await getImageVehicleById(id); // [{ id, vehicleId, imageUrl }]
        setImageData(imgs);
        setImageFiles(Array(imgs.length).fill(null));
      } catch {
        setImageData([]);
        setImageFiles([]);
      }
    };
    fetchData();
  }, [id]);

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
    // Preview inmediata
    setImageData((prev) => {
      const arr = [...prev];
      arr[idx] = {
        ...arr[idx],
        imageUrl: file ? URL.createObjectURL(file) : arr[idx]?.imageUrl,
      };
      return arr;
    });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // 1. Actualiza datos del vehículo
    await updateVehicle(id, form);

    // 2. Actualiza o crea imágenes
    for (let idx = 0; idx < imageFiles.length; idx++) {
      const file = imageFiles[idx];
      if (file) {
        const base64 = await toBase64(file);
        if (imageData[idx]?.id) {
          // Actualiza imagen existente
          await updateImageVehicle(imageData[idx].id, {
            vehicleId: id,
            imageUrl: base64,
          });
        } else {
          // Crea nueva imagen si no existe
          await createImageVehicle({
            vehicleId: id,
            imageUrl: base64,
          });
        }
      }
    }

    // 3. Actualiza el estado local y cierra el formulario de edición
    if (onSave) onSave({ ...form, id });
  } catch (error) {
    console.error("Error actualizando vehículo o imágenes:", error);
  }
};

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Formulario de edición */}
      <form
        className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Editar Vehículo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="text" name="plate" value={form.plate} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Placa" required />
          <Select name="color" value={form.color} onChange={handleChange} options={opcionesColor} label="Color" className="border rounded-lg px-4 py-2" required />
          <Select name="brand" value={form.brand} onChange={handleChange} options={opcionesMarca} label="Marca" className="border rounded-lg px-4 py-2" required />
          <Input type="text" name="model" value={form.model} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Modelo" required />
          <Select name="year" value={form.year} onChange={handleChange} options={opcionesAnio} label="Año" className="border rounded-lg px-4 py-2" required />
          <Input type="number" name="km" value={form.km} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Kilometraje" required />
          <Input type="number" name="value" value={form.value} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Valor" required />
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
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
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
          {imageData.map((img, idx) => (
            <div key={img.id || idx} className="flex flex-col items-center">
              <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-green-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-green-50 transition">
                {img.imageUrl ? (
                  <img
                    src={img.imageUrl}
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
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editar;